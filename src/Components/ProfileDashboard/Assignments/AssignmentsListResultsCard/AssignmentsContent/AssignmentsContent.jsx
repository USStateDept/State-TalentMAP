import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { formatDate, propOrDefault, getPostName } from '../../../../../utilities';
import { NO_POST, NO_SKILL, NO_POSITION_NUMBER } from '../../../../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../../../../Constants/PropTypes';
import LanguageList from '../../../../LanguageList';
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
          propOrDefault(assignment, 'position.position_number') ?
          `(${propOrDefault(assignment, 'position.position_number')}) ` : NO_POSITION_NUMBER
        }
      </span>
      <Link to={`/position/${get(assignment, 'position.position_number')}`}>View Position</Link>
    </div>
    <div>
      <span className="bid-list-card-title-post">Location: </span>
      {getPostName(get(assignment, 'position.post', NO_POST))}
    </div>
    <div>
      <span className="bid-list-card-title-post">Skill: </span>
      {propOrDefault(assignment, 'position.skill', NO_SKILL)}
    </div>
    <div>
      <span className="bid-list-card-title-post">Language: </span>
      <LanguageList languages={get(assignment, 'position.languages')} propToUse="representation" />
    </div>
    <div>
      <span className="bid-list-card-title-post">Start date and End date: </span>
      <StartEnd
        start={formatDate(assignment.start_date)}
        end={formatDate(assignment.estimated_end_date)}
      />
    </div>
  </div>
);

AssignmentsContent.propTypes = {
  assignment: POSITION_DETAILS.isRequired,
};


export default AssignmentsContent;
