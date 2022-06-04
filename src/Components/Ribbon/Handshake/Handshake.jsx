import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Handshake = ({ shortName, type, ...props }) => {
  const text = shortName ? 'HS' : 'Handshake';
  return (
    <Ribbon icon="handshake-o" text={text} type={type} {...props} />
  );
};

Handshake.propTypes = {
  shortName: PropTypes.bool,
  type: PropTypes.string,
};

Handshake.defaultProps = {
  shortName: false,
  type: 'primary',
};

export default Handshake;
