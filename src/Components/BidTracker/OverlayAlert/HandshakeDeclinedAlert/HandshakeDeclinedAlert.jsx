import React from 'react';
import PropTypes from 'prop-types';

const HandshakeDeclinedAlert = ({ userName, bureau }) => (
  <div
    className="bid-tracker-alert-container bid-tracker-alert-container--handshake-declined"
  >
    <div className="top-text">
      {`${userName}, you've declined ${bureau}'s handshake`}
    </div>
  </div>
);

HandshakeDeclinedAlert.propTypes = {
  userName: PropTypes.string.isRequired,
  bureau: PropTypes.string.isRequired,
};

export default HandshakeDeclinedAlert;
