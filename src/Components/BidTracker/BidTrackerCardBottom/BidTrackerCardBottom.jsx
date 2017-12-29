import React from 'react';
import PropTypes from 'prop-types';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';
import { BID_REVIEWER_OBJECT } from '../../../Constants/PropTypes';

const BidTrackerCardBottom = ({ bureau, reviewer }) => {
  const reviewerName = reviewer && reviewer.first_name && reviewer.last_name ? `${reviewer.first_name} ${reviewer.last_name}` : null;
  return (
    <div className="usa-grid-full bid-tracker-card-bottom">
      {
        reviewerName &&
        <div className="bid-tracker-ao-container">
          <ExternalUserStatus
            showMail
            type="ao"
            name={`${reviewer.first_name} ${reviewer.last_name}`}
            email={reviewer.email}
          />
        </div>
      }
      <div className="bid-tracker-organization-container">
        <OrganizationStamp
          showMail
          abbreviation="AF"
          name={bureau}
        />
      </div>
    </div>
  );
};

// reviewer is not required because some local dev data sets don't include a reviewer
BidTrackerCardBottom.propTypes = {
  reviewer: BID_REVIEWER_OBJECT,
  bureau: PropTypes.string.isRequired,
};

BidTrackerCardBottom.defaultProps = {
  reviewer: null,
};

export default BidTrackerCardBottom;
