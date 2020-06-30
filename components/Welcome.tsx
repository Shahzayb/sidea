import React from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import ResponsiveButton from './ResponsiveButton';
import Link from './Link';
import useGutterAllChild from '../hooks/useGutterAllChild';

function Welcome() {
  const classes = useGutterAllChild({ spacing: 2 });
  return (
    <Paper elevation={0}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={3}
        className={classes.gutterAllChild}
      >
        <Typography align="center" component="h1" variant="h3">
          Welcome to Sidea
        </Typography>

        <Typography align="center" component="h2" variant="h5">
          Join today and start sharing your full-stack project ideas
        </Typography>

        <Link underline="none" href="/signup">
          <ResponsiveButton color="primary" variant="outlined">
            Join now
          </ResponsiveButton>
        </Link>
      </Box>
    </Paper>
  );
}

export default Welcome;
