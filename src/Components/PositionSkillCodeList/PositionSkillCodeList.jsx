import PropTypes from 'prop-types';
import { NO_SKILL } from '../../Constants/SystemMessages';

const PositionSkillCodeList = ({ primarySkill, secondarySkill }) => {
  let skillCodeList = [];
  if (primarySkill) { skillCodeList.push(primarySkill); }
  if (secondarySkill) { skillCodeList.push(secondarySkill); }
  skillCodeList = skillCodeList.join(', ') || NO_SKILL;
  return (
    <span>
      {skillCodeList}
    </span>
  );
};

PositionSkillCodeList.propTypes = {
  primarySkill: PropTypes.string,
  secondarySkill: PropTypes.string,
};

PositionSkillCodeList.defaultProps = {
  primarySkill: '',
  secondarySkill: '',
};

export default PositionSkillCodeList;
