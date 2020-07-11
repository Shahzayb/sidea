// import App from 'next/app'
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, Operation } from 'apollo-link';

import 'react-quill/dist/quill.snow.css';
import '../public/styles/main.css';

import { AuthProvider, AUTH_TOKEN_KEY } from '../context/auth-context';
import { ThemeToggleProvider } from '../context/theme-toggle-context';
import { IdeaCategoryProvider } from '../context/idea-category-context';

import { apolloClientUri } from '../client-env';
import { ZenObservable } from 'zen-observable-ts';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { CustomSnackbarProvider } from '../context/snackbar-context';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    errorPolicy: 'all',
  },
  query: {
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const cache = new InMemoryCache();

const request = async (operation: Operation) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      // console.log('graphqlErrors', graphQLErrors);
      // console.log('networkError', networkError);
    }),
    requestLink,
    new HttpLink({
      uri: apolloClientUri,
      credentials: 'same-origin',
    }),
  ]),
  cache,
  /**Error: when errorPolicy: 'all', onError does not execute  */
  // defaultOptions,
});

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sidea</title>
      </Head>

      <ThemeToggleProvider>
        <ApolloProvider client={client}>
          <AuthProvider>
            <IdeaCategoryProvider>
              <CustomSnackbarProvider maxSnack={4} dense={isSmallScreen}>
                <Component {...pageProps} />
              </CustomSnackbarProvider>
            </IdeaCategoryProvider>
          </AuthProvider>
        </ApolloProvider>
      </ThemeToggleProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
