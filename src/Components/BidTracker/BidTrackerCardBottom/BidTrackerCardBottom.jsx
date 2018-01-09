import React from 'react';
import PropTypes from 'prop-types';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';
import { BID_REVIEWER_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import StaticDevContent from '../../StaticDevContent';

const BidTrackerCardBottom = ({ bureau, reviewer, userProfile }) => {
  // eslint-disable-next-line no-confusing-arrow
  const getName = obj => obj ? `${obj.first_name} ${obj.last_name}` : null;
  const reviewerName = getName(reviewer);
  const cdo = userProfile.cdo;
  const cdoName = getName(cdo);

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

BidTrackerCardBottom.propTypes = {
  reviewer: BID_REVIEWER_OBJECT.isRequired,
  bureau: PropTypes.string.isRequired,
  userProfile: USER_PROFILE.isRequired,
};

export default BidTrackerCardBottom;
