import {
  APPROVED_PROP,
  CLOSED_PROP,
  DRAFT_PROP,
  HAND_SHAKE_ACCEPTED_PROP,
  HAND_SHAKE_OFFERED_PROP,
  HAND_SHAKE_DECLINED_PROP,
  PRE_PANEL_PROP,
  IN_PANEL_PROP,
  SUBMITTED_PROP,
  DECLINED_PROP,
  GET_DRAFT_TITLE,
  GET_SUBMIT_BID_ACTION_TITLE,
  GET_SUBMIT_BID_COMPLETE_TITLE,
  GET_HAND_SHAKE_EVALUATE_TITLE,
  GET_HAND_SHAKE_EVALUATING_TITLE,
  GET_HAND_SHAKE_OFFERED_TITLE,
  GET_HAND_SHAKE_ACCEPTED_TITLE,
  GET_PANEL_TITLE,
  GET_APPROVAL_TITLE,
  DRAFT_NUMBER,
  SUBMITTED_NUMBER,
  HAND_SHAKE_OFFERED_NUMBER,
  HAND_SHAKE_ACCEPTED_NUMBER,
  IN_PANEL_NUMBER,
  APPROVED_NUMBER,
} from '../../Constants/BidData';

// determine whether to show an alert on the bid tracker based on the status
export function shouldShowAlert(bid) {
  const alertStatusArray = [DRAFT_PROP, HAND_SHAKE_OFFERED_PROP, APPROVED_PROP, CLOSED_PROP,
    HAND_SHAKE_DECLINED_PROP, DECLINED_PROP];

  // status is in the array OR paneling is today
  if (alertStatusArray.includes(bid.status) || bid.is_paneling_today) {
    return true;
  }
  return false;
}

// Determine what actions to allow as far as "deleting" and "withdrawing" based on the status.
// Also return a value to determine whether to show that action, but keep it disabled.
export function getActionPermissions(status) {
  const defaultPermissions = {
    showDelete: true,
    disableDelete: false,
    showWithdraw: false,
    disableWithdraw: false,
  };
  switch (status) {
    case DRAFT_PROP:
    case SUBMITTED_PROP:
      return defaultPermissions;
    case HAND_SHAKE_OFFERED_PROP:
    case HAND_SHAKE_ACCEPTED_PROP:
    case PRE_PANEL_PROP:
      return { ...defaultPermissions, showDelete: false, showWithdraw: true };
    default:
      return {
        ...defaultPermissions, showDelete: false, showWithdraw: true, disableWithdraw: true,
      };
  }
}

