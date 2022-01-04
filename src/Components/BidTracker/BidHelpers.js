import { includes } from 'lodash';
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
} from '../../Constants/BidData';
import getConfig, { isTypeComplete } from './BidPhaseConfig/config';

// determine whether to show an alert on the bid tracker based on the status
export function shouldShowAlert(bid, { condensedView = false }) {
  // TO-DO - Add APPROVED_PROP back in with meanginful information
  const alertStatusArray = [DRAFT_PROP, CLOSED_PROP, HAND_SHAKE_ACCEPTED_PROP,
    HAND_SHAKE_DECLINED_PROP, DECLINED_PROP, HAND_SHAKE_NEEDS_REGISTER_PROP, SUBMITTED_PROP];

  if (isTypeComplete()) {
    alertStatusArray.push(HAND_SHAKE_OFFERED_PROP);
  }

  // alerts we hide in the condensed view
  const hiddenInCondensedView = [APPROVED_PROP, IN_PANEL_PROP];

  // don't show overlay for APPROVED or IN_PANEL if condensedView === true
  if (condensedView && hiddenInCondensedView.includes(bid.status)) {
    return false;
  }

  // status is in the array OR paneling is today
  if (alertStatusArray.includes(bid.status) ||
  (bid.is_paneling_today && bid.status === IN_PANEL_PROP)) {
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
export const bidClassesFromCurrentStatus = (bid = { status: 'draft' }) => getConfig()(bid);

export function showHandshakeRegsiterWithAnotherBidderOverlay(bid) {
  const bidStatusOptions = [
    APPROVED_PROP,
    CLOSED_PROP,
    DRAFT_PROP,
    HAND_SHAKE_ACCEPTED_PROP,
    IN_PANEL_PROP,
  ];
  const showOverlay = !includes(bidStatusOptions, bid.status);
  return showOverlay;
}
