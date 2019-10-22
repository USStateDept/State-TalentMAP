import React from 'react';
import createLoader from '../Loadable';

export const path = () => import('./BidTracker');

const BidTracker = createLoader({ path, shouldPreload: false });

const BidTrackerLoadable = ({ ...rest }) => (
  <BidTracker {...rest} />
);

export default BidTrackerLoadable;
