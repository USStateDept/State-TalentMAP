import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const HandshakeOffered = ({ name, message, cb }) => (
  <span>
    {name}, {message}
    <div className="bottom-section">
      Go to your Bid Tracker to accept the Handshake
      <Link to="/profile/bidtracker">
        <button role="link" onClick={cb}> Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeOffered.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  cb: PropTypes.func,
};

HandshakeOffered.defaultProps = {
  cb: EMPTY_FUNCTION,
};

export default HandshakeOffered;
