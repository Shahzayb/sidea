import React from 'react';
import { Container } from '@material-ui/core';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

const withLayout = (Component: () => JSX.Element, maxWidth: Size = 'lg') => {
  return () => (
    <Container maxWidth={maxWidth}>
      <Component />
    </Container>
  );
};

export default withLayout;
