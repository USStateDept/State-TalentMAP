import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const PanelRescheduledAlert = ({ date }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--in-panel">
    <div className="top-text">
      <div>
        <FontAwesome name="users" />
      </div>
      <div>
        {`You've been rescheduled for the next panel on ${date}`}
      </div>
      <div className="date-text">
        {date}
      </div>
    </div>
  </div>
);

PanelRescheduledAlert.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PanelRescheduledAlert;
