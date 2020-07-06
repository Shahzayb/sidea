import React from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
function UserProfileCardSkeleton() {
  return (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40}></Skeleton>}
        title={<Skeleton width="20%" />}
        subheader={<Skeleton width="15%" />}
        action={<Skeleton variant="circle" width={25} height={25} />}
      />
      <CardContent>
        <Skeleton width="40%" />
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton width="100%" height={50} />
      </CardActions>
    </Card>
  );
}

export default UserProfileCardSkeleton;
