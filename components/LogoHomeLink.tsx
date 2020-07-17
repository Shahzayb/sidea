import React from 'react';
import { Typography } from '@material-ui/core';

import Link from './Link';
import Logo from './Icons/Logo';

export default function LogoHomeLink() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Link
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        underline="none"
        color="primary"
        href="/"
      >
        <Typography component="div" variant="h3">
          <Logo fontSize="inherit" />
        </Typography>
        <Typography component="div" variant="h6">
          Sidea
        </Typography>
      </Link>
    </div>
  );
}
