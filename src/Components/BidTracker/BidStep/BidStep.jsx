import React from 'react';
import PropTypes from 'prop-types';
import Steps, { Step } from 'rc-steps';
import bidClassesFromCurrentStatus from '../BidHelpers';
import BID_STEPS from './BidStepsHelpers';
import BidStepIcon from './BidStepIcon';

const BidSteps = ({ bid }) => {
  const bidData = bidClassesFromCurrentStatus(bid).stages;
  return (
    <Steps labelPlacement="vertical">
      {
      BID_STEPS.map(status => (
        <Step
          className={`
            ${status.className}
            ${bidData[status.prop].isCurrent ? 'step-current' : ''}
            ${bidData[status.prop].isPendingLine ? 'pending-line' : ''}
            ${bidData[status.prop].isComplete ? 'step-complete' : 'step-incomplete'}
          `}
          title={bidData[status.prop].title}
          icon={
            <BidStepIcon
              isComplete={bidData[status.prop].isComplete}
              needsAction={bidData[status.prop].needsAction}
              isCurrent={bidData[status.prop].isCurrent}
              number={bidData[status.prop].number}
            />}
        />
      ))
    }
    </Steps>
  );
};

BidSteps.propTypes = {
  bid: PropTypes.shape({}).isRequired,
};

export default BidSteps;
