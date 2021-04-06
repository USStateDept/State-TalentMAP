import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const HardToFill = ({ condensed, ...props }) => {
  const text = condensed ? 'HTF' : 'Hard to fill';
  return (
    <Ribbon icon="bolt" text={text} type="htf" {...props} />
  );
};

HardToFill.propTypes = {
  condensed: PropTypes.bool,
};

HardToFill.defaultProps = {
  condensed: false,
};

export default HardToFill;
