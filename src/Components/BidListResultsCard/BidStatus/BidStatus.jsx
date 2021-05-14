import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { APPROVED, CLOSED, DECLINED, DRAFT, HAND_SHAKE_ACCEPTED,
  HAND_SHAKE_DECLINED, HAND_SHAKE_OFFERED, IN_PANEL, SUBMITTED } from '../../../Constants/BidStatuses';

const BidStatus = ({ status, positionTitle }) => {
  let icon;
  let text;
  switch (status) {
    case APPROVED.property:
      icon = 'check';
      text = APPROVED.text;
      break;
    case CLOSED.property:
      icon = 'times-circle-o';
      text = CLOSED.text;
      break;
    case DRAFT.property:
      icon = 'bookmark';
      text = DRAFT.text;
      break;
    case DECLINED.property:
      icon = 'times';
      text = DECLINED.text;
      break;
    case HAND_SHAKE_ACCEPTED.property:
      icon = 'handshake-o';
      text = HAND_SHAKE_ACCEPTED.text;
      break;
    case HAND_SHAKE_DECLINED.property:
      icon = 'times';
      text = HAND_SHAKE_DECLINED.text;
      break;
    case HAND_SHAKE_OFFERED.property:
      icon = 'star';
      text = HAND_SHAKE_OFFERED.text;
      break;
    case IN_PANEL.property:
      icon = 'clock-o';
      text = IN_PANEL.text;
      break;
    case SUBMITTED.property:
      icon = 'thumbs-o-up';
      text = SUBMITTED.text;
      break;
    default:
      icon = 'question';
      text = 'Status unknown';
  }
  return (
    <div className="bid-list-card-title-status">
      <FontAwesome name={icon} /> {text} for {positionTitle}
    </div>
  );
};

BidStatus.propTypes = {
  status: PropTypes.string.isRequired,
  positionTitle: PropTypes.string.isRequired,
};


export default BidStatus;
