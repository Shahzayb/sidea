import React from 'react';
import { Container } from '@material-ui/core';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

function withLayout<P extends {} = {}>(
  Component: React.FC<P> | React.ComponentClass<P>,
  maxWidth: Size = 'lg'
) {
  return (props: P) => (
    <Container maxWidth={maxWidth}>
      <Component {...props} />
    </Container>
  );
}

export default withLayout;
