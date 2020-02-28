import { keys } from 'lodash';
import {
  HAND_SHAKE_OFFERED_PROP,
  GET_HAND_SHAKE_EVALUATING_TITLE,
} from '../../../Constants/BidData';
import getBidObject from './Complete';

export default function bidClassesFromCurrentStatus(bid = { status: 'draft' }) {
  const bidClassObject = getBidObject(bid);

  // This is the base object we'll return. The stages prop will be filled with prop names
  // that correspond to each stage of the bid tracker.
  const bidClassObject$ = Object.assign({}, { stages: {} }, bidClassObject);

  if (!keys(bidClassObject$.stages).length) {
    return false;
  }

  const HAND_SHAKE_EVALUATING_TITLE = GET_HAND_SHAKE_EVALUATING_TITLE();

  bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP].title = HAND_SHAKE_EVALUATING_TITLE;
  bidClassObject$.stages[HAND_SHAKE_OFFERED_PROP].date = null;

  return bidClassObject$;
}
