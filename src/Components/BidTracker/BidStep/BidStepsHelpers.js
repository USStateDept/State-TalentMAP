import {
  DRAFT_PROP,
  SUBMITTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  IN_PANEL_PROP,
  APPROVED_PROP,
} from '../../../Constants/BidData';

const BID_STEPS = [
  { className: 'step-draft', title: 'Draft', prop: DRAFT_PROP },
  { className: 'step-submitted', title: 'Submitted', prop: SUBMITTED_PROP },
  { className: 'step-handshake-offered', title: 'Handshake Offered', prop: HAND_SHAKE_OFFERED_PROP },
  { className: 'step-handshake-accepted', title: 'Handshake Accepted', prop: HAND_SHAKE_ACCEPTED_PROP },
  { className: 'step-in-panel', title: 'In Panel', prop: IN_PANEL_PROP },
  { className: 'step-approval', title: 'Approved', prop: APPROVED_PROP },
];

export default BID_STEPS;
