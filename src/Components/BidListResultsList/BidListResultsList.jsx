import React from 'react';
import PropTypes from 'prop-types';
import BidListResultsCard from '../BidListResultsCard';
import { BID_LIST } from '../../Constants/PropTypes';

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
  bidList: BID_LIST.isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
};

export default BidListResultsList;
