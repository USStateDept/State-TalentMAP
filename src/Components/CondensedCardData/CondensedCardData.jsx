import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const CondensedCardData = ({ position }) => (
  <div className="usa-grid-full condensed-card-data">
    {/* TODO use placeholder constants */}
    <div>
      <strong>{ position.title }</strong>
    </div>
    <div>
      <strong>Location: </strong>
      { position.post ? position.post.location : 'None listed' /* TODO use placeholder from constant */ }
    </div>
    <div>
      <strong>Skill: </strong>
      { position.skill }
    </div>
    <div>
      <strong>Grade: </strong>
      { position.grade }
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
