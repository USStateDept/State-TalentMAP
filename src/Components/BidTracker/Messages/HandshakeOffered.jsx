import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HandshakeOffered = ({ name, message }) => (
  <span>
    {name}, {message}
    <div className="bottom-section">
      Go to your Bid Tracker to accept/decline the Handshake
      <Link to="/profile/bidtracker">
        <button role="link" onClick={() => toast.dismiss()}>Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeOffered.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default HandshakeOffered;
