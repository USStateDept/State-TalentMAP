import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeOffered = ({ name, position, bid }) => (
  <span>
    {name}, a handshake has been offered for position:
    <Link to={position.link}>{position.name}</Link>
    <div className="bottom-section">
      Go to your Bid Tracker to accept the Handshake
      <Link to={bid}>
        <button role="link"> Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeOffered.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  bid: PropTypes.string.isRequired,
};

export default HandshakeOffered;
