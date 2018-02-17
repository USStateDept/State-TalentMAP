import React from 'react';
import NavigationItem from '../../../../BidderPortfolio/TopNav/Navigation/NavigationItem';

const NavigationList = () => (
  <div className="usa-grid-full">
    <NavigationItem
      title="All Items"
      link="?type=all"
    />
    <NavigationItem
      title="New Items"
      link="?type=new"
    />
    <NavigationItem
      title="Pending Approval"
      link="?type=pending"
    />
    <NavigationItem
      title="Lorem"
      link="?type=lorem"
    />
  </div>
);

export default NavigationList;
