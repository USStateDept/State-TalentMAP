import React from 'react';
import * as AlertMessages from '../../Constants/AlertMessages';

export default (props) => {
  const { languages } = props; // eslint-disable-line react/prop-types
  const languageList = (languages && languages.length)
    ? languages.map(choice => (
      `${choice.language} `
    )) : AlertMessages.NO_LANGUAGES;
  return (
    <span>
      {languageList}
    </span>
  );
};
