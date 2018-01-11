import React from 'react';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';
import { USER_SKILL_CODE_ARRAY } from '../../Constants/PropTypes';

const SkillCodeList = ({ skillCodes }) => {
  const skillCodeList = (skillCodes && skillCodes.length) ?
    skillCodes.slice().map(skill => `${skill.description} (${skill.code})`).join(', ')
    : NO_USER_SKILL_CODE;
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
