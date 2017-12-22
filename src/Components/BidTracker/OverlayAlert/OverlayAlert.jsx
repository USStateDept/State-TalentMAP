import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import { APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP } from '../../../Constants/BidData';
import ApprovedAlert from './ApprovedAlert';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import InPanelAlert from './InPanelAlert';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';
import DeclinedAlert from './DeclinedAlert';
import ClosedAlert from './ClosedAlert';

const OverlayAlert = ({ bid, acceptBid, declineBid }) => {
  let overlayClass = '';
  let overlayContent = '';
  switch (bid.status) {
    case APPROVED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--success';
      overlayContent = <ApprovedAlert userName={bid.user} />;
      break;
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent = (
        <HandshakeOfferedAlert
          id={bid.id}
          userName={bid.user}
          acceptBid={acceptBid}
          declineBid={declineBid}
        />
      );
      break;
    case IN_PANEL_PROP:
      overlayClass = 'bid-tracker-overlay-alert--pending';
      overlayContent =
        <InPanelAlert userName={bid.user} bureau={bid.position.bureau} date={bid.in_panel_date} />;
      break;
    case HAND_SHAKE_DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <HandshakeDeclinedAlert userName={bid.user} bureau={bid.position.bureau} />;
      break;
    case DECLINED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <DeclinedAlert bureau={bid.position.bureau} />;
      break;
    case CLOSED_PROP:
      overlayClass = 'bid-tracker-overlay-alert--closed';
      overlayContent = <ClosedAlert title={`${bid.position.title} (${bid.position.position_number})`} date={bid.closed_date} />;
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
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
};

OverlayAlert.defaultProps = {
  userName: '',
  bureau: '',
};

export default OverlayAlert;
