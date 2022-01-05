import { get } from 'lodash';
// import { Link } from 'react-router-dom';
import { NO_LANGUAGES, NO_POSITION_NUMBER, NO_POST, NO_SKILL } from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import { formatDate, getPostName } from '../../../../../utilities';
import StartEnd from '../../../PositionInformation/StartEnd';


const AssignmentsContent = ({ assignment }) => (
  <div className="usa-grid-full bid-content-container">
    <div className="bid-list-card-title-lg">
      <span className="bid-list-card-title-post">{get(assignment, 'position.title')} </span>
    </div>
    <div>
      <span className="usa-sr-only">Position number: </span>
      <span className="bid-list-card-title-post bid-list-card-title-lg">
        {
          get(assignment, 'position.position_number') ?
            `(${get(assignment, 'position.position_number')}) ` : NO_POSITION_NUMBER
        }
      </span>
      {/* <Link to={`/archived/${get(assignment, 'position.position_id')}`}>View Position</Link> */}
    </div>
    <div>
      <span className="bid-list-card-title-post">Location: </span>
      {getPostName(get(assignment, 'position.post', NO_POST))}
    </div>
    <div>
      <span className="bid-list-card-title-post">Skill: </span>
      {get(assignment, 'position.skill', NO_SKILL)}
    </div>
    <div>
      <span className="bid-list-card-title-post">Language: </span>
      {get(assignment, 'position.language', NO_LANGUAGES)}
    </div>
    <div>
      <span className="bid-list-card-title-post">Start date and End date: </span>
      <StartEnd
        start={formatDate(assignment.start_date)}
        end={formatDate(assignment.end_date)}
      />
    </div>
  </div>
);

AssignmentsContent.propTypes = {
  assignment: POSITION_DETAILS.isRequired,
};


export default AssignmentsContent;
