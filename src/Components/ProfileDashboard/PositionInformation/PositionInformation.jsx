import React from 'react';
import { formatDate, propOrDefault } from '../../../utilities';
import { ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import { NO_ASSIGNMENT_POSITION, NO_ASSIGNMENT_DATE, NO_SKILL, NO_BUREAU } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import StartEnd from './StartEnd';

const PositionInformation = ({ assignment }) => {
  const assignmentStartDate = assignment.start_date ? formatDate(assignment.start_date) : false;
  const isActive = assignment.status === 'active';
  let assignmentEndDate;
  if (isActive) {
    assignmentEndDate = assignment.estimated_end_date ?
      formatDate(assignment.estimated_end_date) : '';
  } else {
    assignmentEndDate = assignment.end_date ? formatDate(assignment.end_date) : '';
  }

  // format our values
  const formattedAssignmentDates = assignment.start_date && assignment.estimated_end_date ?
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
          title="Start & End of Position"
          content={formattedAssignmentDates}
        />
        <InformationDataPoint
          title="Bureau"
          content={formattedBureau}
        />
        <InformationDataPoint
          title="Position Title"
          content={formattedPosition}
        />
        <InformationDataPoint
          title="Skill code"
          content={formattedSkill}
        />
      </div>
    </div>
  );
};

PositionInformation.propTypes = {
  assignment: ASSIGNMENT_OBJECT.isRequired,
};

export default PositionInformation;
