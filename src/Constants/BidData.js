// prop names from the API
export const APPROVED_PROP = 'approved';
export const CLOSED_PROP = 'closed';
export const DRAFT_PROP = 'draft';
export const DECLINED_PROP = 'declined';
export const HAND_SHAKE_ACCEPTED_PROP = 'handshake_accepted';
export const HAND_SHAKE_OFFERED_PROP = 'handshake_offered';
export const HAND_SHAKE_DECLINED_PROP = 'handshake_declined';
export const PRE_PANEL_PROP = 'pre_panel';
export const IN_PANEL_PROP = 'in_panel';
export const SUBMITTED_PROP = 'submitted';
export const PANEL_RESCHEDULED_PROP = 'panel_rescheduled';

// Numbers on the Bid Tracker for given statuses
export const DRAFT_NUMBER = 1;
export const SUBMITTED_NUMBER = 2;
export const HAND_SHAKE_OFFERED_NUMBER = 3;
export const HAND_SHAKE_ACCEPTED_NUMBER = 4;
export const IN_PANEL_NUMBER = 5;
export const APPROVED_NUMBER = 6;

// We make all of them functions so that we don't have to guess whether to call a function or not
export const GET_DRAFT_TITLE = () => ['Draft'];
export const GET_SUBMIT_BID_ACTION_TITLE = () => ['Submit Bid'];
export const GET_SUBMIT_BID_COMPLETE_TITLE = () => ['Bid Submitted'];
export const GET_HAND_SHAKE_EVALUATE_TITLE = () => ['Evaluate Bid'];
export const GET_HAND_SHAKE_EVALUATING_TITLE = () => ['Bid being evaluated'];
export const GET_HAND_SHAKE_OFFERED_TITLE = () => ['Handshake Offered'];
export const GET_HAND_SHAKE_ACCEPTED_TITLE = () => ['Handshake Accepted'];
export const GET_PANEL_TITLE = () => ['Panel'];
export const GET_APPROVAL_TITLE = () => ['Approval'];
