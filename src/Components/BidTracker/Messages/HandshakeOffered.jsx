import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, includes } from 'lodash';
import { history } from '../../../store';

const HandshakeOffered = ({ name, message }) => {
  const dismissToastsPaths = ['/profile/notifications', '/profile/bidtracker'];
  history.listen((newLocation) => {
    if (includes(dismissToastsPaths, get(newLocation, 'pathname'))) {
      toast.dismiss();
    }
  });
  return (
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
};

HandshakeOffered.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default HandshakeOffered;
