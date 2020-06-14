import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import history from '../lib/history';
import { useAuth } from '../context/auth-context';

const AuthenticatedAccessibleRoute = (props) => {
  const { user } = useAuth();
  const authenticated = !!user;
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated]);
  return authenticated ? <Route {...props} /> : null;
};

export default AuthenticatedAccessibleRoute;
