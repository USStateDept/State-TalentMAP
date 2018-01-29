import React from 'react';
import PropTypes from 'prop-types';

const LoadingError = ({ children }) => (
  <div role="alert">{children}</div>
);

LoadingError.propTypes = {
  children: PropTypes.node,
};

LoadingError.defaultProps = {
  children: 'Error loading.',
};

export default LoadingError;
