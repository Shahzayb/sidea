import React from 'react';
import NoIdea from '../Icons/NoIdea';
import { Typography, Box } from '@material-ui/core';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import ResponsiveButton from '../ResponsiveButton';

interface Props {
  errorType: 'network' | 'no-content';
  retry: () => void;
}

function Error({ retry, errorType }: Props) {
  const classes = useGutterAllChild({ spacing: 1 });
  return (
    <Box
      py={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={classes.gutterAllChild}
    >
      <Typography color="textSecondary" component="div" variant="h2">
        <NoIdea fontSize="inherit" />
      </Typography>
      <Typography align="center" variant="h6" color="textSecondary">
        {errorType === 'no-content'
          ? "Cannot find what you're looking for."
          : 'Ooops. Something went wrong!'}
      </Typography>
      <ResponsiveButton
        color="primary"
        variant="contained"
        onClick={() => retry()}
      >
        Retry
      </ResponsiveButton>
    </Box>
  );
}

export default Error;
