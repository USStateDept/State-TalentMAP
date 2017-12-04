import React from 'react';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioCard from '../BidderPortfolioCard';

const BidderPortfolioCardList = ({ results }) => (
  <div className="usa-grid-full user-dashboard">
    {
      results.map(result => (
        <div className="usa-width-one-fourth user-dashboard-section" key={result.id}>
          <BidderPortfolioCard
            userProfile={result}
            showEditLink={false}
            showBirthday
            showBids
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
