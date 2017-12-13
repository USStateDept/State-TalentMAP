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

export const DRAFT_NUMBER = 1;
export const SUBMITTED_NUMBER = 2;
export const HAND_SHAKE_OFFERED_NUMBER = 3;
export const HAND_SHAKE_ACCEPTED_NUMBER = 4;
export const IN_PANEL_NUMBER = 5;
export const APPROVED_NUMBER = 6;

// We make all of them functions so that we don't have to guess whethe to call a function or not
export const DRAFT_TITLE = () => ['Draft'];
export const SUBMIT_BID_ACTION_TITLE = () => ['Submit Bid'];
export const SUBMIT_BID_COMPLETE_TITLE = (bid = {}) => ['Bid Submitted', bid.submission_date];
export const HAND_SHAKE_EVALUATE_TITLE = () => ['Evaluate Bid'];
export const HAND_SHAKE_EVALUATING_TITLE = () => ['Bid being evaluated'];
export const HAND_SHAKE_OFFERED_TITLE = (bid = {}) => ['Handshake Offered', bid.hand_shake_offered_date];
export const HAND_SHAKE_ACCEPTED_TITLE = (bid = {}) => ['Handshake Accepted', bid.hand_shake_accepted_date];
export const PANEL_TITLE = (bid = {}) => ['Panel',
  `${bid.scheduled_panel_date ? `Scheduled: ${bid.scheduled_panel_date}` : ''}`,
  `${bid.panel_date ? `Panel date: ${bid.panel_date}` : ''}`];
export const APPROVAL_TITLE = () => ['Approval'];
