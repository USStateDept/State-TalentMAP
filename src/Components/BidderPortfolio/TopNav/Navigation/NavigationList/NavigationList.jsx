import React from 'react';
import PropTypes from 'prop-types';
import NavigationItem from '../NavigationItem';

const NavigationList = ({ counts }) => (
  <div className="usa-grid-full">
    <NavigationItem
      title="All Clients"
      numerator={counts.all}
      denominator={counts.all}
      link="?type=all"
    />
    <NavigationItem
      title="Clients Bidding"
      numerator={counts.bidding}
      denominator={counts.all}
      link="?type=bidding"
    />
    <NavigationItem
      title="Clients in Panel"
      numerator={counts.inpanel}
      denominator={counts.all}
      link="?type=inpanel"
    />
    <NavigationItem
      title="Clients in Post"
      numerator={counts.inpost}
      denominator={counts.all}
      link="?type=inpost"
    />
  </div>
);

NavigationList.propTypes = {
  counts: PropTypes.shape({}).isRequired,
};

export default NavigationList;
