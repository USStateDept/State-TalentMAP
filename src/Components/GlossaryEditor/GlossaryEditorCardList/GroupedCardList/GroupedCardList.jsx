import React from 'react';
import PropTypes from 'prop-types';
import { GROUPED_GLOSSARY_ARRAYS_OBJECT } from '../../../../Constants/PropTypes';
import GlossaryEditorCard from '../../GlossaryEditorCard';

const GroupedCardList = ({ terms, submitGlossaryTerm, groups }) => (
  <div className="usa-grid-full grouped-glossary-listing">
    {
      groups.map(termGroup => (
        <div key={termGroup} className="usa-grid-full term-group">
          <div className="term-title">{termGroup}</div>
          {
            terms[termGroup].map((term, i) => (
              <div
                className={`usa-width-one-half glossary-editor-card-container ${(i + 1) % 2 === 0 ? 'usa-end-row' : ''}`}
                key={term.title}
              >
                <GlossaryEditorCard
                  term={term}
                  submitGlossaryTerm={submitGlossaryTerm}
                />
              </div>
            ))
          }
        </div>
        ))
      }
  </div>
);

GroupedCardList.propTypes = {
  terms: GROUPED_GLOSSARY_ARRAYS_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GroupedCardList;
