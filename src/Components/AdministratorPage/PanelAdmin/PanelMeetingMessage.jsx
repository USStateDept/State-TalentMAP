import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PanelMeetingMessage = ({ id, isCreate }) => {
  console.log(id);
  console.log(isCreate);
  if (isCreate) {
    return (
      <span>
        Panel ({id}) has been successfully added to Panel Meetings.
        <span>
          <Link to={`/profile/administrator/panel/${id}/`}>
            Go to edit panel
          </Link>
          , or
          <Link to={`/profile/ao/panelmeetingagendas/${id}/`}>
            Go to panel details
          </Link>
          .
        </span>
      </span>
    );
  }
  return (
    <span>
      Panel ({id}) has been successfully updated.
    </span>
  );
};

PanelMeetingMessage.propTypes = {
  id: PropTypes.string.isRequired,
  isCreate: PropTypes.bool,
};

PanelMeetingMessage.defaultProps = {
  isCreate: false,
};

export default PanelMeetingMessage;
