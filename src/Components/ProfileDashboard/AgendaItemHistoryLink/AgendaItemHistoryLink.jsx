import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import StaticDevContent from '../../StaticDevContent';

const AgendaItemHistoryLink = (props) => (
  <div className="usa-grid-full section-padded-inner-container">
    <div className="usa-grid-full">
      <div className="usa-width-three-fourths agenda-item-history-header">
        <SectionTitle title="Agenda Item History" icon="user-circle-o" />
      </div>
    </div>
    <div className="usa-grid-full small-link-container agenda-item-history-link">
      <StaticDevContent>
        <Link to={`/profile/${props.userRole}/agendaitemhistory/${props.perdet}`}>Go to Agenda Item History</Link>
      </StaticDevContent>
    </div>
  </div>
);

AgendaItemHistoryLink.propTypes = {
  perdet: PropTypes.String,
  userRole: PropTypes.String,
};

AgendaItemHistoryLink.defaultProps = {
  perdet: '',
  userRole: '',
};

export default AgendaItemHistoryLink;
