import React from 'react';
import PropTypes from 'prop-types';
import BidListResultsCard from '../BidListResultsCard';
// import * as PROP_TYPES from '../../Constants/PropTypes';

const BidListResultsList = ({ bidList, toggleBidPosition }) => (
  <div className="usa-grid-full">
    {
      bidList.results.slice().map(bid => (
        <BidListResultsCard
          bid={bid}
          toggleBidPosition={toggleBidPosition}
          key={bid.id}
        />
      ))
    }
  </div>
  );

BidListResultsList.propTypes = {
  bidList: PropTypes.shape({}).isRequired,
  toggleBidPosition: PropTypes.func.isRequired,
};

export default BidListResultsList;
