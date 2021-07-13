import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const HardToFill = ({ shortName, ...props }) => {
  const text = shortName ? 'HTF' : 'Hard to fill';
  return (
    <Ribbon icon="bolt" text={text} type="htf" {...props} />
  );
};

HardToFill.propTypes = {
  shortName: PropTypes.bool,
};

HardToFill.defaultProps = {
  shortName: false,
};

export default HardToFill;
