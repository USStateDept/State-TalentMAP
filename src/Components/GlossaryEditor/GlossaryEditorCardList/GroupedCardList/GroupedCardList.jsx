import React from 'react';
import PropTypes from 'prop-types';
import { GROUPED_GLOSSARY_ARRAYS_OBJECT, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../../Constants/PropTypes';
import GlossaryEditorCard from '../../GlossaryEditorCard';

const GroupedCardList = ({ terms, submitGlossaryTerm, groups, glossaryPatchHasErrored,
glossaryPatchSuccess }) => (
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
                  hasErrored={glossaryPatchHasErrored}
                  success={glossaryPatchSuccess}
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
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
};

GroupedCardList.defaultProps = {
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
};

export default GroupedCardList;
