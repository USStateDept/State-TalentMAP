import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const assignClasses = (isComplete, needsAction, isCurrent) => {
  const classes = ['number-icon'];

  if (!needsAction) {
    classes.push('number-icon-incomplete');
  }

  if (!needsAction && isCurrent) {
    classes.push('number-icon-is-current-no-action');
  }

  if (needsAction && isCurrent) {
    classes.push('number-icon-needs-action');
  }

  return classes.join(' ');
};

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number }) => (
  <span className={isComplete ? 'icon-complete' : 'icon-incomplete'}>
    { !isComplete
        ?
          <span
            className={assignClasses(isComplete, needsAction, isCurrent)}
          >
            {number}
          </span> :
          <FontAwesome name="check" /> }
  </span>
);

BidStepIcon.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  needsAction: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
};

export default BidStepIcon;
