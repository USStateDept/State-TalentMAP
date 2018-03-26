import React from 'react';
import PropTypes from 'prop-types';
import { extend } from 'lodash';
import { EMPTY_FUNCTION, GROUPED_GLOSSARY_ARRAYS_OBJECT, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../../Constants/PropTypes';
import GlossaryEditorCard from '../../GlossaryEditorCard';

// Holds all response error states for editor cards
const errors = {};

const GroupedCardList = (props) => {
  const {
    terms,
    submitGlossaryTerm,
    groups,
    glossaryPatchHasErrored,
    glossaryPatchSuccess,
    onGlossaryEditorCancel,
  } = props;

  return (
    <div className="usa-grid-full grouped-glossary-listing">
      {
        groups.map(termGroup => (
          <div key={termGroup} className="usa-grid-full term-group">
            <div className="term-title">{termGroup}</div>
            {
              terms[termGroup].map((term, i) => {
                // Cache init
                if (!errors[term.id]) {
                  errors[term.id] = extend({}, glossaryPatchHasErrored);
                }

                // Update cached error if id matches that in error object
                if (term.id === glossaryPatchHasErrored.id) {
                  errors[term.id] = extend({}, errors[term.id], glossaryPatchHasErrored);
                }

                // Use the stored error so that we provide errors if multiple cards are in edit mode
                const error = errors[term.id];

                return (
                  <div
                    className={`usa-width-one-half glossary-editor-card-container ${(i + 1) % 2 === 0 ? 'usa-end-row' : ''}`}
                    key={term.title}
                  >
                    <GlossaryEditorCard
                      term={term}
                      submitGlossaryTerm={submitGlossaryTerm}
                      onCancel={onGlossaryEditorCancel}
                      hasErrored={error}
                      success={glossaryPatchSuccess}
                    />
                  </div>
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
};

GroupedCardList.propTypes = {
  terms: GROUPED_GLOSSARY_ARRAYS_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
  onGlossaryEditorCancel: PropTypes.func,
};

GroupedCardList.defaultProps = {
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
  onGlossaryEditorCancel: EMPTY_FUNCTION,
};

export default GroupedCardList;
