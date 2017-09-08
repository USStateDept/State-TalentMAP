import React from 'react';
import FontAwesome from 'react-fontawesome';

const BidListButton = () => (
  <button className="bid-list-button">
    <span className="bid-list-button-icon">
      <FontAwesome name="plus-circle" />
    </span>
    <span>Add to bid list</span>
  </button>
);

export default BidListButton;
