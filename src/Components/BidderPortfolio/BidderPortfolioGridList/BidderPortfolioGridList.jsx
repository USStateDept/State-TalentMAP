import React from 'react';
import PropTypes from 'prop-types';
import { BIDDER_RESULTS } from '../../../Constants/PropTypes';
import BidderPortfolioStatRow from '../BidderPortfolioStatRow';

const BidderPortfolioGridList = ({ results, showEdit }) => (
  <ul className="usa-grid-full user-dashboard portfolio-row-list">
    {
      results.map(result => (
        <li
          className="portfolio-row"
          key={result.id}
        >
          <BidderPortfolioStatRow
            userProfile={result}
            showEdit={showEdit}
          />
        </li>
      ))
    }
  </ul>
);

BidderPortfolioGridList.propTypes = {
  results: BIDDER_RESULTS.isRequired,
  showEdit: PropTypes.bool,
};

BidderPortfolioGridList.defaultProps = {
  showEdit: false,
};

export default BidderPortfolioGridList;
