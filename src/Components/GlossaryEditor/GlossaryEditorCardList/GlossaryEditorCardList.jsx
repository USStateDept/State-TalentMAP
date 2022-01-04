import PropTypes from 'prop-types';
import { GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT, GROUPED_GLOSSARY_ARRAYS_OBJECT } from '../../../Constants/PropTypes';
import LetterList from '../LetterList';
import GroupedCardList from './GroupedCardList';
import Alert from '../../Alert';

const GlossaryEditorCardList = ({ terms, submitGlossaryTerm, submitGlossaryFirstLetter,
  availableLetters, glossaryPatchHasErrored, glossaryPatchSuccess }) => {
  const showNoResultsAlerts = !Object.keys(terms).length;
  return (
    <div className="usa-grid-full">
      <div className="usa-grid-full letter-list-container">
        <LetterList letters={availableLetters} onClick={submitGlossaryFirstLetter} />
      </div>
      <GroupedCardList
        terms={terms}
        submitGlossaryTerm={submitGlossaryTerm}
        groups={availableLetters}
        glossaryPatchHasErrored={glossaryPatchHasErrored}
        glossaryPatchSuccess={glossaryPatchSuccess}
      />
      { showNoResultsAlerts &&
        <Alert title="No glossary terms within your search criteria." messages={[{ body: 'Try broadening your search or removing filters.' }]} />
      }
    </div>
  );
};

GlossaryEditorCardList.propTypes = {
  terms: GROUPED_GLOSSARY_ARRAYS_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  submitGlossaryFirstLetter: PropTypes.func.isRequired,
  availableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
};

GlossaryEditorCardList.defaultProps = {
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
};

export default GlossaryEditorCardList;
