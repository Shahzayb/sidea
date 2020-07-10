import React from 'react';
import { Skeleton } from '@material-ui/lab';

import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Box } from '@material-ui/core';
import useMarginRightChild from '../../hooks/useMarginRightChild';

function UpdateIdeaFormSkeleton() {
  const classes = useGutterAllChild({ spacing: 3 });
  const marginClx = useMarginRightChild();
  return (
    <Box mt={3} className={classes.gutterAllChild}>
      <Skeleton variant="rect" component="div" height={40} />
      <Skeleton variant="rect" component="div" height={80} />
      <Skeleton variant="rect" component="div" height={40} />

      <Box display="flex" justifyContent="flex-end" className={marginClx.root}>
        <Skeleton component="div" width={60} height={40} />
        <Skeleton component="div" width={60} height={40} />
      </Box>
    </Box>
  );
}

export default UpdateIdeaFormSkeleton;
