import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HandshakeOffered = ({ name, message }) => (
  <span>
    {name}, {message}
    <div className="bottom-section">
      Go to your Bid Tracker to accept the Handshake
      <Link to="/profile/bidtracker">
        <button role="link"> Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeOffered.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default HandshakeOffered;
