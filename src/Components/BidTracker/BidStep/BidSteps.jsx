import React, { Component } from 'react';
import Steps, { Step } from 'rc-steps';
import shortId from 'shortid';
import { APPROVED } from 'Constants/BidStatuses';
import { checkFlag } from 'flags';
import ConfettiIcon from './ConfettiIcon';
import { bidClassesFromCurrentStatus } from '../BidHelpers';
import BID_STEPS from './BidStepsHelpers';
import BidStepIcon from './BidStepIcon';
import BidPreparingIcon from './BidStepIcon/BidPreparingIcon';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import { formatDate } from '../../../utilities';

const getUseConfetti = () => checkFlag('flags.confetti');

// Use the rc-steps module to render the bid tracker.
// It uses <Steps> as a parent with <Step> children.
// We pass the bid through bidClassesFromCurrentStatus to get classes and text
// for each Step.
// We map the BID_STEPS to a <Step> and pass those classes and text to each Step
// based on the status, which should match up with the object returned
// by bidClassesFromCurrentStatus.
// These classes determine colors, whether to use an icon or a number, the title text, etc.
class BidSteps extends Component {
  constructor(props) {
    super(props);
    this.celebrate = this.celebrate.bind(this);
    this.state = {
      confettiActive: false,
    };
  }
  celebrate() {
    this.setState({
      confettiActive: true,
    }, () => {
      setTimeout(() => {
        this.setState({ confettiActive: false });
      }, 0);
    });
  }
  render() {
    const { bid } = this.props;
    const bidData = bidClassesFromCurrentStatus(bid).stages || {};
    const getIcon = (status) => {
      const icon = (
        <BidStepIcon
          isComplete={bidData[status.prop].isComplete}
          needsAction={bidData[status.prop].needsAction}
          isCurrent={bidData[status.prop].isCurrent}
          number={bidData[status.prop].number}
          hasRescheduledTooltip={bidData[status.prop].hasRescheduledTooltip}
        />
      );
      if (bidData[status.prop].isCurrent && bidData[status.prop].title === APPROVED.text
      && getUseConfetti()) {
        return (
          <ConfettiIcon>
            {icon}
          </ConfettiIcon>
        );
      }
      return icon;
    };
    return (
      <Steps labelPlacement="vertical">
        {
        BID_STEPS.map((status) => {
          const icon = getIcon(status);
          return (<Step
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
            icon={icon}
          />
          );
        })
      }
      </Steps>
    );
  }
}

BidSteps.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default BidSteps;
