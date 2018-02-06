import React from 'react';
import PropTypes from 'prop-types';
import { GROUPED_GLOSSARY_ARRAYS_OBJECT } from '../../../Constants/PropTypes';
import LetterList from '../LetterList';
import GroupedCardList from './GroupedCardList';

const GlossaryEditorCardList = ({ terms, submitGlossaryTerm, submitGlossaryFirstLetter,
availableLetters }) => (
  <div className="usa-grid-full">
    <div className="usa-grid-full letter-list-container">
      <LetterList letters={availableLetters} onClick={submitGlossaryFirstLetter} />
    </div>
    <GroupedCardList
      terms={terms}
      submitGlossaryTerm={submitGlossaryTerm}
      groups={availableLetters}
    />
  </div>
);

GlossaryEditorCardList.propTypes = {
  terms: GROUPED_GLOSSARY_ARRAYS_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  submitGlossaryFirstLetter: PropTypes.func.isRequired,
  availableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GlossaryEditorCardList;
