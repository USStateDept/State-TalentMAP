import React from 'react';
import PropTypes from 'prop-types';

const ApprovedAlert = ({ userName }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--approved">
    <div className="top-text">
      {`${userName}, you've been `}<strong>approved</strong> for this position!
      </div>
    <div>
      <button className="tm-button-transparent">Prepare for Next Steps</button>
    </div>
    <div className="sub-text">
      This link will take you to PCS Travel
    </div>
  </div>
);

ApprovedAlert.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default ApprovedAlert;
