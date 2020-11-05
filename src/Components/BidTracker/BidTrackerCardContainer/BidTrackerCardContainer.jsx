import PropTypes from 'prop-types';
import { BID_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import BidTrackerCard from '../BidTrackerCard';
import IsPriority from '../PriorityCards/IsPriority';
import IsOnStandby from '../PriorityCards/IsOnStandby';
import { APPROVED_PROP } from '../../../Constants/BidData';

// assign values to constants for equality checks later
const DEFAULT = 'default';
const PRIORITY = 'priority';
const STANDBY = 'standby';

// Here we'll figure out which wrapper to use around the BidTrackerCard, if any.
// We check two things - one, is there even a priority bid in the list (priorityExists).
// If a priority bid exists, then we check whether this individual bid is the priority bid.
// If it is, we'll wrap the card in the IsPriority component, and if not, we'll pass the bid
// object to the IsOnStandby component.
const BidTrackerCardContainer = ({ bid, acceptBid, declineBid, registerHandshake, priorityExists,
  userProfile, submitBid, deleteBid, useCDOView, unregisterHandshake }) => {
  const getCard = ({ ...props }) => (
    <BidTrackerCard
      bid={bid}
      acceptBid={acceptBid}
      declineBid={declineBid}
      userProfile={userProfile}
      submitBid={submitBid}
      deleteBid={deleteBid}
      showBidCount
      useCDOView={useCDOView}
      registerHandshake={registerHandshake}
      unregisterHandshake={unregisterHandshake}
      {...props}
    />
  );

  // Set a displayType and change it based on priority.
  // This way we can ensure that we only have one output in our return
  let displayType = DEFAULT;
  if (priorityExists && bid.is_priority) { displayType = PRIORITY; }
  if (priorityExists && !bid.is_priority) { displayType = STANDBY; }

  let cardComponent;
  switch (displayType) {
    case PRIORITY:
      cardComponent = (
        <IsPriority isApproved={bid.status === APPROVED_PROP}>
          {getCard({ showBidCount: false })}
        </IsPriority>
      );
      break;
    case STANDBY:
      cardComponent = (<IsOnStandby bid={bid} deleteBid={deleteBid} />);
      break;
    default:
      cardComponent = getCard();
  }

  return (
    <div className="bid-tracker-container">
      { cardComponent }
    </div>
  );
};

BidTrackerCardContainer.propTypes = {
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
  priorityExists: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
  useCDOView: PropTypes.bool,
};

BidTrackerCardContainer.defaultProps = {
  priorityExists: false,
  isPriority: false,
  useCDOView: false,
};

export default BidTrackerCardContainer;
