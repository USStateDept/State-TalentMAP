import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_POST, NO_SKILL } from '../../Constants/SystemMessages';
import LanguageList from '../LanguageList';
import StaticDevContent from '../StaticDevContent';
import CondensedCardDataPoint from './CondensedCardDataPoint';
import { getPostName } from '../../utilities';

const CondensedCardData = ({ position }) => (
  <div className="usa-grid-full condensed-card-data">
    <CondensedCardDataPoint
      title="Post"
      content={getPostName(position.post, NO_POST)}
      hasFixedTitleWidth
    />
    <CondensedCardDataPoint
      title="Skill Code"
      content={position.skill || NO_SKILL}
      hasFixedTitleWidth
    />
    <CondensedCardDataPoint
      title="Language"
      content={<LanguageList languages={position.languages} />}
      hasFixedTitleWidth
    />
    <StaticDevContent>
      <CondensedCardDataPoint
        title="Time of estimated departure"
        content="6.1.18"
        hasFixedTitleWidth
      />
    </StaticDevContent>
  </div>
);

CondensedCardData.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default CondensedCardData;
