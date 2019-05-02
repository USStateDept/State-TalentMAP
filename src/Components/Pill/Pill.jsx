import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Pill = ({ description, codeRef, selectionRef, onPillClick }, { isProjectedVacancy }) => (
  <button
    className={`pill ${isProjectedVacancy ? 'pill--projected-vacancy' : ''}`}
    title={`Remove ${description} filter`}
    onClick={() => onPillClick(selectionRef, codeRef, true)}
  >
    {description} <FontAwesome name="times" />
  </button>
);

Pill.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
};

Pill.propTypes = {
  description: PropTypes.string.isRequired,
  codeRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectionRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPillClick: PropTypes.func.isRequired,
};

export default Pill;
