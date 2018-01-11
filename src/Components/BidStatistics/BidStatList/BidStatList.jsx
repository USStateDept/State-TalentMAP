import React from 'react';
import PropTypes from 'prop-types';
import BidStatCard from '../BidStatCard';

const BidStatList = ({ bidStats }) => (
  <div className="usa-grid-full bid-stat-card-list">
    <BidStatCard title="Positions Available" number={bidStats.available_positions} />
    <BidStatCard
      title="Positions Filled"
      number={
        `${parseFloat(
          (bidStats.total_positions - bidStats.available_positions) / bidStats.total_positions)
          .toFixed(2) * 100}%`
      }
    />
    <BidStatCard
      title="International Positions"
      number={bidStats.available_international_positions}
    />
    <BidStatCard title="Bidding days remaining" number={bidStats.bidding_days_remaining} />
  </div>
);

BidStatList.propTypes = {
  bidStats: PropTypes.shape({}).isRequired,
};

export default BidStatList;
