import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Typography, Box } from '@material-ui/core';

function UserAvatarSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box mr={1}>
        <Skeleton variant="circle" width={40} height={40} />
      </Box>

      <Typography component="span" variant="subtitle2">
        <Skeleton width={90} />
      </Typography>
    </div>
  );
}

export default UserAvatarSkeleton;
