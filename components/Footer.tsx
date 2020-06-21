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
        marginTop: '2rem',
      }}
    >
      <Copyright />
    </Paper>
  );
}

export default Footer;
