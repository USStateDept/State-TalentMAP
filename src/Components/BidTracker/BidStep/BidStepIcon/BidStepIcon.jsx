import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const BidStepIcon = ({ isComplete, needsAction, isCurrent, number }) => (
  <span className={isComplete ? 'icon-complete' : 'icon-incomplete'}>
    { !isComplete
        ?
          <span className={`
            number-icon
            ${!needsAction && !isComplete ? 'number-icon-incomplete' : ''}
            ${!needsAction && isCurrent ? 'number-icon-is-current-no-action' : ''}
            ${needsAction && isCurrent ? 'number-icon-needs-action' : ''}
          `}
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
