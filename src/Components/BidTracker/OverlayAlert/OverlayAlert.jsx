import React from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { APPROVED_PROP, CLOSED_PROP, HAND_SHAKE_OFFERED_PROP, DRAFT_PROP, HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_DECLINED_PROP, IN_PANEL_PROP, DECLINED_PROP, PANEL_RESCHEDULED_PROP,
  HAND_SHAKE_NEEDS_REGISTER_PROP } from 'Constants/BidData';
import ApprovedAlert from './ApprovedAlert';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import InPanelAlert from './InPanelAlert';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';
import DeclinedAlert from './DeclinedAlert';
import ClosedAlert from './ClosedAlert';
import PanelRescheduledAlert from './PanelRescheduledAlert';
import HandshakeRegisterAlert from './HandshakeRegisterAlert';
import DraftAlert from './DraftAlert';
import { getBidIdUrl } from './helpers';

// Alert rendering based on status is handled here.
// eslint-disable-next-line complexity
const OverlayAlert = ({ bid, acceptBid, declineBid, submitBid, userId, registerHandshake,
  unregisterHandshake, useCDOView },
{ condensedView, readOnly }) => {
  const CLASS_PENDING = 'bid-tracker-overlay-alert--pending';
  const CLASS_SUCCESS = 'bid-tracker-overlay-alert--success';
  const CLASS_CLOSED = 'bid-tracker-overlay-alert--closed';
  const CLASS_DRAFT = 'bid-tracker-overlay-alert--draft';
  const CLASS_REGISTER = 'bid-tracker-overlay-alert--register';
  const CLASS_UNREGISTER = 'bid-tracker-overlay-alert--unregister';

  const { position } = bid;
  const BID_TITLE = `${position.title}${position.position_number ? ` (${position.position_number})` : ''}`;

  const bidIdUrl = getBidIdUrl(bid.id, readOnly, userId);

  let overlayClass = '';
  let overlayContent = '';

  const setInPanelPending = () => {
    if (!condensedView) {
      overlayClass = CLASS_PENDING;
      overlayContent =
        <InPanelAlert title={BID_TITLE} date={bid.in_panel_date} />;
    }
  };

  const setApproved = () => {
    if (!condensedView) {
      overlayClass = CLASS_SUCCESS;
      overlayContent = <ApprovedAlert />;
    }
  };

  switch (bid.status) {
    case HAND_SHAKE_NEEDS_REGISTER_PROP:
      overlayClass = CLASS_REGISTER;
      overlayContent = (
        <HandshakeRegisterAlert
          registerHandshake={registerHandshake}
          unregisterHandshake={unregisterHandshake}
          bid={bid}
        />);
      break;
    case APPROVED_PROP:
      setApproved();
      break;
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = CLASS_PENDING;
      overlayContent = (
        <HandshakeOfferedAlert
          id={bid.id}
          userName={bid.user}
          acceptBid={acceptBid}
          declineBid={declineBid}
          bidIdUrl={bidIdUrl}
        />
      );
      break;
    case HAND_SHAKE_ACCEPTED_PROP:
      if (useCDOView) {
        overlayClass = [CLASS_REGISTER, CLASS_UNREGISTER].join(' ');
        overlayContent = (
          <HandshakeRegisterAlert
            registerHandshake={registerHandshake}
            unregisterHandshake={unregisterHandshake}
            bid={bid}
            isUnregister
          />);
      }
      break;
    case IN_PANEL_PROP:
      setInPanelPending();
      break;
    case HAND_SHAKE_DECLINED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = (
        <HandshakeDeclinedAlert
          userName={bid.user}
          bureau={position.bureau}
          bidIdUrl={bidIdUrl}
        />
      );
      break;
    case DECLINED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = <DeclinedAlert bureau={position.bureau} id={bid.id} bidIdUrl={bidIdUrl} />;
      break;
    case CLOSED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent =
        (<ClosedAlert
          title={BID_TITLE}
          date={bid.closed_date}
          bidIdUrl={bidIdUrl}
        />);
      break;
    case PANEL_RESCHEDULED_PROP:
      overlayClass = CLASS_PENDING;
      overlayContent = <PanelRescheduledAlert date={bid.scheduled_panel_date} />;
      break;
    case DRAFT_PROP:
      overlayClass = CLASS_DRAFT;
      overlayContent = (
        <DraftAlert
          bid={bid}
          submitBid={submitBid}
        />);
      break;
    default:
      break;
  }
  return (
    overlayContent ?
      <div className={`bid-tracker-overlay-alert ${overlayClass}`}>
        <div className="bid-tracker-overlay-alert-content-container">
          <div className="bid-tracker-overlay-alert-content">
            {overlayContent}
          </div>
        </div>
      </div> : null
  );
};

OverlayAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
  useCDOView: PropTypes.bool,
};

OverlayAlert.defaultProps = {
  userId: '',
  useCDOView: false,
};

OverlayAlert.contextTypes = {
  condensedView: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default OverlayAlert;
