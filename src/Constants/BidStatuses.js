import {
  APPROVED_PROP,
  CLOSED_PROP,
  DECLINED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  PRE_PANEL_PROP,
  IN_PANEL_PROP,
  SUBMITTED_PROP,
} from './BidData';

// store any bid statuses from the API here
// class_name is used to pass to parent container for conditional css class name
export const APPROVED = { property: APPROVED_PROP, class_name: 'approved', text: 'Approved' };
export const CLOSED = { property: CLOSED_PROP, class_name: 'closed', text: 'Closed' };
export const DRAFT = { property: DRAFT_PROP, class_name: 'draft', text: 'Draft Bid' };
export const DECLINED = { property: DECLINED_PROP, class_name: 'declined', text: 'Bid Unapproved' };
export const HAND_SHAKE_ACCEPTED = { property: HAND_SHAKE_ACCEPTED_PROP, class_name: 'hand-shake-accepted', text: 'Handshake Accepted' };
export const HAND_SHAKE_OFFERED = { property: HAND_SHAKE_OFFERED_PROP, class_name: 'hand-shake-offered', text: 'Handshake Offered' };
// TODO ensure HAND_SHAKE_DECLINED has accurate data
export const HAND_SHAKE_DECLINED = { property: HAND_SHAKE_DECLINED_PROP, class_name: 'declined', text: 'Handshake Declined' };
// TODO ensure PRE-PANEL exists
export const PRE_PANEL = { property: PRE_PANEL_PROP, class_name: 'pre-panel', text: 'Pre Panel' };
export const IN_PANEL = { property: IN_PANEL_PROP, class_name: 'in-panel', text: 'In Panel' };
export const SUBMITTED = { property: SUBMITTED_PROP, class_name: 'submitted', text: 'Bid Submitted' };

const statusArray = [
  APPROVED, CLOSED, DRAFT, DECLINED, HAND_SHAKE_ACCEPTED, PRE_PANEL,
  HAND_SHAKE_OFFERED, IN_PANEL, SUBMITTED, HAND_SHAKE_DECLINED,
];

// find the correct object based on status, then return the class_name
export const getStatusProperty = (statusName, property = 'class_name') => {
  const matchingStatus = statusArray.find(s => s.property === statusName);
  return matchingStatus ? matchingStatus[property] : '';
};
