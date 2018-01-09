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
const BidTrackerCardContainer = ({ bid, acceptBid, declineBid, priorityExists, userProfile }) => {
  const card = (
    <BidTrackerCard
      bid={bid}
      acceptBid={acceptBid}
      declineBid={declineBid}
      userProfile={userProfile}
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

  // assign variables to the check the displayType and use in the template
  const useDefaultDisplay = displayType === DEFAULT;
  const usePriorityDisplay = displayType === PRIORITY;
  const useStandbyDisplay = displayType === STANDBY;

  return (
    <div className="bid-tracker-container">
      { useDefaultDisplay && card }
      {
        usePriorityDisplay &&
        <IsPriority>
          {card}
        </IsPriority>
      }
      {
        useStandbyDisplay &&
        <IsOnStandby bid={bid} />
      }
    </div>
  );
};

BidTrackerCardContainer.propTypes = {
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  priorityExists: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
};

BidTrackerCardContainer.defaultProps = {
  priorityExists: false,
  isPriority: false,
};

export default BidTrackerCardContainer;
