import React from 'react';

import { Container, Typography, Box, Paper } from '@material-ui/core';

import Copyright from '../components/Copyright';
import { useAuth } from '../context/auth-context';
import useGutterAllChild from '../hooks/useGutterAllChild';
import SignupForm from '../components/Forms/SignupForm';
import SignupFormSkeleton from '../components/Skeletons/SignupFormSkeleton';
import withRouteProtection from '../hoc/withRouteProtection';
import LogoHomeLink from '../components/LogoHomeLink';
import Head from 'next/head';

function Index() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Signup - Sidea</title>
      </Head>
      <Container
        style={{ marginTop: '4rem', marginBottom: '4rem' }}
        component="main"
        maxWidth="sm"
      >
        <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
          <LogoHomeLink />
          <Typography align="center" component="h1" variant="h4">
            Create your account
          </Typography>

          {!loading && !authenticated && <SignupForm />}
          {(loading || authenticated) && <SignupFormSkeleton />}
          <Box mt={5}>
            <Copyright />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
