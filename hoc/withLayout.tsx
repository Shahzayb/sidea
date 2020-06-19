import React from 'react';
import { Container } from '@material-ui/core';

const withNavbar = (Component: () => JSX.Element) => {
  return () => (
    <Container maxWidth="lg">
      <Component />
    </Container>
  );
};

export default withNavbar;
