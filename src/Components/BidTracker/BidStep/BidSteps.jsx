import React from 'react';
import Steps, { Step } from 'rc-steps';
import shortId from 'shortid';
import { bidClassesFromCurrentStatus } from '../BidHelpers';
import BID_STEPS from './BidStepsHelpers';
import BidStepIcon from './BidStepIcon';
import { BID_OBJECT } from '../../../Constants/PropTypes';

const BidSteps = ({ bid }) => {
  const bidData = bidClassesFromCurrentStatus(bid).stages || {};
  return (
    <Steps labelPlacement="vertical">
      {
      BID_STEPS.map(status => (
        <Step
          key={shortId.generate()}
          className={`
            ${status.className}
            ${bidData[status.prop].isCurrent ? 'step-current' : ''}
            ${bidData[status.prop].isPendingLine ? 'pending-line' : ''}
            ${bidData[status.prop].isComplete ? 'step-complete' : 'step-incomplete'}
          `}
          title={
            <div>
              <div className="step-title-main-text">{bidData[status.prop].title}</div>
              <div className="step-title-sub-text">{bidData[status.prop].date}</div>
            </div>
          }
          icon={
            <BidStepIcon
              isComplete={bidData[status.prop].isComplete}
              needsAction={bidData[status.prop].needsAction}
              isCurrent={bidData[status.prop].isCurrent}
              number={bidData[status.prop].number}
              hasPendingTooltip={bidData[status.prop].hasPendingTooltip}
            />}
        />
      ))
    }
    </Steps>
  );
};

BidSteps.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default BidSteps;
