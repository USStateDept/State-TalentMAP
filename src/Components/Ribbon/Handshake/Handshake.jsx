import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Handshake = ({ condensed, compare, ...props }) => {
  let text = 'Handshake';
  if (condensed) {
    text = '';
  }
  if (compare) {
    text = 'HS';
  }
  return (
    <Ribbon icon="handshake-o" text={text} type="primary" {...props} />
  );
};

Handshake.propTypes = {
  condensed: PropTypes.bool,
  compare: PropTypes.bool,
};

Handshake.defaultProps = {
  condensed: false,
  compare: false,
};

export default Handshake;
