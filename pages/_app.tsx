// import App from 'next/app'
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'react-quill/dist/quill.snow.css';
import '../public/styles/main.css';

import { AuthProvider, AUTH_TOKEN_KEY } from '../context/auth-context';
import { ThemeToggleProvider } from '../context/theme-toggle-context';
import { IdeaCategoryProvider } from '../context/idea-category-context';

import { apolloClientUri } from '../client-env';

const client = new ApolloClient({
  uri: apolloClientUri,
  request: (operation) => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
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
              <Component {...pageProps} />
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
