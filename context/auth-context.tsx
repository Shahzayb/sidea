import React from 'react';
import { useGetMyProfileQuery, User } from '../graphql/client/types';

type AuthContext = {
  loading: boolean;
  authenticated: boolean;
  user?: Pick<User, 'id' | 'name' | 'username' | 'avatar' | 'email'>;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AUTH_TOKEN_KEY = 'sidea_auth_token';

const AuthProvider: React.FC = ({ children }) => {
  const { data, loading } = useGetMyProfileQuery();

  const login = React.useCallback((token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      window.location.reload(true);
    }
  }, []);

  const logout = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.reload(true);
    }
  }, []);

  const authenticated = !!data?.me;

  // if authentication is failed, then remove token
  React.useEffect(() => {
    if (!loading && !authenticated) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }, [authenticated, loading]);

  const value = React.useMemo(
    () => ({
      loading,
      authenticated,
      user: data?.me,
      login,
      logout,
    }),
    [loading, authenticated, login, logout, data?.me]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
