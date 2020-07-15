import React from 'react';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Skeleton } from '@material-ui/lab';

function ForgotPasswordFormSkeleton() {
  const classes = useGutterAllChild({ spacing: 3 });
  return (
    <div className={classes.gutterAllChild}>
      <Skeleton variant="rect" component="div" height={40} />

      <Skeleton variant="rect" component="div" height={40} />

      <Skeleton variant="rect" component="div" width={100} height={10} />
    </div>
  );
}

export default ForgotPasswordFormSkeleton;
