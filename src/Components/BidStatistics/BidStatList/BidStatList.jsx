import React from 'react';
import { BID_STATISTICS_OBJECT } from '../../../Constants/PropTypes';
import BidStatCard from '../BidStatCard';
import { numbersToPercentString } from '../../../utilities';

const BidStatList = ({ bidStats }) => {
  const positionsFilledPercent = numbersToPercentString(
    bidStats.total_positions - bidStats.available_positions, bidStats.total_positions);
  return (
    <div className="usa-grid-full bid-stat-card-list">
      <BidStatCard title="Positions Available" number={bidStats.available_positions} />
      <BidStatCard
        title="Positions Filled"
        number={positionsFilledPercent}
      />
      <BidStatCard
        title="International Positions"
        number={bidStats.available_international_positions}
      />
      <BidStatCard title="Bidding days remaining" number={bidStats.bidding_days_remaining} />
    </div>
  );
};

BidStatList.propTypes = {
  bidStats: BID_STATISTICS_OBJECT.isRequired,
};

export default BidStatList;
