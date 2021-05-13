import { formatDate, propOrDefault } from '../../../utilities';
import { ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import { NO_ASSIGNMENT_DATE, NO_ASSIGNMENT_POSITION, NO_BUREAU, NO_SKILL } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import StartEnd from './StartEnd';

const PositionInformation = ({ assignment = {} }) => {
  const assignmentStartDate = assignment.start_date ? formatDate(assignment.start_date) : false;
  let assignmentEndDate;
  assignmentEndDate = (assignment.status === 'active' && assignment.estimated_end_date) ?
    assignment.estimated_end_date : assignment.end_date;
  assignmentEndDate = assignmentEndDate ? formatDate(assignmentEndDate) : '';

  // format our values
  const formattedAssignmentDates = assignmentStartDate && assignmentEndDate ?
    (<StartEnd
      start={assignmentStartDate}
      end={assignmentEndDate}
    />)
    : NO_ASSIGNMENT_DATE;
  const formattedBureau = propOrDefault(assignment, 'position.bureau', NO_BUREAU);
  const formattedPosition = propOrDefault(assignment, 'position.title', NO_ASSIGNMENT_POSITION);
  const formattedSkill = propOrDefault(assignment, 'position.skill', NO_SKILL);

  return (
    <div className="usa-grid-full">
      <div className="section-padded-inner-container">
        <SectionTitle title="Position Information" icon="flag" />
        <InformationDataPoint
          title="Start date to End date"
          content={formattedAssignmentDates}
        />
        <InformationDataPoint
          title="Bureau"
          content={formattedBureau}
        />
        <InformationDataPoint
          title="Position title"
          content={formattedPosition}
        />
        <InformationDataPoint
          title="Skill"
          content={formattedSkill}
        />
      </div>
    </div>
  );
};

PositionInformation.propTypes = {
  assignment: ASSIGNMENT_OBJECT,
};

PositionInformation.defaultProps = {
  assignment: {},
};

export default PositionInformation;
