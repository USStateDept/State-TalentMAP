import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PanelMeetingMessage = ({ id }) => (
  <span>Panel ({id}) has been successfully added to Panel Meetings. <span><Link to={`/profile/administrator/panel/${id}/`}>Go to edit panel</Link>, or <Link to={`/profile/ao/panelmeetingagendas/${id}/`}>Go to panel details</Link>.</span></span>
);

PanelMeetingMessage.propTypes = {
  id: PropTypes.string.isRequired,
};

PanelMeetingMessage.defaultProps = {
};

export default PanelMeetingMessage;
