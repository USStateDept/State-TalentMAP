import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ isLoading, hasErrored, loadingMessage, errorMessage }) => {
  let message = null;
  if (isLoading && !hasErrored) {
    message = loadingMessage;
  } else if (!isLoading && hasErrored) {
    message = errorMessage;
  }
  return (
    <div className="usa-grid" style={{ textAlign: 'center' }}>
      {message}
    </div>
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  loadingMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

Loading.defaultProps = {
  details: null,
  isLoading: true,
  hasErrored: false,
  loadingMessage: 'Loading...',
  errorMessage: 'Error loading',
};

export default Loading;
