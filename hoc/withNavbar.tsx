import React from 'react';
import Navbar from '../components/Navbar';

function withNavbar<P extends {} = {}>(
  Component: React.FC<P> | React.ComponentClass<P>
) {
  return (props: P) => (
    <>
      <Navbar />
      <div style={{ marginTop: '6rem' }}>
        <Component {...props} />
      </div>
    </>
  );
}

export default withNavbar;
