import React from 'react';
import { BIDDER_PORTFOLIO_COUNTS } from '../../../../../Constants/PropTypes';
import NavigationItem from '../NavigationItem';

const NavigationList = ({ counts }) => (
  <div className="usa-grid-full">
    <NavigationItem
      title="All Clients"
      numerator={counts.all_clients}
      denominator={counts.all_clients}
      link="?type=all"
    />
    <NavigationItem
      title="Clients Bidding"
      numerator={counts.bidding_clients}
      denominator={counts.all_clients}
      link="?type=bidding"
    />
    <NavigationItem
      title="Clients in Panel"
      numerator={counts.in_panel_clients}
      denominator={counts.all_clients}
      link="?type=inpanel"
    />
    <NavigationItem
      title="Clients in Post"
      numerator={counts.on_post_clients}
      denominator={counts.all_clients}
      link="?type=onpost"
    />
    <NavigationItem
      title="Handshake Needed"
      numerator={counts.bidding_no_handshake}
      denominator={counts.all_clients}
      link="?type=handshakeneeded"
    />
  </div>
);

NavigationList.propTypes = {
  counts: BIDDER_PORTFOLIO_COUNTS.isRequired,
};

export default NavigationList;
