import React from 'react';
import { BIDDER_PORTFOLIO_COUNTS } from '../../../Constants/PropTypes';
import Navigation from './Navigation';
import Actions from './Actions';

const TopNav = ({ bidderPortfolioCounts }) => (
  <div className="usa-grid-full portfolio-top-nav-container">
    <div className="usa-width-five-sixths">
      <Navigation counts={bidderPortfolioCounts} />
    </div>
    <div className="usa-width-one-sixth">
      <Actions />
    </div>
  </div>
);

TopNav.propTypes = {
  bidderPortfolioCounts: BIDDER_PORTFOLIO_COUNTS.isRequired,
};

export default TopNav;
