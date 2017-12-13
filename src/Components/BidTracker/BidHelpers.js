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
  DRAFT_TITLE,
  SUBMIT_BID_ACTION_TITLE,
  SUBMIT_BID_COMPLETE_TITLE,
  HAND_SHAKE_EVALUATE_TITLE,
  HAND_SHAKE_EVALUATING_TITLE,
  HAND_SHAKE_OFFERED_TITLE,
  HAND_SHAKE_ACCEPTED_TITLE,
  PANEL_TITLE,
  APPROVAL_TITLE,
  DRAFT_NUMBER,
  SUBMITTED_NUMBER,
  HAND_SHAKE_OFFERED_NUMBER,
  HAND_SHAKE_ACCEPTED_NUMBER,
  IN_PANEL_NUMBER,
  APPROVED_NUMBER,
} from '../../Constants/BidData';

function bidClassesFromCurrentStatus(bid = { status: 'draft' }) {
  const DEFAULT_INCOMPLETE_OBJECT = {
    needsAction: false,
    isComplete: false,
    isCurrent: false,
    isPendingLine: false,
    isPendingAlert: false,
  };

  const DEFAULT_COMPLETE_OBJECT = { ...DEFAULT_INCOMPLETE_OBJECT, isComplete: true };

  const bidClassObject = Object.assign({ stages: {} });

  switch (bid.status) {

    // draft stage
    case DRAFT_PROP:
      bidClassObject.stages[DRAFT_PROP] = { ...DEFAULT_COMPLETE_OBJECT, title: DRAFT_TITLE() };
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        needsAction: true,
        isCurrent: true,
        isPendingLine: true,
        title: SUBMIT_BID_ACTION_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: HAND_SHAKE_EVALUATE_TITLE(),
        number: HAND_SHAKE_OFFERED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: HAND_SHAKE_ACCEPTED_TITLE(),
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: PANEL_TITLE(),
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: APPROVAL_TITLE(),
        number: APPROVED_NUMBER };
      return bidClassObject;

    // Submitted stage, but we'll still render this
    // for handshake_offered, hand_shake_declined, and closed as well.
    case SUBMITTED_PROP:
    case HAND_SHAKE_OFFERED_PROP:
    case HAND_SHAKE_DECLINED_PROP:
    case CLOSED_PROP:
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, title: DRAFT_TITLE() },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: SUBMIT_BID_COMPLETE_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: HAND_SHAKE_EVALUATING_TITLE(),
        needsAction: false,
        isCurrent: true,
        number: HAND_SHAKE_OFFERED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: HAND_SHAKE_ACCEPTED_TITLE(),
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: PANEL_TITLE(),
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: APPROVAL_TITLE(),
        number: APPROVED_NUMBER };
      return bidClassObject;

    case HAND_SHAKE_ACCEPTED_PROP:
    case PRE_PANEL_PROP:
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, title: DRAFT_TITLE() },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: SUBMIT_BID_COMPLETE_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: HAND_SHAKE_OFFERED_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: HAND_SHAKE_ACCEPTED_TITLE(),
        needsAction: false,
        isPendingLine: true,
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: PANEL_TITLE(),
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: APPROVAL_TITLE(),
        number: APPROVED_NUMBER };
      return bidClassObject;

    case IN_PANEL_PROP:
    case APPROVED_PROP:
    case 'Cherries':
      bidClassObject.stages[DRAFT_PROP] = Object.assign(
        DEFAULT_COMPLETE_OBJECT,
        { number: DRAFT_NUMBER, title: DRAFT_TITLE() },
      );
      bidClassObject.stages[SUBMITTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: SUBMIT_BID_COMPLETE_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: HAND_SHAKE_OFFERED_TITLE(),
        number: SUBMITTED_NUMBER };
      bidClassObject.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...DEFAULT_COMPLETE_OBJECT,
        title: HAND_SHAKE_ACCEPTED_TITLE(),
        number: HAND_SHAKE_ACCEPTED_NUMBER };
      bidClassObject.stages[IN_PANEL_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: PANEL_TITLE(),
        needsAction: false,
        isCurrent: true,
        number: IN_PANEL_NUMBER };
      bidClassObject.stages[APPROVED_PROP] = {
        ...DEFAULT_INCOMPLETE_OBJECT,
        title: APPROVAL_TITLE(),
        number: APPROVED_NUMBER };
      return bidClassObject;
    default:
      return false;
  }
}

export default bidClassesFromCurrentStatus;
