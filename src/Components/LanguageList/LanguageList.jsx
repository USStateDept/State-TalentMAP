import React from 'react';
import { NO_LANGUAGES } from '../../Constants/SystemMessages';
import { LANGUAGES } from '../../Constants/PropTypes';

const LanguageList = ({ languages }) => {
  const languageList = (languages && languages.length)
    ? languages.map(choice => (
      `${choice.language} `
    )) : NO_LANGUAGES;
  return (
    <span>
      {languageList}
    </span>
  );
};

LanguageList.propTypes = {
  languages: LANGUAGES,
};

LanguageList.defaultProps = {
  languages: [],
};

export default LanguageList;
