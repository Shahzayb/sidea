import React from 'react';

import { Container, Typography, Box, Paper } from '@material-ui/core';

import Copyright from '../components/Copyright';

import LoginForm from '../components/Forms/LoginForm';
import useGutterAllChild from '../hooks/useGutterAllChild';
import withRouteProtection from '../hoc/withRouteProtection';
import { useAuth } from '../context/auth-context';
import LoginFormSkeleton from '../components/Skeletons/LoginFormSkeleton';
import LogoHomeLink from '../components/LogoHomeLink';
import Head from 'next/head';

function Index() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Login - Sidea</title>
      </Head>

      <Container
        style={{ marginTop: '4rem', marginBottom: '4rem' }}
        component="main"
        maxWidth="xs"
      >
        <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
          <LogoHomeLink />
          <Typography align="center" component="h1" variant="h5">
            Welcome back, login to continue
          </Typography>

          {!loading && !authenticated && <LoginForm />}
          {(loading || authenticated) && <LoginFormSkeleton />}

          <Box mt={5}>
            <Copyright />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
