import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { EMPTY_FUNCTION } from 'Constants/PropTypes';
// import { markNotification } from '../../../actions/notifications';
// import { useDispatch } from 'react-redux';

const HandshakeOffered = ({ name, message }) => {
  const abc = () => {
    //  call markNotification
    // eslint-disable-next-line no-console
    console.log('current: 4 in abc');
    // const dispatch = useDispatch();
    // dispatch(markNotification);
    // def();
  };

  return (
    <span>
      {name}, {message}
      <div className="bottom-section">
      Go to your Bid Tracker to accept the Handshake
        <button role="link" onClick={abc}>click me</button>
        <Link to="/profile/bidtracker">
          <button role="link" onClick={abc}> Bid Tracker</button>
        </Link>
      </div>
    </span>
  );
};

HandshakeOffered.propTypes = {
  // name: PropTypes.string,
  // message: PropTypes.string,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  // def: PropTypes.func,
};

// HandshakeOffered.defaultProps = {
// name: '',
// message: '',
// def: EMPTY_FUNCTION,
// };

// const mapDispatchToProps = dispatch => ({
//   def: () => dispatch(markNotification()),
// });

export default HandshakeOffered;
// export default connect(null, mapDispatchToProps)(HandshakeOffered);
