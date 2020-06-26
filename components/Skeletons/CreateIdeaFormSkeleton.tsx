import React from 'react';
import { Skeleton } from '@material-ui/lab';

import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Box } from '@material-ui/core';

function CreateIdeaFormSkeleton() {
  const classes = useGutterAllChild({ spacing: 3 });
  return (
    <Box mt={3} className={classes.gutterAllChild}>
      <Skeleton variant="rect" component="div" height={40} />
      <Skeleton variant="rect" component="div" height={80} />
      <Skeleton variant="rect" component="div" height={40} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Skeleton component="div" variant="rect" height={40} />
        </div>
        <div>
          <Skeleton component="div" variant="rect" width={30} height={30} />
        </div>
      </div>
      <Skeleton variant="rect" component="div" height={40} />
    </Box>
  );
}

export default CreateIdeaFormSkeleton;
