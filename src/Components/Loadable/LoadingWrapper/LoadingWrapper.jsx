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
  return <Spinner size={props.size} />;
};

LoadingWrapper.propTypes = {
  error: PropTypes.shape({}),
  size: PropTypes.oneOf(['big', 'small']),
};

LoadingWrapper.defaultProps = {
  error: undefined,
  size: 'big',
};

export default LoadingWrapper;
