import { isNil } from 'lodash';
import { Sort_Skill_Description, USER_SKILL_CODE_ARRAY } from '../../Constants/PropTypes';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';

const SkillCodeList = ({ skillCodes, sortSkillCodeDescription }) => {
  let skillCodeList = [];
  skillCodes.forEach((skill) => {
    if (isNil(skill.description)) skillCodeList.push(skill.code);
    else if (sortSkillCodeDescription) skillCodeList.push(`(${skill.code}) ${skill.description}`);
    else skillCodeList.push(`${skill.description} (${skill.code})`);
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
  sortSkillCodeDescription: Sort_Skill_Description,
};

SkillCodeList.defaultProps = {
  skillCodes: [],
  sortSkillCodeDescription: false,
};

export default SkillCodeList;
