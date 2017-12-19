import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const InPanelAlert = ({ userName, bureau }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--in-panel">
    <div className="top-text">
      <div>
        <FontAwesome name="users" />
      </div>
      <div>
        {`${userName}, you are in panel for your bid for ${bureau}`}
      </div>
    </div>
  </div>
  );

InPanelAlert.propTypes = {
  userName: PropTypes.string.isRequired,
  bureau: PropTypes.string.isRequired,
};

export default InPanelAlert;
