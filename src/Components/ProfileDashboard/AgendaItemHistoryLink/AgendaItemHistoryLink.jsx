import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle';

const AgendaItemHistoryLink = (props) => (
  <div className="usa-grid-full section-padded-inner-container">
    <div className="usa-grid-full">
      <div className="usa-width-three-fourths agenda-item-history-header">
        <SectionTitle title="Agenda Item History" icon="user-circle-o" />
      </div>
    </div>
    {
      props.showLink &&
      <div className="usa-grid-full small-link-container agenda-item-history-link">
        <Link to={`/profile/${props.userRole}/agendaitemhistory/${props.perdet}`}>Go to Agenda Item History</Link>
      </div>
    }
  </div>
);

AgendaItemHistoryLink.propTypes = {
  perdet: PropTypes.String,
  userRole: PropTypes.String,
  showLink: PropTypes.bool,
};

AgendaItemHistoryLink.defaultProps = {
  perdet: '',
  userRole: '',
  showLink: true,
};

export default AgendaItemHistoryLink;
