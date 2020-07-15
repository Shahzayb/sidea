import React from 'react';
import { Skeleton } from '@material-ui/lab';
import useGutterAllChild from '../../hooks/useGutterAllChild';

export default function CreateFeatureFormSkeleton() {
  const classes = useGutterAllChild({ spacing: 1 });
  return (
    <div className={classes.gutterAllChild}>
      <Skeleton component="div" height={40} />
      <Skeleton
        component="div"
        width={60}
        height={40}
        style={{ marginLeft: 'auto' }}
      />
    </div>
  );
}
