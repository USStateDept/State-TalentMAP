import React from 'react';
import PropTypes from 'prop-types';
import BidTrackerCard from '../BidTrackerCard';

const BidTrackerCardList = ({ bids }) => (
  <div>
    {
      bids.map(bid => (
        <BidTrackerCard bid={bid} />
      ))
    }
  </div>
);

BidTrackerCardList.propTypes = {
  bids: PropTypes.arrayOf().isRequired,
};

export default BidTrackerCardList;
