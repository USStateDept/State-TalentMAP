import React from 'react';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import BidTrackerCard from '../BidTrackerCard';

const BidTrackerCardList = ({ bids }) => (
  <div>
    {
      bids.map(bid => (
        <BidTrackerCard key={bid.id} bid={bid} />
      ))
    }
  </div>
);

BidTrackerCardList.propTypes = {
  bids: BID_RESULTS.isRequired,
};

export default BidTrackerCardList;
