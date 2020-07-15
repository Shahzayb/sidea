import React from 'react';
import { Skeleton } from '@material-ui/lab';
import useMarginRightChild from '../../hooks/useMarginRightChild';

export default function IdeaActionsSkeleton() {
  const classes = useMarginRightChild();
  return (
    <div className={classes.root} style={{ display: 'flex' }}>
      <Skeleton width={60} height={40} />
      <Skeleton width={60} height={40} />
      <Skeleton width={60} height={40} />
    </div>
  );
}
