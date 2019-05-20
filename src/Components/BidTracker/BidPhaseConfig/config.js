import limitedConfig from './Limited';
import completeConfig from './Complete';
import { checkFlag } from '../../../flags';

// define our types
export const TYPE_COMPLETE = 'complete';
export const TYPE_LIMITED = 'limited';

// the type we should use
// eslint-disable-next-line no-confusing-arrow
export const BID_PHASE_TYPE = () => checkFlag('flags.complete_bidding') ? TYPE_COMPLETE : TYPE_LIMITED;

export const isTypeComplete = () => BID_PHASE_TYPE() === TYPE_COMPLETE;

// eslint-disable-next-line no-confusing-arrow
export const bidClassesFromCurrentStatus = () =>
  BID_PHASE_TYPE() === TYPE_LIMITED ? limitedConfig : completeConfig;

export default bidClassesFromCurrentStatus;
