import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { BID_TRACKER_ALERT_TYPES } from '../../../Constants/PropTypes';
import { APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP } from '../../../Constants/BidData';

const OverlayAlert = ({ type, userName, bureau }) => {
  let overlayClass = '';
  let overlayContent = '';
  switch (type) {
    case APPROVED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--success';
      overlayContent = (
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
      break;
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent = (
        <div className="bid-tracker-alert-container bid-tracker-alert-container--handshake-offered">
          <div className="top-text">{`${userName}, you've been offered a handshake`}</div>
          <div>
            <button className="tm-button-transparent">
              <FontAwesome name="check-o" /> Accept Handshake
            </button>
            <Link to="/profile/bidlist">Decline Handshake</Link>
          </div>
          <div className="sub-text">24 hours to accept the handshake</div>
        </div>
      );
      break;
    case IN_PANEL_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent = (
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
      break;
    case HAND_SHAKE_DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = (
        <div
          className="bid-tracker-alert-container bid-tracker-alert-container--handshake-declined"
        >
          <div className="top-text">
            {`${userName}, you've declined ${bureau}'s handshake`}
          </div>
        </div>
      );
      break;
    case DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = (
        <div className="bid-tracker-alert-container bid-tracker-alert-container--declined">
          <div className="top-text">
            {bureau} has <strong>declined</strong> the bid
          </div>
        </div>
      );
      break;
    case CLOSED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = (
        <div className="bid-tracker-alert-container bid-tracker-alert-container--closed">
          <div className="top-text">
            This bid has been closed
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <div className={`bid-tracker-overlay-alert ${overlayClass}`}>
      <div className="bid-tracker-overlay-alert-content-container">
        <div className="bid-tracker-overlay-alert-content">
          {overlayContent}
        </div>
      </div>
    </div>
  );
};

OverlayAlert.propTypes = {
  type: BID_TRACKER_ALERT_TYPES.isRequired,
  userName: PropTypes.string,
  bureau: PropTypes.string,
};

OverlayAlert.defaultProps = {
  userName: '',
  bureau: '',
};

export default OverlayAlert;
