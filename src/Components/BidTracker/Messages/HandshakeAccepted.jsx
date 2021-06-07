/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeAccepted = ({ position_info, username, cdoView }) => (
  <span>
    {
      !cdoView &&
        <>
          {username}, you have successfully accepted a handshake for position:
        </>
    }
    {
      cdoView &&
        <>
          You have successfully accepted a handshake, on behalf of {username}, for position:
        </>
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
  cdoView: PropTypes.bool,
};

HandshakeAccepted.defaultProps = {
  cdoView: false,
};

export default HandshakeAccepted;
