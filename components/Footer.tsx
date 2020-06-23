import React from 'react';
import { Paper } from '@material-ui/core';
import Copyright from './Copyright';

function Footer() {
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '3rem',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Copyright />
    </Paper>
  );
}

export default Footer;
