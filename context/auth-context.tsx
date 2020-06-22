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

const AuthProvider: React.FC = ({ children }) => {
  const { data, loading, client } = useGetMyProfileQuery();

  const login = React.useCallback((token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidea_auth_token', token);
    }
    client.resetStore();
  }, []);

  const logout = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sidea_auth_token');
    }
    client.resetStore();
  }, []);

  const authenticated = !loading && !!data?.me;

  const value = React.useMemo(
    () => ({ loading, authenticated, user: data?.me, login, logout }),
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
