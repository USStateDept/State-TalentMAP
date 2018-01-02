import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const InPanelAlert = ({ title, date }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--in-panel">
    <div className="top-text">
      <div>
        <FontAwesome name="users" />
      </div>
      <div>
        {`You are in panel for ${title}`}
      </div>
      <div className="date-text">
        {date}
      </div>
    </div>
  </div>
  );

InPanelAlert.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default InPanelAlert;
