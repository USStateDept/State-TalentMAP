import {
  DRAFT_PROP,
  SUBMITTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  IN_PANEL_PROP,
  APPROVED_PROP,
} from '../../../Constants/BidData';

const BID_STEPS = [
  { className: 'step-draft', prop: DRAFT_PROP },
  { className: 'step-submitted', prop: SUBMITTED_PROP },
  { className: 'step-handshake-offered', prop: HAND_SHAKE_OFFERED_PROP },
  { className: 'step-handshake-accepted', prop: HAND_SHAKE_ACCEPTED_PROP },
  { className: 'step-in-panel', prop: IN_PANEL_PROP },
  { className: 'step-approval', prop: APPROVED_PROP },
];

export default BID_STEPS;
