import React from 'react';
import PropTypes from 'prop-types';

const LoadingError = ({ children }) => (
  <div role="alert">{children}</div>
);

LoadingError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingError;
