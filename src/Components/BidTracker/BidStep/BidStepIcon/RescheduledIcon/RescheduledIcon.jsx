import React from 'react';
import FontAwesome from 'react-fontawesome';

const PendingIcon = () => (
  <div className="rescheduled-tooltip">
    <div className="bid-tracker-rescheduled-icon-container">
      <FontAwesome name="calendar" />
    </div>
    <div className="bid-tracker-rescheduled-text-container">
      Rescheduled
    </div>
  </div>
);

export default PendingIcon;
