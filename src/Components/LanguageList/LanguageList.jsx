import PropTypes from 'prop-types';
import { joinIfThere } from 'utilities';
import { NO_LANGUAGES } from '../../Constants/SystemMessages';
import { LANGUAGES } from '../../Constants/PropTypes';

const LanguageList = ({ languages, propToUse }) => {
  const languageList = (languages && languages.length)
    ? languages.map(choice => choice[propToUse]) : NO_LANGUAGES;
  const sanitizedLangList = joinIfThere(languageList, NO_LANGUAGES);
  return (
    <span>
      {sanitizedLangList}
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
