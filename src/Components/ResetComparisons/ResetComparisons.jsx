import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { localStorageSetKey } from '../../utilities';

const ResetComparisons = props => {
  const { onToggle, ...rest } = props;
  const exists = () => {
    let result = false;
    const retrievedKey = localStorage
      .getItem('compare');
    const parsedKey = JSON.parse(retrievedKey);
    if (parsedKey && parsedKey.length) {
      result = true;
    }
    return result;
  };
  const remove = () => {
    localStorageSetKey('compare', '[]');
    onToggle();
  };
  const compare = exists() ?
    <a onClick={remove} role="button" tabIndex={0}>Clear All</a>
    : null;
  return (
    <div {...rest}>
      {compare}
    </div>
  );
};

ResetComparisons.propTypes = {
  onToggle: PropTypes.func,
};

ResetComparisons.defaultProps = {
  onToggle: EMPTY_FUNCTION,
};

export default ResetComparisons;
