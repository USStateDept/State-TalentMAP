import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Actions from './Actions';

const TopNav = ({ bidderPortfolioCounts }) => (
  <div className="usa-grid-full portfolio-top-nav-container">
    <div className="usa-width-two-thirds">
      <Navigation counts={bidderPortfolioCounts} />
    </div>
    <div className="usa-width-one-third">
      <Actions />
    </div>
  </div>
);

TopNav.propTypes = {
  bidderPortfolioCounts: PropTypes.shape({}).isRequired,
};

export default TopNav;
