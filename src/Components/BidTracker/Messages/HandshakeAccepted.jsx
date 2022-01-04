/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeAccepted = ({ position_info, username, isCDO }) => (
  <span>
    {
      !isCDO ?
        `${username}, you have successfully accepted a handshake for position:`
        :
        `On behalf of ${username}, you have successfully accepted a handshake for position:`
    }
    <Link to={`/details/${position_info.id}`}>{position_info.position.title}</Link>
  </span>
);

HandshakeAccepted.propTypes = {
  username: PropTypes.string.isRequired,
  position_info: PropTypes.shape({
    id: PropTypes.string,
    position: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  isCDO: PropTypes.bool,
};

HandshakeAccepted.defaultProps = {
  isCDO: false,
};

export default HandshakeAccepted;