// Get an object with stages that map to six sections of the bid tracker.
// There's a prop for each stage (status), which contains data used to apply different styles.
// Instead of trying to apply some logic based on the current step, we explicitly
// declare what properties each step should have based on the status of the bid.
// This way, we can ensure a known, consistent output.
// The function accepts the entire bid object so that we can most importantly get the status,
// but also information such as dates so that if we want,
// we could dynamically render step titles within the function.
export function bidClassesFromCurrentStatus(bid = { status: 'draft' }) {
  // Configure defaults for a step that is incomplete (future stages).
  const DEFAULT_INCOMPLETE_OBJECT = {
    needsAction: false,
    isComplete: false,
    isCurrent: false,
    isPendingLine: false,
    isPendingAlert: false,
  };

  // Configure defaults for a complete object. The only thing we change is the isComplete prop.
  const DEFAULT_COMPLETE_OBJECT = { ...DEFAULT_INCOMPLETE_OBJECT, isComplete: true };

  // This is the base object we'll return. The stages prop will be filled with prop names
  // that correspond to each stage of the bid tracker.
  const bidClassObject = Object.assign({ stages: {} });

  const DRAFT_TITLE = GET_DRAFT_TITLE();
  const SUBMIT_BID_ACTION_TITLE = GET_SUBMIT_BID_ACTION_TITLE();
  const SUBMIT_BID_COMPLETE_TITLE = GET_SUBMIT_BID_COMPLETE_TITLE();
  const HAND_SHAKE_EVALUATE_TITLE = GET_HAND_SHAKE_EVALUATE_TITLE();
  const HAND_SHAKE_EVALUATING_TITLE = GET_HAND_SHAKE_EVALUATING_TITLE();
  const HAND_SHAKE_OFFERED_TITLE = GET_HAND_SHAKE_OFFERED_TITLE();
  const HAND_SHAKE_ACCEPTED_TITLE = GET_HAND_SHAKE_ACCEPTED_TITLE();
  const PANEL_TITLE = GET_PANEL_TITLE();
  const APPROVAL_TITLE = GET_APPROVAL_TITLE();

  const DRAFT_DATE = bid.draft_date;
  const SUBMITTED_DATE = bid.submitted_date;
  const HAND_SHAKE_OFFERED_DATE = bid.handshake_offered_date;
  const HAND_SHAKE_ACCEPTED_DATE = bid.handshake_accepted_date;
  const IN_PANEL_DATE = bid.scheduled_panel_date;
  const APPROVED_DATE = bid.approved_date;

  // Perform a switch to check the status.
  switch (bid.status) {

    // Draft stage
    case DRAFT_PROP:
      bidClassObject.stages[DRAFT_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT, date: DRAFT_DATE, title: DRAFT_TITLE };
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: SUBMITTED_DATE,
        needsAction: true,
        isCurrent: true,
        isPendingLine: true,
        title: SUBMIT_BID_ACTION_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: HAND_SHAKE_OFFERED_DATE,
        title: HAND_SHAKE_EVALUATE_TITLE,
        number: HAND_SHAKE_OFFERED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: HAND_SHAKE_ACCEPTED_DATE,
        title: HAND_SHAKE_ACCEPTED_TITLE,
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: IN_PANEL_DATE,
        title: PANEL_TITLE,
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: APPROVED_DATE,
        title: APPROVAL_TITLE,
        number: APPROVED_NUMBER };
      return bidClassObject;

    // Submitted stage, but we'll still render this
    // for handshake_offered, hand_shake_declined, and closed as well,
    // since we display an overlay alert for the user to accept the handshake,
    // or when they've declined it.
    case SUBMITTED_PROP:
    case HAND_SHAKE_OFFERED_PROP:
    case HAND_SHAKE_DECLINED_PROP:
    case CLOSED_PROP:
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, date: DRAFT_DATE, title: DRAFT_TITLE },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: SUBMITTED_DATE,
        title: SUBMIT_BID_COMPLETE_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: HAND_SHAKE_OFFERED_DATE,
        title: HAND_SHAKE_EVALUATING_TITLE,
        needsAction: false,
        isCurrent: true,
        hasPendingTooltip: true,
        number: HAND_SHAKE_OFFERED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: HAND_SHAKE_ACCEPTED_DATE,
        title: HAND_SHAKE_ACCEPTED_TITLE,
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: IN_PANEL_DATE,
        title: PANEL_TITLE,
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: APPROVED_DATE,
        title: APPROVAL_TITLE,
        number: APPROVED_NUMBER };
      return bidClassObject;

    // When the handshake is accepted, we display an overlay alert, so it can look the same
    // as the Pre-panel phase.
    case HAND_SHAKE_ACCEPTED_PROP:
    case PRE_PANEL_PROP:
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, date: DRAFT_DATE, title: DRAFT_TITLE },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: SUBMITTED_DATE,
        title: SUBMIT_BID_COMPLETE_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: HAND_SHAKE_OFFERED_DATE,
        title: HAND_SHAKE_OFFERED_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: HAND_SHAKE_ACCEPTED_DATE,
        title: HAND_SHAKE_ACCEPTED_TITLE,
        needsAction: false,
        isPendingLine: true,
        hasBidPreparingTooltip: true,
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: IN_PANEL_DATE,
        title: PANEL_TITLE,
        hasRescheduledTooltip: !!bid.panel_reschedule_count,
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: APPROVED_DATE,
        title: APPROVAL_TITLE,
        number: APPROVED_NUMBER };
      return bidClassObject;

    // When the bid is approved, we display an overlay alert, so we can render
    // the tracker the same as the in-panel phase.
    case IN_PANEL_PROP:
    case APPROVED_PROP:
    case DECLINED_PROP:
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, date: DRAFT_DATE, title: DRAFT_TITLE },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: SUBMITTED_DATE,
        title: SUBMIT_BID_COMPLETE_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: HAND_SHAKE_OFFERED_DATE,
        title: HAND_SHAKE_OFFERED_TITLE,
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        date: HAND_SHAKE_ACCEPTED_DATE,
        title: HAND_SHAKE_ACCEPTED_TITLE,
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: IN_PANEL_DATE,
        title: PANEL_TITLE,
        needsAction: false,
        isCurrent: true,
        // Only show the rescheduled tooltip if it has a
        // panel_reschedule_count > 0 and is not paneling today and status is IN_PANEL_PROP.
        hasRescheduledTooltip:
          !!bid.panel_reschedule_count && !bid.is_paneling_today && bid.status === IN_PANEL_PROP,
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        date: APPROVED_DATE,
        title: APPROVAL_TITLE,
        number: APPROVED_NUMBER };
      return bidClassObject;
    default:
      return false;
  }
}
