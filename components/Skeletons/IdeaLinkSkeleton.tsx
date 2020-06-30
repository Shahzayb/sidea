import React from 'react';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function IdeaLinkSkeleton() {
  const classes = useGutterAllChild({ spacing: 2 });
  return (
    <Paper
      className={classes.gutterAllChild}
      elevation={0}
      style={{ padding: '1rem' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton
            width={40}
            height={40}
            variant="circle"
            style={{ marginRight: '10px' }}
          />
          <Typography component="span" variant="subtitle2">
            <Skeleton width={50} />
          </Typography>
        </div>
        <Typography variant="caption" color="textSecondary">
          <Skeleton width={60} />
        </Typography>
      </div>
      <Typography component="h1" variant="h5">
        <Skeleton />
        <Skeleton width="89%" />
      </Typography>
    </Paper>
  );
}

export default IdeaLinkSkeleton;
