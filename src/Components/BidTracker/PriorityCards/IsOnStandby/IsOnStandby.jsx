import React from 'react';
import { BID_OBJECT } from '../../../../Constants/PropTypes';
import BidTrackerCardTop from '../../BidTrackerCardTop';

const IsOnStandby = ({ bid }) => (
  <div className="usa-grid-full bid-tracker bid-tracker-standby-container">
    <div className="padded-container-inner bid-tracker-standby-title">
      On standby
    </div>
    <div className="bid-tracker-standby-content-container">
      <BidTrackerCardTop bid={bid} />
    </div>
  </div>
);

IsOnStandby.propTypes = {
  bid: BID_OBJECT.isRequired,
};

export default IsOnStandby;
