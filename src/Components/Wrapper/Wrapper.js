import React from 'react';

export default (props) => {
  const { children } = props; // eslint-disable-line react/prop-types
  const style = {
    backgroundColor: '#dfdfdf',
    backgroundPosition: '-0.25rem 0.75rem',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '5rem',
    borderRadius: '4px',
    padding: '1rem 1rem 0.5rem 1rem',
  };
  return (
    <div style={style}>
      {children}
    </div>
  );
};
