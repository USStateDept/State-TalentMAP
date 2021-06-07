/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeAccepted = ({ position_info, username }) => (
  <span>
    {username}, you have successfully accepted a handshake for position:
    <Link to={`/details/${position_info.id}`}>{position_info.position.title}</Link>
    {/* <div className="bottom-section"> */}
    {/* eslint-disable-next-line react/no-unescaped-entities */}
    {/* Go to Client's Bid Tracker to register the Handshake */}
    {/* <Link to={bid}> */}
    {/* <button role="link"> Bid Tracker</button> */}
    {/* </Link> */}
    {/* </div> */}
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
};

export default HandshakeAccepted;
