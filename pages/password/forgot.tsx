import React from 'react';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { useAuth } from '../../context/auth-context';
import { Container, Paper, Typography, Box } from '@material-ui/core';
import Copyright from '../../components/Copyright';
import withRouteProtection from '../../hoc/withRouteProtection';
import LogoHomeLink from '../../components/LogoHomeLink';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import ForgotPasswordFormSkeleton from '../../components/Skeletons/ForgotPasswordFormSkeleton';
import Head from 'next/head';

function Index() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Forgot Password - Sidea</title>
      </Head>
      <Container
        style={{ marginTop: '4rem', marginBottom: '4rem' }}
        component="main"
        maxWidth="xs"
      >
        <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
          <LogoHomeLink />
          <Typography align="center" component="h1" variant="h5">
            Forgot password
          </Typography>
          <Typography align="center">
            Please provide your email to recover password
          </Typography>

          {!loading && !authenticated && <ForgotPasswordForm />}
          {(loading || authenticated) && <ForgotPasswordFormSkeleton />}

          <Box mt={5}>
            <Copyright />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
