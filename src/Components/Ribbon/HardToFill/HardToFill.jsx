import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const HardToFill = ({ condensed, compare, ...props }) => {
  let text = 'Hard to fill';
  if (condensed) {
    text = '';
  }
  if (compare) {
    text = 'HTF';
  }
  return (
    <Ribbon icon="bolt" text={text} type="htf" {...props} />
  );
};

HardToFill.propTypes = {
  condensed: PropTypes.bool,
  compare: PropTypes.bool,
};

HardToFill.defaultProps = {
  condensed: false,
  compare: false,
};

export default HardToFill;
