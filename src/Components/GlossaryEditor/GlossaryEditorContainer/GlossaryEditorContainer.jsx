import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, GROUPED_GLOSSARY_ARRAYS_OBJECT, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../Constants/PropTypes';
import GlossaryEditorCardList from '../GlossaryEditorCardList';
import Alert from '../../Alert/Alert';

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

  const noResults = glossaryItems.length === 0;

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
      {
        noResults &&
        <div className="usa-width-two-thirds">
          <Alert title="There are no Glossary terms." messages={[{ body: 'Try adding the first one.' }]} />
        </div>
      }
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
