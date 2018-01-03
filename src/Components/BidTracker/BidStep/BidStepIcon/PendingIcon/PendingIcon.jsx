import React from 'react';
import FontAwesome from 'react-fontawesome';

const PendingIcon = () => (
  <div className="pending-tooltip">
    <div className="bid-tracker-pending-icon-container">
      <FontAwesome name="clock-o" />
    </div>
    <div className="bid-tracker-pending-text-container">
      Pending
    </div>
  </div>
);

export default PendingIcon;
