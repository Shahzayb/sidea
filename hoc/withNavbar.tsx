import React from 'react';
import Navbar from '../components/Navbar';

const withNavbar = (Component: () => JSX.Element) => {
  return () => (
    <>
      <Navbar />
      <div style={{ marginTop: '2rem' }}>
        <Component />
      </div>
    </>
  );
};

export default withNavbar;
