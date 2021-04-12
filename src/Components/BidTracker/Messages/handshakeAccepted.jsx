import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeAccepted = ({ name, position, bid }) => (
  <span>
    {name}, has accepted a handshake for position:
    <Link to={position.link}>{position.name}</Link>
    <div className="bottom-section">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Go to Client's Bid Tracker to register the Handshake
      <Link to={bid}>
        <button role="link"> Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeAccepted.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  bid: PropTypes.string.isRequired,
};

export default HandshakeAccepted;