import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../utilities';
import ArchiveIcon from '../../ArchiveIcon';

const History = ({ dateUpdated, updatedBy, isArchived, id, submitGlossaryTerm }) => {
  let date = false;
  if (dateUpdated) { date = formatDate(dateUpdated); }

  let dateString = 'Date updated known';
  if (date) { dateString = `Updated on ${date}`; }

  let formattedUpdatedBy = 'None listed';
  if (updatedBy) { formattedUpdatedBy = updatedBy; }

  return (
    <div className="usa-grid-full glossary-editor-card-bottom">
      <div>{dateString}</div>
      <div>Editor: {formattedUpdatedBy}</div>
      <ArchiveIcon onSubmitOption={submitGlossaryTerm} isArchived={isArchived} id={id} />
    </div>
  );
};

History.propTypes = {
  dateUpdated: PropTypes.string.isRequired,
  updatedBy: PropTypes.string,
  isArchived: PropTypes.bool,
  id: PropTypes.number.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

History.defaultProps = {
  updatedBy: undefined,
  isArchived: false,
};

export default History;
