import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Pill = ({ description, codeRef, selectionRef, onPillClick,
  isTandem2, isCommon }, { isProjectedVacancy, isTandemSearch }) => {
  const classes = ['pill'];
  const lastIndex = classes.length;
  let titleSuffix = '';
  if (isProjectedVacancy) {
    classes.push('pill--projected-vacancy');
  }
  if (isTandemSearch && !isCommon) {
    classes[lastIndex] = 'pill--tandem-search';
    titleSuffix = ' from Tandem 1';
  }
  if (isTandem2 && !isCommon) {
    classes[lastIndex] = 'pill--tandem2';
    titleSuffix = ' from Tandem 2';
  }

  const classes$ = classes.join(' ');
  return (
    <button
      className={classes$}
      title={`Remove ${description} filter${titleSuffix}`}
      onClick={() => onPillClick(selectionRef, codeRef, true)}
    >
      {description} <FontAwesome name="times" />
    </button>
  );
};

Pill.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
  isTandemSearch: PropTypes.bool,
};

Pill.propTypes = {
  description: PropTypes.string.isRequired,
  codeRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectionRef: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPillClick: PropTypes.func.isRequired,
  isTandem2: PropTypes.bool,
  isCommon: PropTypes.bool,
};

Pill.defaultProps = {
  isTandem2: false,
  isCommon: false,
};

export default Pill;
