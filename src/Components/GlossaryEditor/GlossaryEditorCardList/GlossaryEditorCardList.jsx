import React from 'react';
import PropTypes from 'prop-types';
import { GROUPED_GLOSSARY_ARRAYS_OBJECT, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../Constants/PropTypes';
import LetterList from '../LetterList';
import GroupedCardList from './GroupedCardList';

const GlossaryEditorCardList = ({ terms, submitGlossaryTerm, submitGlossaryFirstLetter,
availableLetters, glossaryPatchHasErrored, glossaryPatchSuccess }) => (
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
  </div>
);

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
