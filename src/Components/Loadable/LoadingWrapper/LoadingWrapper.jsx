import React from 'react';
import PropTypes from 'prop-types';
import LoadingError from '../LoadingError';
import Spinner from '../../Spinner';

const LoadingWrapper = (props) => {
  if (props.error) {
    return (
      <LoadingError />
    );
  }
  return <Spinner />;
};

LoadingWrapper.propTypes = {
  error: PropTypes.shape({}),
};

LoadingWrapper.defaultProps = {
  error: undefined,
};

export default LoadingWrapper;
