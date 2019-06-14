import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BID_STATISTICS_OBJECT, POST_DETAILS } from '../../../Constants/PropTypes';
import BidCount from '../../BidCount';
import { getPostName } from '../../../utilities';
import { getStatusProperty } from '../../../Constants/BidStatuses';
import { APPROVED_PROP } from '../../../Constants/BidData';

const BidTrackerCardTitle = ({ title, id, bidStatistics, post, showBidCount, status },
{ condensedView, priorityExists, isPriority }) => {
  const viewPosition = (
    <div className="bid-tracker-card-title-link">
      <Link to={`/details/${id}`}>View position</Link>
    </div>
  );
  let title$ = title;
  if (condensedView && priorityExists && isPriority) {
    if (status === APPROVED_PROP) {
      title$ = `Assignment: ${title}`;
    } else {
      title$ = `Pending Assignment: ${title}`;
    }
  }
  if (condensedView && priorityExists && !isPriority) {
    const status$ = getStatusProperty(status, 'text');
    title$ = `${status$} (on-hold)`;
  }
  return (
    <div className="usa-grid-full">
      <div className="usa-grid-full bid-tracker-card-title-container">
        <div className="bid-tracker-card-title-text">{title$}</div>
        {!condensedView && viewPosition}
      </div>
      <div className="usa-grid-full bid-tracker-bottom-link-container">
        <div className="bid-tracker-card-title-bottom">
          <strong>Location:</strong> {getPostName(post)}
        </div>
        {condensedView && viewPosition}
        {
          showBidCount && !condensedView &&
            <span className="bid-stats">
              <BidCount bidStatistics={bidStatistics} altStyle />
            </span>
        }
      </div>
    </div>
  );
};

BidTrackerCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bidStatistics: BID_STATISTICS_OBJECT.isRequired,
  post: POST_DETAILS.isRequired,
  showBidCount: PropTypes.bool,
  status: PropTypes.string.isRequired,
};

BidTrackerCardTitle.defaultProps = {
  showBidCount: true,
};

BidTrackerCardTitle.contextTypes = {
  condensedView: PropTypes.bool,
  priorityExists: PropTypes.bool,
  isPriority: PropTypes.bool,
};

export default BidTrackerCardTitle;
