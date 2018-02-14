import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ showEmptyWarning, showResponseError }) => (
  <span className="usa-input-error-message" role="alert">
    { showEmptyWarning && 'Title and definition cannot be blank.' }
    { showResponseError && 'Error updating term.' }
  </span>
);

ErrorMessage.propTypes = {
  showEmptyWarning: PropTypes.bool,
  showResponseError: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  showEmptyWarning: false,
  showResponseError: false,
};

export default ErrorMessage;
