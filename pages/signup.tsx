import React from 'react';

import { Container, Typography, Box, Paper } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'; //temp
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import { useAuth } from '../context/auth-context';
import useGutterAllChild from '../hooks/useGutterAllChild';
import SignupForm from '../components/Forms/SignupForm';
import SignupFormSkeleton from '../components/Skeletons/SignupFormSkeleton';
import withRouteProtection from '../hoc/withRouteProtection';

function Signup() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  return (
    <Container
      style={{ marginTop: '4rem', marginBottom: '4rem' }}
      component="main"
      maxWidth="sm"
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
              Welcome to Sidea
            </Typography>
          </Link>
        </div>
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
  );
}

export default withRouteProtection(Signup, 'UNAUTHENTICATED_ONLY');
