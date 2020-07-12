import React from 'react';
import NoIdea from '../Icons/NoIdea';
import { Typography, Box } from '@material-ui/core';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import ResponsiveButton from '../Buttons/ResponsiveButton';

interface Props {
  retry?: () => void;
  title: string;
}

function CustomError({ retry, title }: Props) {
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
        {title}
      </Typography>
      {retry && (
        <ResponsiveButton
          color="primary"
          variant="contained"
          onClick={() => retry()}
        >
          Retry
        </ResponsiveButton>
      )}
    </Box>
  );
}

export default CustomError;
