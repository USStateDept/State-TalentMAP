import React from 'react';
import FontAwesome from 'react-fontawesome';

// Due date is static for now
const BidListHeader = () => (
  <div className="usa-grid-full bid-list-header section-padded-inner-container-narrow">
    <div className="usa-width-two-thirds bid-list-header-text">
      <FontAwesome name="clock-o" /> All bids are due 7.15.18
    </div>
    <div className="usa-width-one-third bid-list-header-button-container">
      <button className="bid-list-header-button">More Info</button>
    </div>
  </div>
);

export default BidListHeader;
