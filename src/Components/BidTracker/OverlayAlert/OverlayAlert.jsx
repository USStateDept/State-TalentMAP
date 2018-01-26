import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from '../../../Constants/PropTypes';
import { APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP, DRAFT_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP, PANEL_RESCHEDULED_PROP } from '../../../Constants/BidData';
import ApprovedAlert from './ApprovedAlert';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import InPanelAlert from './InPanelAlert';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';
import DeclinedAlert from './DeclinedAlert';
import ClosedAlert from './ClosedAlert';
import PanelRescheduledAlert from './PanelRescheduledAlert';
import DraftAlert from './DraftAlert';

// Alert rendering based on status is handled here.
const OverlayAlert = ({ bid, acceptBid, declineBid, submitBid, deleteBid }) => {
  const CLASS_PENDING = 'bid-tracker-overlay-alert--pending';
  const CLASS_SUCCESS = 'bid-tracker-overlay-alert--success';
  const CLASS_CLOSED = 'bid-tracker-overlay-alert--closed';
  const CLASS_DRAFT = 'bid-tracker-overlay-alert--draft';

  const BID_TITLE = `${bid.position.title} (${bid.position.position_number})`;

  let overlayClass = '';
  let overlayContent = '';
  switch (bid.status) {
    case APPROVED_PROP:
      overlayClass = CLASS_SUCCESS;
      overlayContent = <ApprovedAlert userName={bid.user} />;
      break;
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = CLASS_PENDING;
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
      overlayClass = CLASS_PENDING;
      overlayContent =
        <InPanelAlert title={BID_TITLE} date={bid.in_panel_date} />;
      break;
    case HAND_SHAKE_DECLINED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = <HandshakeDeclinedAlert userName={bid.user} bureau={bid.position.bureau} />;
      break;
    case DECLINED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = <DeclinedAlert bureau={bid.position.bureau} />;
      break;
    case CLOSED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = <ClosedAlert title={BID_TITLE} date={bid.closed_date} />;
      break;
    case PANEL_RESCHEDULED_PROP:
      overlayClass = CLASS_PENDING;
      overlayContent = <PanelRescheduledAlert date={bid.scheduled_panel_date} />;
      break;
    case DRAFT_PROP:
      overlayClass = CLASS_DRAFT;
      overlayContent = (
        <DraftAlert
          id={bid.id}
          bid={bid}
          submitBid={submitBid}
          deleteBid={deleteBid}
        />);
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
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
};

export default OverlayAlert;
