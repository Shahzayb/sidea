import React from 'react';

import { Container, Typography, Box, Paper } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import Copyright from '../components/Copyright';

import Link from '../components/Link';
import LoginForm from '../components/Forms/LoginForm';
import useGutterAllChild from '../hooks/useGutterAllChild';
import withRouteProtection from '../hoc/withRouteProtection';
import { useAuth } from '../context/auth-context';
import LoginFormSkeleton from '../components/Skeletons/LoginFormSkeleton';

function Index() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  return (
    <Container
      style={{ marginTop: '4rem', marginBottom: '4rem' }}
      component="main"
      maxWidth="xs"
    >
      <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            underline="none"
            color="primary"
            href="/"
          >
            {/* temp: use original logo here */}
            <Typography component="div" variant="h3">
              <EmojiObjectsIcon fontSize="inherit" />
            </Typography>
            <Typography component="div" variant="h6">
              Sidea
            </Typography>
          </Link>
        </div>
        <Typography align="center" component="h1" variant="h5">
          Welcome back, sign in to continue
        </Typography>

        {!loading && !authenticated && <LoginForm />}
        {(loading || authenticated) && <LoginFormSkeleton />}

        <Box mt={5}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
