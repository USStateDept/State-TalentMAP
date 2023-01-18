import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import StaticDevContent from '../../StaticDevContent';

const AgendaItemHistoryLink = () => (
  <div className="usa-grid-full section-padded-inner-container">
    <div className="usa-grid-full">
      <div className="usa-width-three-fourths agenda-item-history-header">
        <SectionTitle title="Agenda Item History" icon="user-circle-o" />
      </div>
    </div>
    <div className="usa-grid-full small-link-container agenda-item-history-link">
      <StaticDevContent>
        <Link to="/profile/cdo/employeeagendas/">Link to Agenda Item History</Link>
      </StaticDevContent>
    </div>
  </div>
);

AgendaItemHistoryLink.propTypes = {
};

AgendaItemHistoryLink.defaultProps = {
};

export default AgendaItemHistoryLink;
