import Steps, { Step } from 'rc-steps';
import shortId from 'shortid';
import PropTypes from 'prop-types';
import { APPROVED } from 'Constants/BidStatuses';
import { checkFlag } from 'flags';
import { get } from 'lodash';
import { BID_OBJECT } from 'Constants/PropTypes';
import { HAND_SHAKE_ACCEPTED_PROP } from 'Constants/BidData';
import ConfettiIcon from './ConfettiIcon';
import { bidClassesFromCurrentStatus } from '../BidHelpers';
import BID_STEPS from './BidStepsHelpers';
import BidStepIcon from './BidStepIcon';
import BidPreparingIcon from './BidStepIcon/BidPreparingIcon';
import { formatDate, getFlagColorsByTextSearch } from '../../../utilities';

const getUseConfetti = () => checkFlag('flags.confetti');

// Use the rc-steps module to render the bid tracker.
// It uses <Steps> as a parent with <Step> children.
// We pass the bid through bidClassesFromCurrentStatus to get classes and text
// for each Step.
// We map the BID_STEPS to a <Step> and pass those classes and text to each Step
// based on the status, which should match up with the object returned
// by bidClassesFromCurrentStatus.
// These classes determine colors, whether to use an icon or a number, the title text, etc.
const BidSteps = (props, context) => {
  const { bid, collapseOverlay } = props;
  const { condensedView } = context;
  const bidData = bidClassesFromCurrentStatus(bid).stages || {};
  const handshakeRegisteredAnotherClient =
    get(bid, 'position_info.bid_statistics[0].has_handshake_offered') && (bid.status !== HAND_SHAKE_ACCEPTED_PROP);
  const getIcon = (status) => {
    const tooltipTitle = get(bidData[status.prop], 'tooltip.title');
    const tooltipText = get(bidData[status.prop], 'tooltip.text');
    const icon = (
      <BidStepIcon
        isComplete={bidData[status.prop].isComplete}
        needsAction={bidData[status.prop].needsAction}
        isCurrent={bidData[status.prop].isCurrent}
        number={bidData[status.prop].number}
        hasRescheduledTooltip={bidData[status.prop].hasRescheduledTooltip}
        tooltipTitle={tooltipTitle}
        tooltipText={tooltipText}
        handshakeRegisteredAnotherClient={handshakeRegisteredAnotherClient}
      />
    );
    if (bidData[status.prop].isCurrent && bidData[status.prop].title === APPROVED.text
    && getUseConfetti() && !condensedView) {
      let colors;
      const country = get(bid, 'position_info.position.post.location.country');
      if (country) {
        colors = getFlagColorsByTextSearch(country);
      }
      return (
        <ConfettiIcon colors={colors}>
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
          const showBidPrepToolTip = bidData[status.prop].hasBidPreparingTooltip && collapseOverlay;
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
            tailContent={
              showBidPrepToolTip ? <BidPreparingIcon /> : null
            }
            icon={icon}
          />
          );
        })
      }
    </Steps>
  );
};

BidSteps.contextTypes = {
  condensedView: PropTypes.bool,
};

BidSteps.propTypes = {
  bid: BID_OBJECT.isRequired,
  collapseOverlay: PropTypes.bool.isRequired,
};

export default BidSteps;
