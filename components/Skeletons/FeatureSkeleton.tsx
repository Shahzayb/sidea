import React from 'react';
import { Skeleton } from '@material-ui/lab';

export default function FeatureSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <Skeleton width="60%" height={24} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Skeleton
          component="div"
          style={{ marginRight: '10px' }}
          variant="circle"
          width={24}
          height={24}
        />
        <Skeleton component="div" variant="circle" width={24} height={24} />
      </div>
    </div>
  );
}
