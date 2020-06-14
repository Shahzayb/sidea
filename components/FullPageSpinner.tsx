import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function () {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}
