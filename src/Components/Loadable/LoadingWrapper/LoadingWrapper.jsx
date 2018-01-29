import React from 'react';
import PropTypes from 'prop-types';
import LoadingError from '../LoadingError';
import Spinner from '../../Spinner';

const errorPlaceholder = 'Error loading. Try refreshing the page.';

const LoadingWrapper = (props, errorText = errorPlaceholder) => {
  if (props.error) {
    return <LoadingError>{errorText}</LoadingError>;
  }
  return <Spinner />;
};

LoadingWrapper.propTypes = {
  error: PropTypes.string,
};

LoadingWrapper.defaultProps = {
  error: undefined,
};

export default LoadingWrapper;
