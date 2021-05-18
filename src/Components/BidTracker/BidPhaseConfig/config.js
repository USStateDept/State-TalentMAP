import { checkFlag } from 'flags';

import limitedConfig from './Limited';
import completeConfig from './Complete';

// define our types
export const TYPE_COMPLETE = 'complete';
export const TYPE_LIMITED = 'limited';

// the type we should use
// This could be configured with a feature flag,
// but the old bidding model would break the UI.
// eslint-disable-next-line no-confusing-arrow
export const BID_PHASE_TYPE = () => checkFlag('flags.handshake_bidding') ? TYPE_COMPLETE : TYPE_LIMITED;

export const isTypeComplete = () => BID_PHASE_TYPE() === TYPE_COMPLETE;

// eslint-disable-next-line no-confusing-arrow
export const bidClassesFromCurrentStatus = () =>
  BID_PHASE_TYPE() === TYPE_LIMITED ? limitedConfig : completeConfig;

export default bidClassesFromCurrentStatus;
