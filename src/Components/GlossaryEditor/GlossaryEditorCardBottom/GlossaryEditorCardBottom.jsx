import React from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_ERROR_OBJECT } from '../../../Constants/PropTypes';
import ErrorMessage from './ErrorMessage';
import History from './History';

const GlossaryEditorCardBottom = ({ isNewTerm, hasErrored, showEmptyWarning,
dateUpdated, updatedBy, isArchived, id, submitGlossaryTerm }) => {
  const doErrorIdsMatch = hasErrored.id === id;
  const showResponseError = hasErrored.hasErrored && doErrorIdsMatch;
  const showWarningOrError = showEmptyWarning || showResponseError;

  return (
    <div className="usa-grid-full glossary-card-bottom-container">
      <div className="glossary-warning-container">
        {
          showWarningOrError &&
            <ErrorMessage
              showEmptyWarning={showEmptyWarning}
              showResponseError={showResponseError}
            />
        }
      </div>
      {
        !isNewTerm &&
          <History
            dateUpdated={dateUpdated}
            updatedBy={updatedBy}
            isArchived={isArchived}
            id={id}
            submitGlossaryTerm={submitGlossaryTerm}
            hasErrored={showWarningOrError}
          />
      }
    </div>
  );
};

GlossaryEditorCardBottom.propTypes = {
  isNewTerm: PropTypes.bool,
  hasErrored: PropTypes.oneOfType([GLOSSARY_ERROR_OBJECT, PropTypes.bool]),
  showEmptyWarning: PropTypes.bool,
  dateUpdated: PropTypes.string.isRequired,
  updatedBy: PropTypes.string,
  isArchived: PropTypes.bool,
  id: PropTypes.number.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

GlossaryEditorCardBottom.defaultProps = {
  isNewTerm: false,
  hasErrored: {},
  showEmptyWarning: false,
  isArchived: false,
  updatedBy: undefined,
};

export default GlossaryEditorCardBottom;
