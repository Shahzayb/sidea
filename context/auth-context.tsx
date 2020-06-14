import React from 'react';
import FullPageSpinner from '../components/FullPageSpinner';
import { useGetMyProfileQuery, User } from '../graphql/client/types';

type AuthContext = {
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

  const value = React.useMemo(() => ({ user: data?.me, login, logout }), [
    login,
    logout,
    data?.me,
  ]);

  if (loading) {
    return <FullPageSpinner />;
  }

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
