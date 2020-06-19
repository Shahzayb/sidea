import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.MuiIconButton-root': {
          borderRadius: 0,
        },
        '.MuiIconButton-sizeSmall': {
          padding: '5px',
        },
      },
    },
  },
});
