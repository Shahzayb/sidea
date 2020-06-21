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
  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        // dont create square icon button globally
        // '.MuiIconButton-root': {
        //   borderRadius: 0,
        // },
        // '.MuiIconButton-sizeSmall': {
        //   padding: '5px',
        // },
        '.MuiTypography-root': {
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          wordBreak: 'break-word',
          hyphens: 'auto',
          margin: 0,
        },
      },
    },
  },
});
