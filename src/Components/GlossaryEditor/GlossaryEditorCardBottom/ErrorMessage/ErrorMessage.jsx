import PropTypes from 'prop-types';
import { get, isObject } from 'lodash';
import { GLOSSARY_ERROR_OBJECT } from '../../../../Constants/PropTypes';

const getMessage = (showEmptyWarning, showInvalidLinkWarning, error) => {
  let message;

  // Handing 3 types of error prop values with 2 default fallback messages
  if (showEmptyWarning) {
    message = 'Title and definition cannot be blank.';
  } else if (showInvalidLinkWarning) {
    message = 'Link should be blank or a valid URL with http/https.';
  } else {
    const message$ = get(error, 'message', null);
    message = message$ || 'Error updating term.';
  }
  return message;
};

const ErrorMessage = ({ showEmptyWarning, showInvalidLinkWarning, error }) => {
  const showResponseError = isObject(error) ? error.hasErrored : error; // Deprecated prop
  const isError = (showEmptyWarning || showInvalidLinkWarning || showResponseError);

  return (
    isError ? <span className="usa-input-error-message" role="alert">
      {getMessage(showEmptyWarning, showInvalidLinkWarning, error)}
    </span> : null
  );
};

// TODO
// We need to consolidate to using one error prop regardless of the
// error comingfrom a client-side or api-based form validation
ErrorMessage.propTypes = {
  showEmptyWarning: PropTypes.bool,
  showInvalidLinkWarning: PropTypes.bool,
  error: PropTypes.oneOfType([GLOSSARY_ERROR_OBJECT, PropTypes.bool]),

};

ErrorMessage.defaultProps = {
  showEmptyWarning: false,
  showInvalidLinkWarning: false,
  error: false,
};

export default ErrorMessage;
