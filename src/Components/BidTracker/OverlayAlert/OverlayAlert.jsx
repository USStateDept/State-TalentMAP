import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_BUREAU } from 'Constants/SystemMessages';
import { useEffect, useState } from 'react';
import InteractiveElement from 'Components/InteractiveElement';
import FontAwesome from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { get, includes } from 'lodash';
import { CLOSED_PROP, DECLINED_PROP, DRAFT_PROP, HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_DECLINED_PROP, HAND_SHAKE_NEEDS_REGISTER_PROP, HAND_SHAKE_OFFERED_PROP, IN_PANEL_PROP,
  PANEL_RESCHEDULED_PROP } from 'Constants/BidData';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import InPanelAlert from './InPanelAlert';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';
import DeclinedAlert from './DeclinedAlert';
import ClosedAlert from './ClosedAlert';
import PanelRescheduledAlert from './PanelRescheduledAlert';
import HandshakeRegisterAlert from './HandshakeRegisterAlert';
import DraftAlert from './DraftAlert';
import HandshakeRegisterWithAnotherBidderAlert from './HandshakeRegisterWithAnotherBidderAlert';
import { getBidIdUrl } from './helpers';
import { showHandshakeRegsiterWithAnotherBidderOverlay } from '../BidHelpers';

// Alert rendering based on status is handled here.
const OverlayAlert = ({ bid, submitBid, userId, registerHandshake,
  unregisterHandshake, useCDOView, isCollapsible, userName, togglePanelAlert },
{ condensedView, readOnly }) => {
  const CLASS_PENDING = 'bid-tracker-overlay-alert--pending';
  const CLASS_CLOSED = 'bid-tracker-overlay-alert--closed';
  const CLASS_DRAFT = 'bid-tracker-overlay-alert--draft';
  const CLASS_REGISTER = 'bid-tracker-overlay-alert--register';
  const CLASS_UNREGISTER = 'bid-tracker-overlay-alert--unregister';

  const position = get(bid, 'position_info.position') || {};
  const BID_TITLE = position.title ? `${position.title}${position.position_number ? ` (${position.position_number})` : ''}` : 'N/A';
  const bureau = get(position, 'bureau') || NO_BUREAU;

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

  const [collapseOverlay, setCollapseOverlay] = useState(false);

  function toggleOverlay() {
    togglePanelAlert(!collapseOverlay);
    setCollapseOverlay(!collapseOverlay);
  }

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
    case HAND_SHAKE_OFFERED_PROP:
      overlayClass = CLASS_PENDING;
      overlayContent = (
        <HandshakeOfferedAlert
          id={bid.id}
          userName={userName}
          bid={bid}
          bidIdUrl={bidIdUrl}
          cdoView={useCDOView}
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
          bureau={bureau}
          bidIdUrl={bidIdUrl}
        />
      );
      break;
    case DECLINED_PROP:
      overlayClass = CLASS_CLOSED;
      overlayContent = <DeclinedAlert bureau={bureau} id={bid.id} bidIdUrl={bidIdUrl} />;
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

  // set tooltip to false on mount only
  useEffect(() => {
    togglePanelAlert(!overlayContent);
  }, []);

  let showArrow = true;
  if (get(bid, 'position_info.bid_statistics[0].has_handshake_offered') &&
    showHandshakeRegsiterWithAnotherBidderOverlay(bid)) {
    showArrow = false;
    overlayClass = CLASS_CLOSED;
    overlayContent = (
      <HandshakeRegisterWithAnotherBidderAlert
        condensedView={condensedView}
        bid={bid}
      />);
  }

  const isCollapsible$ =
    isCollapsible && includes([HAND_SHAKE_NEEDS_REGISTER_PROP, HAND_SHAKE_ACCEPTED_PROP], get(bid, 'status')) && showArrow;
  const rotate = collapseOverlay ? 'rotate(180deg)' : 'rotate(0)';

  return (
    overlayContent ?
      <div className={`bid-tracker-overlay-alert ${overlayClass}${collapseOverlay ? ' collapse-overlay' : ''}`}>
        {isCollapsible$ &&
          <InteractiveElement onClick={toggleOverlay}>
            <Tooltip
              title={collapseOverlay ? 'Expand overlay' : 'Collapse overlay'}
              arrow
            >
              <FontAwesome
                style={{ transform: rotate, transition: 'all 0.65s linear' }}
                name="arrow-circle-right"
              />
            </Tooltip>
          </InteractiveElement>
        }
        <div className={`${bid.status !== HAND_SHAKE_OFFERED_PROP ? 'bid-tracker-overlay-alert-content-container' : ''}`}>
          <div className={`${bid.status !== HAND_SHAKE_OFFERED_PROP ? 'bid-tracker-overlay-alert-content' : ''}`}>
            {overlayContent}
          </div>
        </div>
      </div> : null
  );
};

OverlayAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  submitBid: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
  useCDOView: PropTypes.bool,
  userName: PropTypes.string,
  isCollapsible: PropTypes.bool,
  togglePanelAlert: PropTypes.func.isRequired,
};

OverlayAlert.defaultProps = {
  userId: '',
  useCDOView: false,
  userName: '',
  isCollapsible: false,
};

OverlayAlert.contextTypes = {
  condensedView: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default OverlayAlert;
