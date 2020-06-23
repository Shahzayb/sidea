import React from 'react';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

function LoginFormSkeleton() {
  const classes = useGutterAllChild({ spacing: 3 });
  return (
    <div className={classes.gutterAllChild}>
      <Skeleton variant="rect" component="div" height={40} />
      <div>
        <Skeleton variant="rect" component="div" height={40} />
        <Box pt={1}>
          <Skeleton
            style={{ marginLeft: 'auto' }}
            variant="rect"
            component="div"
            width={60}
            height={10}
          />
        </Box>
      </div>
      <Skeleton variant="rect" component="div" height={40} />

      <Skeleton variant="rect" component="div" width={100} height={10} />
    </div>
  );
}

export default LoginFormSkeleton;
