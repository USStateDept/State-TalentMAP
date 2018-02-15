import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import BidTrackerCard from '../BidTrackerCard';
import IsPriority from '../PriorityCards/IsPriority';
import IsOnStandby from '../PriorityCards/IsOnStandby';

// Here we'll figure out which wrapper to use around the BidTrackerCard, if any.
// We check two things - one, is there even a priority bid in the list (priorityExists).
// If a priority bid exists, then we check whether this individual bid is the priority bid.
// If it is, we'll wrap the card in the IsPriority component, and if not, we'll pass the bid
// object to the IsOnStandby component.
const BidTrackerCardContainer = ({ bid, acceptBid, declineBid, priorityExists, userProfile,
submitBid, deleteBid }) => {
  const card = (
    <BidTrackerCard
      bid={bid}
      acceptBid={acceptBid}
      declineBid={declineBid}
      userProfile={userProfile}
      submitBid={submitBid}
      deleteBid={deleteBid}
    />
  );

  // assign values to constants for equality checks later
  const DEFAULT = 'default';
  const PRIORITY = 'priority';
  const STANDBY = 'standby';

  // Set a displayType and change it based on priority.
  // This way we can ensure that we only have one output in our return
  let displayType = DEFAULT;
  if (priorityExists && bid.is_priority) { displayType = PRIORITY; }
  if (priorityExists && !bid.is_priority) { displayType = STANDBY; }

  let cardComponent;
  switch (displayType) {
    case PRIORITY:
      cardComponent = (<IsPriority>{card}</IsPriority>);
      break;
    case STANDBY:
      cardComponent = (<IsOnStandby bid={bid} />);
      break;
    default:
      cardComponent = card;
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
  priorityExists: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
};

BidTrackerCardContainer.defaultProps = {
  priorityExists: false,
  isPriority: false,
};

export default BidTrackerCardContainer;
