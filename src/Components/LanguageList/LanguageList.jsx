import React from 'react';
import PropTypes from 'prop-types';
import { NO_LANGUAGES } from '../../Constants/SystemMessages';
import { LANGUAGES } from '../../Constants/PropTypes';

const LanguageList = ({ languages, propToUse }) => {
  const languageList = (languages && languages.length)
    ? languages.map((choice, i) => (
      `${choice[propToUse]}${i < languages.length - 1 ? ', ' : ''}`
    )) : NO_LANGUAGES;
  return (
    <span>
      {languageList}
    </span>
  );
};

LanguageList.propTypes = {
  languages: LANGUAGES,
  propToUse: PropTypes.oneOf(['language', 'representation']),
};

LanguageList.defaultProps = {
  languages: [],
  propToUse: 'language',
};

export default LanguageList;
