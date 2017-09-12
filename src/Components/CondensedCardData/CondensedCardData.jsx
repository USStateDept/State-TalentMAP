import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';

const CondensedCardData = ({ position }) => (
  <div className="usa-grid-full condensed-card-data">
    {/* TODO use placeholder constants */}
    <div>
      <strong>{ position.title || SystemMessages.NO_POSITION_TITLE }</strong>
    </div>
    <div>
      <strong>Location: </strong>
      { position.post ? position.post.location : SystemMessages.NO_POST }
    </div>
    <div>
      <strong>Skill: </strong>
      { position.skill || SystemMessages.NO_SKILL }
    </div>
    <div>
      <strong>Grade: </strong>
      { position.grade || SystemMessages.NO_GRADE }
    </div>
  </div>
);

CondensedCardData.propTypes = {
  position: POSITION_DETAILS,
};

CondensedCardData.defaultProps = {
  position: {}, // TODO - remove and pass real result as prop
};

export default CondensedCardData;
