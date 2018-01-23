import React from 'react';
import { formatDate } from '../../../utilities';
import { ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import { NO_ASSIGNMENT_POSITION, NO_ASSIGNMENT_DATE, NO_SKILL, NO_BUREAU } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import StartEnd from './StartEnd';
import StaticDevContent from '../../StaticDevContent';

const PositionInformation = ({ assignment }) => {
  const assignmentStartDate = assignment.start_date ? formatDate(assignment.start_date) : false;
  const assignmentEndDate = assignment.end_date ? formatDate(assignment.estimated_end_date) : false;
  return (
    <div className="usa-grid-full">
      <div className="section-padded-inner-container">
        <SectionTitle title="Position Information" icon="flag" />
        <InformationDataPoint
          title="Start & End of Position"
          content={(assignment.start_date && assignment.estimated_end_date) ?
            <StartEnd
              start={assignmentStartDate}
              end={assignmentEndDate}
            />
          : NO_ASSIGNMENT_DATE
        }
        />
        <InformationDataPoint
          title="Bureau"
          content={
            assignment.position && assignment.position.bureau
              ? assignment.position.bureau : NO_BUREAU
          }
        />
        <InformationDataPoint
          title="Position Title"
          content={
            assignment.position && assignment.position.title
              ? assignment.position.title : NO_ASSIGNMENT_POSITION
          }
        />
        <StaticDevContent>
          <InformationDataPoint
            title="Skill Code"
            content={
              assignment.position && assignment.position.skill
                ? assignment.position.skill : NO_SKILL
            }
          />
        </StaticDevContent>
      </div>
    </div>
  );
};

PositionInformation.propTypes = {
  assignment: ASSIGNMENT_OBJECT.isRequired,
};

export default PositionInformation;
