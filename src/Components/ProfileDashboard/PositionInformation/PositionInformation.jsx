import React from 'react';
import { formatDate } from '../../../utilities';
import { ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import { NO_ASSIGNMENT_POSITION, NO_ASSIGNMENT_DATE } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import StartEnd from './StartEnd';
import StaticDevContent from '../../StaticDevContent';

const PositionInformation = ({ assignment }) => {
  const assignmentStartDate = formatDate(assignment.start_date);
  const assignmentEndDate = formatDate(assignment.estimated_end_date);
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
        <StaticDevContent>
          <InformationDataPoint title="Bureau" content="Bureau of Western Hemispheric Affairs" />
        </StaticDevContent>
        <InformationDataPoint
          title="Position Title"
          content={assignment.position || NO_ASSIGNMENT_POSITION}
        />
        <StaticDevContent>
          <InformationDataPoint title="Skill Code" content="Medical Technology (6145)" />
        </StaticDevContent>
      </div>
    </div>
  );
};

PositionInformation.propTypes = {
  assignment: ASSIGNMENT_OBJECT.isRequired,
};

export default PositionInformation;
