import React from 'react';
import Steps, { Step } from 'rc-steps';
import shortId from 'shortid';
import { bidClassesFromCurrentStatus } from '../BidHelpers';
import BID_STEPS from './BidStepsHelpers';
import BidStepIcon from './BidStepIcon';
import BidPreparingIcon from './BidStepIcon/BidPreparingIcon';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import { formatDate } from '../../../utilities';

// Use the rc-steps module to render the bid tracker.
// It uses <Steps> as a parent with <Step> children.
// We pass the bid through bidClassesFromCurrentStatus to get classes and text
// for each Step.
// We map the BID_STEPS to a <Step> and pass those classes and text to each Step
// based on the status, which should match up with the object returned
// by bidClassesFromCurrentStatus.
// These classes determine colors, whether to use an icon or a number, the title text, etc.
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
              <div className="step-title-sub-text">{formatDate(bidData[status.prop].date)}</div>
            </div>
          }
          tailContent={bidData[status.prop].hasBidPreparingTooltip ? <BidPreparingIcon /> : null}
          icon={
            <BidStepIcon
              isComplete={bidData[status.prop].isComplete}
              needsAction={bidData[status.prop].needsAction}
              isCurrent={bidData[status.prop].isCurrent}
              number={bidData[status.prop].number}
              hasPendingTooltip={bidData[status.prop].hasPendingTooltip}
              hasRescheduledTooltip={bidData[status.prop].hasRescheduledTooltip}
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
