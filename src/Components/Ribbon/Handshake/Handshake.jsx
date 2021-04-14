import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Handshake = ({ shortName, ...props }) => {
  const text = shortName ? 'HS' : 'Handshake';
  return (
    <Ribbon icon="handshake-o" text={text} type="primary" {...props} />
  );
};

Handshake.propTypes = {
  shortName: PropTypes.bool,
};

Handshake.defaultProps = {
  shortName: false,
};

export default Handshake;
