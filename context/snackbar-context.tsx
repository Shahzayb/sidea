import React from 'react';
import {
  SnackbarProvider,
  SnackbarProviderProps,
  ProviderContext,
} from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

interface Props {
  children: React.ReactElement;
}

export function CustomSnackbarProvider(props: SnackbarProviderProps & Props) {
  const notistackRef = React.createRef<ProviderContext>();

  const onClickDismiss = (key: React.ReactText) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <SnackbarProvider
      {...props}
      ref={notistackRef}
      action={(key) => (
        <IconButton color="inherit" onClick={onClickDismiss(key)}>
          <CloseIcon />
        </IconButton>
      )}
    />
  );
}
