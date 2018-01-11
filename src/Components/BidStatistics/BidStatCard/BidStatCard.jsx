import React from 'react';
import PropTypes from 'prop-types';

const BidStatCard = ({ title, number }) => (
  <div className="bid-stat-card">
    <div className="bid-stat-card-number">
      {number}
    </div>
    <div className="bid-stat-card-title">
      {title}
    </div>
  </div>
);

BidStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default BidStatCard;
