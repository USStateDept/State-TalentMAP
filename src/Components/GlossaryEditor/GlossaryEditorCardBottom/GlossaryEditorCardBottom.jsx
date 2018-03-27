import React from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_ERROR_OBJECT } from '../../../Constants/PropTypes';
import ErrorMessage from './ErrorMessage';
import History from './History';

const GlossaryEditorCardBottom = (props) => {
  const {
    id,
    dateUpdated,
    updatedBy,
    isArchived,
    isNewTerm,
    hasErrored,
    showEmptyWarning,
    submitGlossaryTerm,
  } = props;

  const doErrorIdsMatch = (hasErrored.id === id);
  const showResponseError = hasErrored.hasErrored;
  const showWarningOrError = (
    showEmptyWarning ||
    (showResponseError && (doErrorIdsMatch || isNewTerm))
  );

  const errorProps = {
    showEmptyWarning,
    error: hasErrored,
  };

  return (
    <div className="usa-grid-full glossary-card-bottom-container">
      <div className="glossary-warning-container">
        {showWarningOrError && <ErrorMessage {...errorProps} />}
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
  dateUpdated: PropTypes.string,
  updatedBy: PropTypes.string,
  isArchived: PropTypes.bool,
  id: PropTypes.number,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

GlossaryEditorCardBottom.defaultProps = {
  id: null,
  isNewTerm: false,
  hasErrored: false,
  showEmptyWarning: false,
  dateUpdated: undefined,
  isArchived: false,
  updatedBy: undefined,
};

export default GlossaryEditorCardBottom;
