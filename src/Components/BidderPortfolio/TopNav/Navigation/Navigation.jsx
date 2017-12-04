import React from 'react';
import { BIDDER_PORTFOLIO_COUNTS } from '../../../../Constants/PropTypes';
import NavigationList from './NavigationList';

const Navigation = ({ counts }) => (
  <div className="usa-grid-full">
    <NavigationList counts={counts} />
  </div>
);

Navigation.propTypes = {
  counts: BIDDER_PORTFOLIO_COUNTS.isRequired,
};

export default Navigation;
