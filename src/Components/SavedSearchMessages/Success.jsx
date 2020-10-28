import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Success = ({ name, isUpdated }) => {
  let prefix = 'New';
  let suffix = 'saved';
  if (isUpdated) {
    prefix = 'Your saved';
    suffix = 'updated';
  }
  return (
    <span>{prefix} search with the name {name} has been {suffix}! <Link to="/profile/searches/">Go to Saved Searches</Link>.</span>
  );
};

Success.propTypes = {
  name: PropTypes.string.isRequired,
  isUpdated: PropTypes.bool,
};

Success.defaultProps = {
  isUpdated: false,
};

export default Success;
