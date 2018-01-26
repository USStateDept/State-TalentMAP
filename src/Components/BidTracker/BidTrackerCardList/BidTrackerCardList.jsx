import React from 'react';
import PropTypes from 'prop-types';
import { BID_RESULTS, USER_PROFILE } from '../../../Constants/PropTypes';
import BidTrackerCardContainer from '../BidTrackerCardContainer';

const BidTrackerCardList = ({ bids, acceptBid, declineBid, submitBid, deleteBid, userProfile }) => {
  // Push the priority bid to the top. There should only be one priority bid.
  // We do this sorting client-side to maintain any sorts the user might select,
  // while ensuring the priority bid is stickied to the top.
  //
  // eslint rules seem to step over themselves here between using "return" and a ternary
  // eslint-disable-next-line no-confusing-arrow
  const sortedBids = bids.slice().sort(x => x.is_priority ? -1 : 1);
  // Then we check if the first object of the array is priority. We need this to define
  // whether or not to pass priorityExists.
  const doesPriorityExist = sortedBids.length && sortedBids[0] && sortedBids[0].is_priority;
  return (
    <div className="usa-grid-full">
      {
        sortedBids.map(bid => (
          <BidTrackerCardContainer
            key={bid.id}
            bid={bid}
            acceptBid={acceptBid}
            declineBid={declineBid}
            submitBid={submitBid}
            deleteBid={deleteBid}
            userProfile={userProfile}
            priorityExists={doesPriorityExist}
          />
        ))
      }
    </div>
  );
};

BidTrackerCardList.propTypes = {
  bids: BID_RESULTS.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

export default BidTrackerCardList;
