import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_POSITION_TITLE, NO_POST, NO_SKILL, NO_GRADE } from '../../Constants/SystemMessages';

const CondensedCardData = ({ position }) => (
  <div className="usa-grid-full condensed-card-data">
    <div>
      <strong>{ position.title || NO_POSITION_TITLE }</strong>
    </div>
    <div>
      <strong>Location: </strong>
      { position.post ? position.post.location : NO_POST }
    </div>
    <div>
      <strong>Skill Code: </strong>
      { position.skill || NO_SKILL }
    </div>
    <div>
      <strong>Grade: </strong>
      { position.grade || NO_GRADE }
    </div>
  </div>
);

CondensedCardData.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default CondensedCardData;
