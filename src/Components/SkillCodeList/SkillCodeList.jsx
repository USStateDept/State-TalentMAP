import { isNil } from 'lodash';
import { USER_SKILL_CODE_ARRAY } from '../../Constants/PropTypes';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';

const SkillCodeList = ({ skillCodes }) => {
  let skillCodeList = [];
  skillCodes.forEach((skill) => {
    if (isNil(skill.description)) skillCodeList.push(skill.code);
    else skillCodeList.push(`(${skill.code}) ${skill.description}`);
  });
  skillCodeList = skillCodeList.join(', ') || NO_USER_SKILL_CODE;
  return (
    <span>
      {skillCodeList}
    </span>
  );
};

SkillCodeList.propTypes = {
  skillCodes: USER_SKILL_CODE_ARRAY,
};

SkillCodeList.defaultProps = {
  skillCodes: [],
};

export default SkillCodeList;
