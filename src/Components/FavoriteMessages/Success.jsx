import { Link } from 'react-router-dom';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const Success = ({ pos }) => (
  <span>{pos.title} ({pos.position_number}) has been successfully added to Favorites. <Link to="/profile/favorites/">Go to Favorites</Link>.</span>
);

Success.propTypes = {
  pos: POSITION_DETAILS.isRequired,
};

export default Success;
