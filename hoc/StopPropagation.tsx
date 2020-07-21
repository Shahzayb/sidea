import React from 'react';

const StopPropagation: React.FC = ({ children }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default StopPropagation;
