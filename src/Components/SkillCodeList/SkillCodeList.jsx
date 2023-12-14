import { isNil } from 'lodash';
import PropTypes from 'prop-types';
import { USER_SKILL_CODE_ARRAY } from '../../Constants/PropTypes';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';

const SkillCodeList = ({ skillCodes, displayCodeFirst }) => {
  let skillCodeList = [];
  skillCodes.forEach((skill) => {
    if (isNil(skill.description)) skillCodeList.push(skill.code);
    else if (displayCodeFirst) skillCodeList.push(`(${skill.code}) ${skill.description}`);
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
  displayCodeFirst: PropTypes.bool,
};

SkillCodeList.defaultProps = {
  skillCodes: [],
  displayCodeFirst: false,
};

export default SkillCodeList;
