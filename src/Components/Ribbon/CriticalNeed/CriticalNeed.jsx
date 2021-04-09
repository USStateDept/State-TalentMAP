import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const CriticalNeed = ({ condensed, compare, ...props }) => {
  let text = 'Critical need';
  if (condensed) {
    text = '';
  }
  if (compare) {
    text = 'CN';
  }
  return (
    <Ribbon icon="exclamation" text={text} type="cn" {...props} />
  );
};

CriticalNeed.propTypes = {
  condensed: PropTypes.bool,
  compare: PropTypes.bool,
};

CriticalNeed.defaultProps = {
  condensed: false,
  compare: false,
};

export default CriticalNeed;
