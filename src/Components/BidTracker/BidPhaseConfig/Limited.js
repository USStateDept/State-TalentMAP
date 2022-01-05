import { keys } from 'lodash';
import {
  APPROVED_PROP, BID_TRACKER_TOOLTIP_TEXT, CLOSED_PROP,
  DECLINED_PROP, DRAFT_PROP, HAND_SHAKE_ACCEPTED_PROP, HAND_SHAKE_DECLINED_PROP,
  HAND_SHAKE_NEEDS_REGISTER_PROP, HAND_SHAKE_OFFERED_PROP, IN_PANEL_PROP,
  PRE_PANEL_PROP, SUBMITTED_PROP,
} from 'Constants/BidData';
import getBidObject from './Complete';

export default function bidClassesFromCurrentStatus(bid = { status: 'draft' }) {
  const DRAFT_TOOLTIP = BID_TRACKER_TOOLTIP_TEXT[DRAFT_PROP];
  const SUBMITTED_TOOLTIP = BID_TRACKER_TOOLTIP_TEXT[SUBMITTED_PROP];
  const HAND_SHAKE_OFFERED_TOOLTIP = BID_TRACKER_TOOLTIP_TEXT[HAND_SHAKE_OFFERED_PROP];
  const HAND_SHAKE_ACCEPTED_TOOLTIP =
      BID_TRACKER_TOOLTIP_TEXT[HAND_SHAKE_ACCEPTED_PROP];
  const PANEL_TOOLTIP = BID_TRACKER_TOOLTIP_TEXT[PRE_PANEL_PROP];
  const APPROVED_TOOLTIP = BID_TRACKER_TOOLTIP_TEXT[APPROVED_PROP];

  const bidClassObject = getBidObject(bid);

  // This is the base object we'll return. The stages prop will be filled with prop names
  // that correspond to each stage of the bid tracker.
  const bidClassObject$ = Object.assign({}, { stages: {} }, bidClassObject);

  if (!keys(bidClassObject$.stages).length) {
    return false;
  }

  bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP].date = null;

  switch (bid.status) {
    case DRAFT_PROP:
    case SUBMITTED_PROP:
    case HAND_SHAKE_OFFERED_PROP:
    case HAND_SHAKE_DECLINED_PROP:
    case CLOSED_PROP:
    case HAND_SHAKE_NEEDS_REGISTER_PROP:
    case HAND_SHAKE_ACCEPTED_PROP:
    case PRE_PANEL_PROP:
    case IN_PANEL_PROP:
    case DECLINED_PROP:
      bidClassObject$.stages[DRAFT_PROP] = {
        ...bidClassObject$.stages[DRAFT_PROP],
        tooltip: DRAFT_TOOLTIP };
      bidClassObject$.stages[SUBMITTED_PROP] = {
        ...bidClassObject$.stages[SUBMITTED_PROP],
        tooltip: SUBMITTED_TOOLTIP };
      bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP],
        tooltip: HAND_SHAKE_OFFERED_TOOLTIP };
      bidClassObject$.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...bidClassObject$.stages[HAND_SHAKE_ACCEPTED_PROP],
        tooltip: HAND_SHAKE_ACCEPTED_TOOLTIP };
      bidClassObject$.stages[IN_PANEL_PROP] = {
        ...bidClassObject$.stages[IN_PANEL_PROP],
        tooltip: PANEL_TOOLTIP };
      bidClassObject$.stages[APPROVED_PROP] = {
        ...bidClassObject$.stages[APPROVED_PROP],
        tooltip: APPROVED_TOOLTIP };
      return bidClassObject$;
    case APPROVED_PROP:
      bidClassObject$.stages[DRAFT_PROP] = {
        ...bidClassObject$.stages[DRAFT_PROP],
        tooltip: DRAFT_TOOLTIP };
      bidClassObject$.stages[SUBMITTED_PROP] = {
        ...bidClassObject$.stages[SUBMITTED_PROP],
        tooltip: SUBMITTED_TOOLTIP };
      bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP] = {
        ...bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP],
        tooltip: HAND_SHAKE_OFFERED_TOOLTIP };
      bidClassObject$.stages[HAND_SHAKE_ACCEPTED_PROP] = {
        ...bidClassObject$.stages[HAND_SHAKE_ACCEPTED_PROP],
        tooltip: HAND_SHAKE_ACCEPTED_TOOLTIP };
      bidClassObject$.stages[IN_PANEL_PROP] = {
        ...bidClassObject$.stages[IN_PANEL_PROP],
        tooltip: PANEL_TOOLTIP };
      return bidClassObject$;
    default:
      return bidClassObject$;
  }
}
