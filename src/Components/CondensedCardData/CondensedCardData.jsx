import { get } from 'lodash';
import PositionSkillCodeList from 'Components/PositionSkillCodeList';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_DATE, NO_GRADE } from '../../Constants/SystemMessages';
import LanguageList from '../LanguageList';
import CondensedCardDataPoint from './CondensedCardDataPoint';
import { formatDate, getPostNameText, propOrDefault } from '../../utilities';

const CondensedCardData = ({ position }) => {
  const estimatedEndDate = propOrDefault(position, 'ted') ?
    formatDate(position.ted) : NO_DATE;
  return (
    <div className="usa-grid-full condensed-card-data">
      <CondensedCardDataPoint
        title="TED"
        content={estimatedEndDate}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Skill"
        content={<PositionSkillCodeList primarySkill={get(position, 'position.skill')} secondarySkill={get(position, 'position.skill_secondary')} />}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Grade"
        content={get(position, 'position.grade', NO_GRADE)}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Language"
        content={<LanguageList languages={get(position, 'position.languages')} propToUse="representation" />}
        hasFixedTitleWidth
      />
      <CondensedCardDataPoint
        title="Location (Org)"
        content={getPostNameText(position?.position)}
        hasFixedTitleWidth
      />
    </div>
  );
};

CondensedCardData.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default CondensedCardData;
