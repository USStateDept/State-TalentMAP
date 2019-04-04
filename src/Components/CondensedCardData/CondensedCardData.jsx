import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_DATE, NO_GRADE, NO_SKILL } from '../../Constants/SystemMessages';
import LanguageList from '../LanguageList';
import CondensedCardDataPoint from './CondensedCardDataPoint';
import { formatDate, propOrDefault } from '../../utilities';

const CondensedCardData = ({ position }) => {
  const estimatedEndDate = propOrDefault(position, 'current_assignment.estimated_end_date') ?
    formatDate(position.current_assignment.estimated_end_date) : NO_DATE;
  return (
    <div className="usa-grid-full condensed-card-data">
      <CondensedCardDataPoint
        title="TED"
        content={estimatedEndDate}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Skill"
        content={position.skill || NO_SKILL}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Grade"
        content={position.grade || NO_GRADE}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Language"
        content={<LanguageList languages={position.languages} propToUse="representation" />}
        hasFixedTitleWidth
      />
    </div>
  );
};

CondensedCardData.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default CondensedCardData;
