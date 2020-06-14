import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import history from '../lib/history';
import { useAuth } from '../context/auth-context';

// const UnauthAccessibleRoutes = ['/register', '/login'];

const UnauthenticatedAccessibleRoute = (props) => {
  const { user } = useAuth();
  const authenticated = !!user;
  useEffect(() => {
    if (authenticated) {
      // there's one caveat with this approach:
      /**
       * assume history stack is: /login /register /login /register /login
       * then after user is authenticated, each location have to be poped from stack
       */
      // while (history.length && UnauthAccessibleRoutes.includes(history.location.pathname)) {

      // }
      // console.log(history);
      // if (history.length > 1) {
      //   history.goBack();
      // } else {
      //   history.replace('/');
      // }

      /**
       * alternative solution would be to recieve url of where we are coming from
       */

      /**
       * lazy solution
       */
      history.replace('/');
    }
  }, [authenticated]);
  return !authenticated ? <Route {...props} /> : null;
};

export default UnauthenticatedAccessibleRoute;
