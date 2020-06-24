import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  ThemeOptions,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core';

const BASE_THEME: ThemeOptions = {
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
};

const LIGHT_THEME: ThemeOptions = {
  palette: {
    type: 'light',
  },
};

const DARK_THEME: ThemeOptions = {
  palette: {
    type: 'dark',
  },
};

type Mode = 'light' | 'dark';
type Toggle = () => void;

type ThemeContext = {
  mode: Mode;
  toggle: Toggle;
};

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

ThemeContext.displayName = 'ThemeContext';

export const ThemeToggleProvider: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>('light');

  const toggle = React.useCallback(() => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [mode]);

  const value = React.useMemo(
    () => ({
      mode,
      toggle,
    }),
    [mode, toggle]
  );

  const theme = React.useMemo(() => {
    let theme: ThemeOptions;
    if (mode === 'light') {
      theme = { ...BASE_THEME, ...LIGHT_THEME };
    } else {
      theme = { ...BASE_THEME, ...DARK_THEME };
    }
    return responsiveFontSizes(createMuiTheme(theme));
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useToggleTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useToggleTheme must be used within a ThemeToggleProvider`);
  }
  return context;
}
