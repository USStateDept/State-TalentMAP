import React from 'react';
import PropTypes from 'prop-types';
import { BID_RESULTS, USER_PROFILE } from '../../../Constants/PropTypes';
import BidTrackerCardContainer from '../BidTrackerCardContainer';

const BidTrackerCardList = ({ bids, acceptBid, declineBid, userProfile }) => (
  <div className="usa-grid-full">
    {
      bids.map(bid => (
        <BidTrackerCardContainer
          key={bid.id}
          bid={bid}
          acceptBid={acceptBid}
          declineBid={declineBid}
          userProfile={userProfile}
        />
      ))
    }
  </div>
);

BidTrackerCardList.propTypes = {
  bids: BID_RESULTS.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

export default BidTrackerCardList;
