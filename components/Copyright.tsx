import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography
      style={{ padding: '10px' }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {'Copyright © '}
      {new Date().getFullYear()}, Shahzaib Sarwar
      {'.'}
    </Typography>
  );
}
