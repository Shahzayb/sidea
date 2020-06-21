import React from 'react';
import { IconButton, IconButtonProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
  },
  sizeSmall: {
    padding: '5px',
  },
}));

function SquareIconButton(props: IconButtonProps) {
  const classes = useStyles();
  return (
    <IconButton
      {...props}
      classes={{
        ...props.classes,
        root: clsx(props.classes?.root, classes.root),
        sizeSmall: clsx(props.classes?.sizeSmall, classes.sizeSmall),
      }}
    ></IconButton>
  );
}

export default SquareIconButton;
