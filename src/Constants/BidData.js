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
export const HAND_SHAKE_NEEDS_REGISTER_PROP = 'handshake_needs_registered';

export const BID_EXPLANATION_TEXT = {
  [SUBMITTED_PROP]: {
    text: "The Bureau is reviewing candidates' qualifications.",
    link: "Learn more about the Bureau's role.",
    term: 'Regional and Functional Bureaus',
  },
  [HAND_SHAKE_ACCEPTED_PROP]: {
    text: 'Handshakes are reviewed and registered by CDOs.',
    link: "Learn more about the CDO's role.",
    term: 'CDO - Career Development Officer',
  },
  [PRE_PANEL_PROP]: {
    text: 'CDOs represent clients at the HR/CDA Assignments Panel.',
    link: "Learn more about the CDO's role.",
    term: 'CDO - Career Development Officer',
  },
  [IN_PANEL_PROP]: {
    text: 'CDOs represent clients at the HR/CDA Assignments Panel.',
    link: "Learn more about the CDO's role.",
    term: 'CDO - Career Development Officer',
  },
  [PANEL_RESCHEDULED_PROP]: {
    text: 'CDOs represent clients at the HR/CDA Assignments Panel.',
    link: "Learn more about the CDO's role.",
    term: 'CDO - Career Development Officer',
  },
  [APPROVED_PROP]: {
    text: 'AOs may be preparing your assignment, or an HR Tech is writing your orders.',
    link: "Learn more about AO and HR Tech's roles.",
    term: 'AO - Assignments Officer',
  },
};

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
export const GET_HAND_SHAKE_EVALUATING_TITLE = () => ['Pending Review'];
export const GET_BID_REVIEW_COMPLETE_TITLE = () => ['Bid Reviewed'];
export const GET_HAND_SHAKE_OFFERED_TITLE = () => ['Handshake Offered'];
export const GET_HAND_SHAKE_ACCEPTED_TITLE = () => ['Handshake Accepted'];
export const GET_HAND_SHAKE_NEEDS_REGISTER_TITLE = () => ['Register Handshake'];
export const GET_HAND_SHAKE_COMPLETE_REGISTER_TITLE = () => ['Handshake Registered'];
export const GET_PANEL_TITLE = () => ['Panel Scheduled'];
export const GET_APPROVAL_TITLE = () => ['Assignment Approved'];

// all the statuses considered 'submitted' and still 'active' on the bid tracker
export const BID_TRACKER_SUBMITTED_ACTIVE_STATUSES = [
  APPROVED_PROP, HAND_SHAKE_ACCEPTED_PROP, HAND_SHAKE_OFFERED_PROP,
  PRE_PANEL_PROP, IN_PANEL_PROP, SUBMITTED_PROP, PANEL_RESCHEDULED_PROP,
  HAND_SHAKE_NEEDS_REGISTER_PROP];
