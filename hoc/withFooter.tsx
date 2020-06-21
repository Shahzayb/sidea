import React from 'react';
import Footer from '../components/Footer';

const withFooter = (Component: () => JSX.Element) => {
  return () => (
    <>
      <Component />
      <Footer />
    </>
  );
};

export default withFooter;
