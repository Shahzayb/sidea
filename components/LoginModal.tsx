import React from 'react';
import {
  Dialog,
  DialogProps,
  DialogTitle,
  Link,
  Typography,
  DialogContent,
} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import LoginForm from './Forms/LoginForm';

function LoginModal(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogTitle>
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
        <Typography align="center" component="div" variant="h5">
          Login to continue
        </Typography>
      </DialogTitle>
      <DialogContent>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
