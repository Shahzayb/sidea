import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  ThemeOptions,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core';
import {
  useGetMySettingsQuery,
  ThemeMode,
  useUpdateThemeModeMutation,
} from '../graphql/client/types';

const BASE_THEME: ThemeOptions = {
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiPaper: {
      variant: 'outlined',
      elevation: 0,
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
  ...BASE_THEME,

  palette: {
    primary: {
      main: '#0F2E44',
      contrastText: '#fff',
    },
    secondary: {
      main: '#DB8423',
      contrastText: '#fff',
    },
    type: 'light',
  },
};

const DARK_THEME: ThemeOptions = {
  ...BASE_THEME,
  palette: {
    primary: {
      main: '#A7E1ED',
      contrastText: '#000',
    },
    secondary: {
      main: '#FFE6AC',
      contrastText: '#000',
    },
    type: 'dark',
  },
};

type Toggle = () => void;

type ThemeContext = {
  mode: ThemeMode;
  toggle: Toggle;
};

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

ThemeContext.displayName = 'ThemeContext';

export const ThemeToggleProvider: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.Light);

  useGetMySettingsQuery({
    onCompleted(data) {
      setMode(data.mySetting.themeMode);
    },
  });

  const [updateThemeModeMutation] = useUpdateThemeModeMutation();

  const toggle = React.useCallback(async () => {
    if (mode === ThemeMode.Light) {
      setMode(ThemeMode.Dark);
      try {
        await updateThemeModeMutation({
          variables: {
            input: {
              themeMode: ThemeMode.Dark,
            },
          },
        });
      } catch {}
    } else {
      setMode(ThemeMode.Light);
      try {
        await updateThemeModeMutation({
          variables: {
            input: {
              themeMode: ThemeMode.Light,
            },
          },
        });
      } catch {}
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
    return responsiveFontSizes(
      createMuiTheme(mode === ThemeMode.Light ? LIGHT_THEME : DARK_THEME)
    );
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
