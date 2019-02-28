import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BID_STATISTICS_OBJECT, POST_DETAILS } from '../../../Constants/PropTypes';
import BidCount from '../../BidCount';
import { getPostName } from '../../../utilities';

const BidTrackerCardTitle = ({ title, id, bidStatistics, post, showBidCount }) => (
  <div className="usa-grid-full">
    <div className="usa-grid-full bid-tracker-card-title-container">
      <div className="bid-tracker-card-title-text">{title}</div>
      <div className="bid-tracker-card-title-link">
        <Link to={`/details/${id}`}>View position</Link>
      </div>
    </div>
    <div className="usa-grid-full">
      <div className="bid-tracker-card-title-bottom">
        <strong>Post:</strong> {getPostName(post)}
      </div>
      {
        showBidCount &&
          <span className="bid-stats">
            <BidCount bidStatistics={bidStatistics} altStyle />
          </span>
      }
    </div>
  </div>
);

BidTrackerCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bidStatistics: BID_STATISTICS_OBJECT.isRequired,
  post: POST_DETAILS.isRequired,
  showBidCount: PropTypes.bool,
};

BidTrackerCardTitle.defaultProps = {
  showBidCount: true,
};

export default BidTrackerCardTitle;
