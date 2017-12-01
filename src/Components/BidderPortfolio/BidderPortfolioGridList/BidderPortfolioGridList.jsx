import React from 'react';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioGridItem from '../BidderPortfolioGridItem';

const BidderPortfolioGridList = ({ results }) => (
  <ul className="usa-grid-full user-dashboard portfolio-grid-list">
    {
      results.map(result => (
        <li
          className="user-dashboard-section portfolio-grid-list-item"
          key={result.id}
        >
          <BidderPortfolioGridItem
            userProfile={result}
            showEditLink={false}
            showBirthday
            showBids
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
