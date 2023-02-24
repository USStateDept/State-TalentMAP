import { get, has } from 'lodash';
// import { Link } from 'react-router-dom';
import { DEFAULT_TEXT, NO_POSITION_NUMBER } from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import LanguageList from 'Components/LanguageList';
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
      <span className="bid-list-card-title-post">Location (Org): </span>
      {`${getPostName(get(assignment, 'position.post') || DEFAULT_TEXT)} (${get(assignment, 'position.organization') || DEFAULT_TEXT})`}
    </div>
    <div>
      <span className="bid-list-card-title-post">Skill: </span>
      {get(assignment, 'position.skill') || DEFAULT_TEXT}
    </div>
    <div>
      <span className="bid-list-card-title-post">Language: </span>
      <LanguageList languages={get(assignment, 'position.languages') || []} propToUse="representation" />
    </div>
    { has(assignment, 'status') &&
      <div>
        <span className="bid-list-card-title-post">Status: </span>
        {get(assignment, 'status') || DEFAULT_TEXT}
      </div>
    }
    { has(assignment, 'asgd_tod_desc_text') &&
      <div>
        <span className="bid-list-card-title-post">TOD Description: </span>
        {get(assignment, 'asgd_tod_desc_text') || DEFAULT_TEXT}
      </div>
    }
    <div>
      <span className="bid-list-card-title-post">Start date and End date: </span>
      <StartEnd
        start={formatDate(get(assignment, 'start_date')) || DEFAULT_TEXT}
        end={formatDate(get(assignment, 'end_date')) || DEFAULT_TEXT}
      />
    </div>
  </div>
);

AssignmentsContent.propTypes = {
  assignment: POSITION_DETAILS.isRequired,
};


export default AssignmentsContent;
