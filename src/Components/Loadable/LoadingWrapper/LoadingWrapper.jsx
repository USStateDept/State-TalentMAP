import PropTypes from 'prop-types';
import LoadingError from '../LoadingError';
import Spinner from '../../Spinner';

const LoadingWrapper = (props) => {
  if (props.error) {
    // eslint-disable-next-line no-console
    console.error('Loading Error:', props.error);
    return (
      <LoadingError />
    );
  }
  return props.placeholder || <Spinner size={props.size} />;
};

LoadingWrapper.propTypes = {
  error: PropTypes.shape({}),
  size: PropTypes.oneOf(['big', 'small']),
  placeholder: PropTypes.node,
};

LoadingWrapper.defaultProps = {
  error: undefined,
  size: 'big',
  placeholder: null,
};

export default LoadingWrapper;
