import React from 'react';
import FontAwesome from 'react-fontawesome';

// This is static for now, until we decide how to display the actions link
const ActionsLink = () => (
  <div className="actions-link-container">
    <div className="actions-link-text">
      Actions
    </div>
    <div className="actions-link-icon">
      <FontAwesome name="ellipsis-v" />
    </div>
  </div>
);

export default ActionsLink;
