import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../utilities';
import ArchiveIcon from '../../ArchiveIcon';

const History = ({ dateUpdated, updatedBy, isArchived, id, submitGlossaryTerm, hasErrored }) => {
  let date = false;
  if (dateUpdated) { date = formatDate(dateUpdated); }

  let dateString = 'Date updated unknown';
  if (date) { dateString = `Updated on ${date}`; }

  let formattedUpdatedBy = 'None listed';
  if (updatedBy) { formattedUpdatedBy = updatedBy; }

  return (
    <div className="usa-grid-full glossary-editor-card-bottom">
      <div>{dateString}</div>
      <div>Editor: {formattedUpdatedBy}</div>
      <ArchiveIcon
        onSubmitOption={submitGlossaryTerm}
        isArchived={isArchived}
        id={id}
        hasErrored={hasErrored}
      />
    </div>
  );
};

History.propTypes = {
  // These two properties should exist in the glossary term object,
  // unless this was a term initially loaded into the database and never changed.
  dateUpdated: PropTypes.string,
  updatedBy: PropTypes.string,
  isArchived: PropTypes.bool,
  id: PropTypes.number.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
};

History.defaultProps = {
  dateUpdated: undefined,
  updatedBy: undefined,
  isArchived: false,
  hasErrored: false,
};

export default History;
