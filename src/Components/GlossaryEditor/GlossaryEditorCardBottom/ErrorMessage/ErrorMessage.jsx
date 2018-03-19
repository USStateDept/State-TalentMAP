import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { GLOSSARY_ERROR_OBJECT } from '../../../../Constants/PropTypes';

const ErrorMessage = ({ showEmptyWarning, error }) => {
  const showResponseError = isObject(error) ? error.hasErrored : error; // Deprecated prop
  const isError = (showEmptyWarning || showResponseError);

  let message;

  // Handing 3 types of error prop values with 2 default fallback messages
  if (showEmptyWarning) {
    message = 'Title and definition cannot be blank.';
  } else {
    message = (isObject(error) ? error.message : null) || 'Error updating term.';
  }

  return (
    isError ? <span className="usa-input-error-message" role="alert">{message}</span> : null
  );
};

// TODO
// We need to consolidate to using one error prop regardless of the
// error comingfrom a client-side or api-based form validation
ErrorMessage.propTypes = {
  showEmptyWarning: PropTypes.bool,
  error: PropTypes.oneOfType([GLOSSARY_ERROR_OBJECT, PropTypes.bool]),

};

ErrorMessage.defaultProps = {
  showEmptyWarning: false,
  error: false,
};

export default ErrorMessage;
