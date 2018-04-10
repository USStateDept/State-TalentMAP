import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BidTrackerCardTitle = ({ title, id }) => (
  <div className="bid-tracker-card-title-container">
    <div className="bid-tracker-card-title-text">{title}</div>
    <div className="bid-tracker-card-title-link">
      <Link to={`/details/${id}`}>View position</Link>
    </div>
  </div>
);

BidTrackerCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BidTrackerCardTitle;
