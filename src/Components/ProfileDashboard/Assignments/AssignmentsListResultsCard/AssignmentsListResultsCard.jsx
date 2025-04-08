import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../../../Constants/PropTypes';
import InformationDataPoint from '../../../ProfileDashboard/InformationDataPoint';
import { AssignmentsContent, SeparationsContent } from './AssignmentsContent';

const AssignmentsListResultsCard = ({ assignment, isSeparation }) => (
  <div className="usa-grid-full saved-search-card favorites-card" key={assignment.id}>
    <div className="usa-grid-full">
      <div className="usa-width-one-whole favorites-card-section">
        <InformationDataPoint
          titleOnBottom
          content={
            !isSeparation ?
              <AssignmentsContent assignment={assignment} /> :
              <SeparationsContent separation={assignment} />
          }
        />
      </div>
    </div>
  </div>
);

AssignmentsListResultsCard.propTypes = {
  assignment: POSITION_DETAILS.isRequired,
  isSeparation: PropTypes.bool,
};

AssignmentsListResultsCard.defaultProps = {
  isSeparation: false,
};

export default AssignmentsListResultsCard;
