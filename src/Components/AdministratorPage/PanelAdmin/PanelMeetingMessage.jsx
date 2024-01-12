import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PanelMeetingMessage = ({ id }) => (
  <span>Panel ({id}) has been successfully added to Panel Meetings. <span><Link to={`/profile/administrator/panel/${id}/`}>Go to panel</Link>.</span></span>
);

PanelMeetingMessage.propTypes = {
  id: PropTypes.string.isRequired,
};

PanelMeetingMessage.defaultProps = {
};

export default PanelMeetingMessage;
