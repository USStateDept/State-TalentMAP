import React from 'react';
import PropTypes from 'prop-types';

const ClosedAlert = ({ title, date }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--closed">
    <div className="top-text">
      {title} has been filled
    </div>
    <div className="date-text">
      {date}
    </div>
  </div>
);

ClosedAlert.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ClosedAlert;
