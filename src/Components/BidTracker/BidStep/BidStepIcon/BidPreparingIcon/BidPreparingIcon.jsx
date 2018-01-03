import React from 'react';
import FontAwesome from 'react-fontawesome';

const BidPreparingIcon = () => (
  <div className="preparing-tooltip-container">
    <div className="step-tooltip preparing-tooltip">
      <div className="bid-tracker-preparing-icon-container">
        <FontAwesome name="clipboard" />
      </div>
      <div className="bid-tracker-preparing-text-container">
        Your bid is preparing for panel
      </div>
    </div>
  </div>
);

export default BidPreparingIcon;
