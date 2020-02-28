import React from 'react';
import { Flag } from 'flag';
import BidCount from './BidCount';

// Only show bid count if bid_count flag === true
const BidCountFeatureFlagWrapper = props => (
  <Flag
    name="flags.bid_count"
    render={() => <BidCount {...props} />}
  />
);

export default BidCountFeatureFlagWrapper;
