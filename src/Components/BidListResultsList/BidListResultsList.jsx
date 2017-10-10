import React from 'react';
import PropTypes from 'prop-types';
import BidListResultsCard from '../BidListResultsCard';
import * as PROP_TYPES from '../../Constants/PropTypes';

const BidListResultsList = ({ bidList, toggleBidPosition, submitBid }) => (
  <div className="usa-grid-full">
    {
      bidList.results.slice().map(bid => (
        <BidListResultsCard
          bid={bid}
          toggleBidPosition={toggleBidPosition}
          key={bid.id}
          submitBid={submitBid}
        />
      ))
    }
  </div>
  );

BidListResultsList.propTypes = {
  bidList: PROP_TYPES.BID_LIST.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
};

export default BidListResultsList;
