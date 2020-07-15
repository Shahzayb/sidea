import React from 'react';
import { Typography } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import Link from './Link';

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
        {/* temp: use original logo here */}
        <Typography component="div" variant="h3">
          <EmojiObjectsIcon fontSize="inherit" />
        </Typography>
        <Typography component="div" variant="h6">
          Sidea
        </Typography>
      </Link>
    </div>
  );
}
