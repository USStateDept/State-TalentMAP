import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BID_STATISTICS_OBJECT, POST_DETAILS } from '../../../Constants/PropTypes';
import BidCount from '../../BidCount';
import { SUBMITTED_PROP } from '../../../Constants/BidData';
import { getPostName } from '../../../utilities';

const BidTrackerCardTitle = ({ title, id, status, bidStatistics, post }) => (
  <div className="usa-grid-full">
    <div className="usa-grid-full bid-tracker-card-title-container">
      <div className="bid-tracker-card-title-text">{title}</div>
      <div className="bid-tracker-card-title-link">
        <Link to={`/details/${id}`}>View position</Link>
      </div>
    </div>
    {status === SUBMITTED_PROP &&
      <div className="usa-grid-full">
        <div className="bid-tracker-card-title-bottom">
          <strong>Post:</strong> {getPostName(post)}
        </div>
        <span className="bid-stats">
          <BidCount bidStatistics={bidStatistics} altStyle />
        </span>
      </div>
    }
  </div>
);

BidTrackerCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  bidStatistics: BID_STATISTICS_OBJECT.isRequired,
  post: POST_DETAILS.isRequired,
};

export default BidTrackerCardTitle;
