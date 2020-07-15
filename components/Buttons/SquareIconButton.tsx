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

const SquareIconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const classes = useStyles();
    return (
      <IconButton
        {...props}
        ref={ref}
        classes={{
          ...props.classes,
          root: clsx(props.classes?.root, classes.root),
          sizeSmall: clsx(props.classes?.sizeSmall, classes.sizeSmall),
        }}
      ></IconButton>
    );
  }
);
export default SquareIconButton;
