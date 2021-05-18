import {
  APPROVED_PROP,
  CLOSED_PROP,
  DECLINED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  HAND_SHAKE_NEEDS_REGISTER_PROP,
  HAND_SHAKE_OFFERED_PROP,
  IN_PANEL_PROP,
  PRE_PANEL_PROP,
  SUBMITTED_PROP,
} from './BidData';

// store any bid statuses from the API here
// class_name is used to pass to parent container for conditional css class name
export const APPROVED = { property: APPROVED_PROP, class_name: 'approved', text: 'Approved' };
export const CLOSED = { property: CLOSED_PROP, class_name: 'closed', text: 'Closed' };
export const DRAFT = { property: DRAFT_PROP, class_name: 'draft', text: 'Draft bid' };
export const DECLINED = { property: DECLINED_PROP, class_name: 'declined', text: 'Bid unapproved' };
export const HAND_SHAKE_ACCEPTED = { property: HAND_SHAKE_ACCEPTED_PROP, class_name: 'hand-shake-accepted', text: 'Handshake registered' };
export const HAND_SHAKE_OFFERED = { property: HAND_SHAKE_OFFERED_PROP, class_name: 'hand-shake-offered', text: 'Handshake offered' };
// TODO ensure HAND_SHAKE_DECLINED has accurate data
export const HAND_SHAKE_DECLINED = { property: HAND_SHAKE_DECLINED_PROP, class_name: 'declined', text: 'Handshake declined' };
export const HAND_SHAKE_NEEDS_REGISTER = { property: HAND_SHAKE_NEEDS_REGISTER_PROP, class_name: 'registered', text: 'Handshake registered' };
// TODO ensure PRE-PANEL exists
export const PRE_PANEL = { property: PRE_PANEL_PROP, class_name: 'pre-panel', text: 'Pre panel' };
export const IN_PANEL = { property: IN_PANEL_PROP, class_name: 'in-panel', text: 'In panel' };
export const SUBMITTED = { property: SUBMITTED_PROP, class_name: 'submitted', text: 'Bid submitted' };

const statusArray = [
  APPROVED, CLOSED, DRAFT, DECLINED, HAND_SHAKE_ACCEPTED, PRE_PANEL,
  HAND_SHAKE_OFFERED, IN_PANEL, SUBMITTED, HAND_SHAKE_DECLINED,
];

export const BID_STATUS_ORDER = {
  [DECLINED_PROP]: 1,
  [CLOSED_PROP]: 2,
  [HAND_SHAKE_DECLINED_PROP]: 3,
  [DRAFT_PROP]: 4,
  [SUBMITTED_PROP]: 5,
  [HAND_SHAKE_OFFERED_PROP]: 6,
  [HAND_SHAKE_NEEDS_REGISTER_PROP]: 7,
  [HAND_SHAKE_ACCEPTED_PROP]: 8,
  [PRE_PANEL_PROP]: 9,
  [IN_PANEL_PROP]: 10,
  [APPROVED_PROP]: 11,
};

// find the correct object based on status, then return the class_name
export const getStatusProperty = (statusName, property = 'class_name') => {
  const matchingStatus = statusArray.find(s => s.property === statusName);
  return matchingStatus ? matchingStatus[property] : '';
};
