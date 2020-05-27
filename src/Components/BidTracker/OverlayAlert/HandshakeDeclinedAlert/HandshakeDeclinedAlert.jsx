import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../../../LinkButton';

const HandshakeDeclinedAlert = ({ userName, bureau, bidIdUrl }, { condensedView }) => (
  <div
    className="bid-tracker-alert-container bid-tracker-alert-container--handshake-declined"
  >
    <div className="top-text">
      {
        userName && bureau ?
          <span>{`${userName}, you've declined ${bureau}'s handshake`}</span>
          :
          <span>{'You\'ve declined the handshake'}</span>
      }
    </div>
    {
      condensedView &&
      <div className="usa-grid-full">
        <LinkButton toLink={bidIdUrl} className="tm-button-transparent">
          Go to Bid Tracker
        </LinkButton>
      </div>
    }
  </div>
);

HandshakeDeclinedAlert.propTypes = {
  userName: PropTypes.string.isRequired,
  bureau: PropTypes.string.isRequired,
  bidIdUrl: PropTypes.string,
};

HandshakeDeclinedAlert.defaultProps = {
  bidIdUrl: '',
};

HandshakeDeclinedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export default HandshakeDeclinedAlert;
