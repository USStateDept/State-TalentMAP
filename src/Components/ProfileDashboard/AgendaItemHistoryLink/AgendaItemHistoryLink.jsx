import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkFlag } from 'flags';
import SectionTitle from '../SectionTitle';

const useAgendaItemHistory = () => checkFlag('flags.agenda_item_history');

const AgendaItemHistoryLink = (props) => {
  const showAgendaItemHistory = useAgendaItemHistory();
  return (
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-grid-full">
        <div className="usa-width-three-fourths agenda-item-history-header">
          <SectionTitle title="Agenda Item History" icon="user-circle-o" />
        </div>
      </div>
      {
        showAgendaItemHistory &&
      <div className="usa-grid-full small-link-container agenda-item-history-link">
        <Link to={`/profile/${props?.userRole}/agendaitemhistory/${props?.perdet}`}>Go to Agenda Item History</Link>
      </div>
      }
    </div>
  );
};

AgendaItemHistoryLink.propTypes = {
  perdet: PropTypes.string,
  userRole: PropTypes.string,
};

AgendaItemHistoryLink.defaultProps = {
  perdet: '',
  userRole: '',
};

export default AgendaItemHistoryLink;
