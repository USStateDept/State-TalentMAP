import React from 'react';
import PropTypes from 'prop-types';

const LoadingError = ({ children }) => (
  <div role="alert">{children}</div>
);

LoadingError.propTypes = {
  children: PropTypes.string,
};

LoadingError.defaultProps = {
  children: 'Error loading. Try refreshing the page',
};

export default LoadingError;
