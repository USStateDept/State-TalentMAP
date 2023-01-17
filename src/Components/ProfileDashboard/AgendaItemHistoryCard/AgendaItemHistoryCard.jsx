import { Link } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import StaticDevContent from '../../StaticDevContent';

const AgendaItemHistoryCard = () => {

  return (
    <div className="usa-grid-full notifications-container">
      <div className="usa-grid-full section-padded-inner-container padded-container-no-bottom">
        <div className="usa-width-three-fourths">
          <SectionTitle title="Agenda Item History" icon="user-circle-o"/>
        </div>
        <div className="usa-width-one-fourth small-link-container small-link-container-settings">
          <StaticDevContent>
            <Link to="/profile/cdo/employeeagendas/">Link to Agenda Item History</Link>
          </StaticDevContent>
        </div>
      </div>
    </div>
  );
};

AgendaItemHistoryCard.propTypes = {
};

AgendaItemHistoryCard.defaultProps = {
};

export default AgendaItemHistoryCard;
