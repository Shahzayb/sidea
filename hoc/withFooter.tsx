import React from 'react';
import Footer from '../components/Footer';

function withFooter<P extends {} = {}>(
  Component: React.FC<P> | React.ComponentClass<P>
) {
  return (props: P) => (
    <>
      <Component {...props} />
      <Footer />
    </>
  );
}

export default withFooter;
