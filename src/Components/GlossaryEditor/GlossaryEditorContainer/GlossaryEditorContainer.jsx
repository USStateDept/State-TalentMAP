import React from 'react';
import PropTypes from 'prop-types';
import { GROUPED_GLOSSARY_ARRAYS_OBJECT } from '../../../Constants/PropTypes';
import GlossaryEditorCardList from '../GlossaryEditorCardList';
import Alert from '../../Alert/Alert';

const GlossaryEditorContainer = ({ glossaryItems, submitGlossaryTerm,
submitGlossaryFirstLetter, availableLetters }) => {
  const noResults = glossaryItems.length === 0;
  return (
    <div className="usa-grid-full user-dashboard">
      <GlossaryEditorCardList
        submitGlossaryFirstLetter={submitGlossaryFirstLetter}
        submitGlossaryTerm={submitGlossaryTerm}
        terms={glossaryItems}
        availableLetters={availableLetters}
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
};

export default GlossaryEditorContainer;
