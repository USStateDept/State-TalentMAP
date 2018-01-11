import React from 'react';
import PropTypes from 'prop-types';

const DeclinedAlert = ({ bureau }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--declined">
    <div className="top-text">
      {bureau} has <strong>declined</strong> the bid
    </div>
  </div>
);

DeclinedAlert.propTypes = {
  bureau: PropTypes.string.isRequired,
};

export default DeclinedAlert;
