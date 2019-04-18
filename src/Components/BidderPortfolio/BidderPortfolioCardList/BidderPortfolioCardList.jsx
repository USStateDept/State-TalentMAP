import React from 'react';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioStatCard from '../BidderPortfolioStatCard';

const BidderPortfolioCardList = ({ results }) => (
  <div className="usa-grid-full user-dashboard bidder-portfolio-stat-card-list">
    {
      results.map(result => (
        <div className="bidder-portfolio-stat-card-container" key={result.id}>
          <BidderPortfolioStatCard
            userProfile={result}
          />
        </div>
      ))
    }
  </div>
);

BidderPortfolioCardList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
};

export default BidderPortfolioCardList;
