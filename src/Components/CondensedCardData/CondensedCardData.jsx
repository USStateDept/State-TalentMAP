import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const CondensedCardData = ({ result }) => (
  <div className="usa-grid-full condensed-card-data">
    <div>
      <strong>{result.position || 'Position Name'}</strong>
    </div>
    <div>
      <strong>Location: </strong>
      { result.post || 'Abuja, Nigeria' /* TODO only use real data */ }
    </div>
    <div>
      <strong>Skill: </strong>
      { result.skill || 'INFORMATION SECURITY' /* TODO only use real data */ }
    </div>
    <div>
      <strong>Grade: </strong>
      { result.grade || '05' /* TODO only use real data */ }
    </div>
  </div>
);

CondensedCardData.propTypes = {
  result: POSITION_DETAILS,
};

CondensedCardData.defaultProps = {
  result: {}, // TODO - remove and pass real result as prop
};

export default CondensedCardData;
