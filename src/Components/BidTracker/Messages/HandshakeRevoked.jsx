import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HandshakeRevoked = ({ name, message }) => (
  <span>
    {name}, {message}
    <div className="bottom-section">
      <Link to="/profile/bidtracker">
        <button role="link" onClick={() => toast.dismiss()}>Bid Tracker</button>
      </Link>
    </div>
  </span>
);

HandshakeRevoked.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default HandshakeRevoked;
