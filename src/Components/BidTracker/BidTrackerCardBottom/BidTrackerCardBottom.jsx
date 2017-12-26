import React from 'react';
import PropTypes from 'prop-types';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';
import { BID_REVIEWER_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import StaticDevContent from '../../StaticDevContent';

const BidTrackerCardBottom = ({ bureau, reviewer, userProfile }) => {
  const reviewerName = reviewer && reviewer.first_name && reviewer.last_name ? `${reviewer.first_name} ${reviewer.last_name}` : null;
  const cdo = userProfile.cdo;
  const cdoName = cdo && cdo.first_name && cdo.last_name ? `${cdo.first_name} ${cdo.last_name}` : null;

  // TODO - determine whether we want to conditionally display some of
  // these contacts depending on the status.
  return (
    <div className="usa-grid-full bid-tracker-card-bottom">
      {
        cdoName &&
        <div className="bid-tracker-card-bottom-section">
          <ExternalUserStatus
            showMail
            type="cdo"
            name={cdoName}
            email={cdo.email}
          />
        </div>
      }
      <div className="bid-tracker-card-bottom-section">
        <StaticDevContent>
          <OrganizationStamp
            showMail
            abbreviation="AF"
            name={bureau}
          />
        </StaticDevContent>
      </div>
      {
        reviewerName &&
        <div className="bid-tracker-card-bottom-section">
          <ExternalUserStatus
            showMail
            type="ao"
            name={reviewerName}
            email={reviewer.email}
          />
        </div>
      }
      {
        reviewerName &&
        <div className="bid-tracker-card-bottom-section">
          <StaticDevContent>
            <ExternalUserStatus
              showMail
              type="hr"
              name={reviewerName}
              email={reviewer.email}
            />
          </StaticDevContent>
        </div>
      }
    </div>
  );
};

// reviewer is not required because some local dev data sets don't include a reviewer
BidTrackerCardBottom.propTypes = {
  reviewer: BID_REVIEWER_OBJECT,
  bureau: PropTypes.string.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

BidTrackerCardBottom.defaultProps = {
  reviewer: null,
};

export default BidTrackerCardBottom;
