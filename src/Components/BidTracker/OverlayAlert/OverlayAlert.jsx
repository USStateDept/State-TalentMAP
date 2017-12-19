import React from 'react';
import PropTypes from 'prop-types';
import { BID_TRACKER_ALERT_TYPES } from '../../../Constants/PropTypes';
import { APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP } from '../../../Constants/BidData';
import ApprovedAlert from './ApprovedAlert';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import InPanelAlert from './InPanelAlert';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';
import DeclinedAlert from './DeclinedAlert';
import ClosedAlert from './ClosedAlert';

const OverlayAlert = ({ id, type, userName, bureau, acceptBid, declineBid }) => {
  let overlayClass = '';
  let overlayContent = '';
  switch (type) {
    case APPROVED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--success';
      overlayContent = <ApprovedAlert userName={userName} />;
      break;
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent = (
        <HandshakeOfferedAlert
          id={id}
          userName={userName}
          acceptBid={acceptBid}
          declineBid={declineBid}
        />
      );
      break;
    case IN_PANEL_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent = <InPanelAlert userName={userName} bureau={bureau} />;
      break;
    case HAND_SHAKE_DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <HandshakeDeclinedAlert userName={userName} bureau={bureau} />;
      break;
    case DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <DeclinedAlert bureau={bureau} />;
      break;
    case CLOSED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <ClosedAlert />;
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
  id: PropTypes.number.isRequired,
  type: BID_TRACKER_ALERT_TYPES.isRequired,
  userName: PropTypes.string,
  bureau: PropTypes.string,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
};

OverlayAlert.defaultProps = {
  userName: '',
  bureau: '',
};

export default OverlayAlert;
