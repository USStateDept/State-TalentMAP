import React from 'react';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioStatRow from '../BidderPortfolioStatRow';

const BidderPortfolioGridList = ({ results }) => (
  <ul className="usa-grid-full user-dashboard portfolio-row-list">
    {
      results.map(result => (
        <li
          className="portfolio-row"
          key={result.id}
        >
          <BidderPortfolioStatRow
            userProfile={result}
          />
        </li>
      ))
    }
  </ul>
);

BidderPortfolioGridList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
};

export default BidderPortfolioGridList;
