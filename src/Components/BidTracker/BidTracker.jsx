import React from 'react';
import PropTypes from 'prop-types';
import BidTrackerCardList from './BidTrackerCardList';
import Spinner from '../Spinner';

const BidTracker = ({ bidList, bidListIsLoading }) => (
  <div className="bid-tracker-page" style={{ position: 'relative', padding: '20px' }}>
    <div className="hello-greeting">
      Bid Tracker
    </div>
    {
      bidListIsLoading ?
        <Spinner type="homepage-position-results" size="big" /> :
        <BidTrackerCardList bids={bidList.results} />
    }
  </div>
  );

BidTracker.propTypes = {
  bidList: PropTypes.arrayOf().isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
};

export default BidTracker;
