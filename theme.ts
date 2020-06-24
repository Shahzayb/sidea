import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
    },
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
  })
);
