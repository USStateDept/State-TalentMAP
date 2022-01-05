import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT, GROUPED_GLOSSARY_ARRAYS_OBJECT } from '../../../Constants/PropTypes';
import GlossaryEditorCardList from '../GlossaryEditorCardList';

const GlossaryEditorContainer = (props) => {
  const {
    glossaryItems,
    submitGlossaryTerm,
    submitGlossaryFirstLetter,
    availableLetters,
    glossaryPatchHasErrored,
    glossaryPatchSuccess,
    onGlossaryEditorCancel,
  } = props;

  return (
    <div className="usa-grid-full user-dashboard">
      <GlossaryEditorCardList
        submitGlossaryFirstLetter={submitGlossaryFirstLetter}
        submitGlossaryTerm={submitGlossaryTerm}
        terms={glossaryItems}
        availableLetters={availableLetters}
        glossaryPatchHasErrored={glossaryPatchHasErrored}
        glossaryPatchSuccess={glossaryPatchSuccess}
        onGlossaryEditorCancel={onGlossaryEditorCancel}
      />
    </div>
  );
};

GlossaryEditorContainer.propTypes = {
  glossaryItems: GROUPED_GLOSSARY_ARRAYS_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  submitGlossaryFirstLetter: PropTypes.func.isRequired,
  availableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
  onGlossaryEditorCancel: PropTypes.func,
};

GlossaryEditorContainer.defaultProps = {
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
  onGlossaryEditorCancel: EMPTY_FUNCTION,
};

export default GlossaryEditorContainer;
