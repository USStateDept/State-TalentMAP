import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PendingIcon from './PendingIcon';
import RescheduledIcon from './RescheduledIcon';

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

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number, hasPendingTooltip,
hasRescheduledTooltip }) => (
  <span className={isComplete ? 'icon-complete' : 'icon-incomplete'}>
    { !isComplete
        ?
          <div className="icon-container">
            <span
              className={assignClasses(isComplete, needsAction, isCurrent)}
            >
              {number > 0 ? number : null}
            </span>
            { hasPendingTooltip && <PendingIcon />}
            { hasRescheduledTooltip && <RescheduledIcon />}
          </div> :
          <FontAwesome name="check" /> }
  </span>
);

BidStepIcon.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  needsAction: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  number: PropTypes.number,
  hasPendingTooltip: PropTypes.bool,
  hasRescheduledTooltip: PropTypes.bool,
};

BidStepIcon.defaultProps = {
  number: 0,
  hasPendingTooltip: false,
  hasRescheduledTooltip: false,
};

export default BidStepIcon;
