import React from 'react';
import FontAwesome from 'react-fontawesome';

// TODO - will this be a link or an action?
const BidListButton = () => (
  <button className="white-button">
    <span className="white-button-icon">
      <FontAwesome name="plus-circle" />
    </span>
    <span>Add to bid list</span>
  </button>
);

export default BidListButton;
