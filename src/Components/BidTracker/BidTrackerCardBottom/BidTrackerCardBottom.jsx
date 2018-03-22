import React from 'react';
import PropTypes from 'prop-types';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';
import StaticDevContent from '../../StaticDevContent';

import { BID_REVIEWER_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';

const BidTrackerCardBottom = (props) => {
  const { bureau, userProfile } = props;
  const getUser = user => (user ?
  {
    email: user.email,
    initials: user.initials,
    firstName: user.first_name,
    lastName: user.last_name,
  } :
  null);

  const reviewer = getUser(props.reviewer);
  const cdo = getUser(userProfile.cdo);

  return (
    <div className="usa-grid-full bid-tracker-card-bottom">
      {
        cdo &&
        <div className="bid-tracker-card-bottom-section">
          <ExternalUserStatus type="cdo" {...cdo} showMail />
        </div>
      }
      <div className="bid-tracker-card-bottom-section">
        <StaticDevContent>
          <OrganizationStamp abbreviation="AF" name={bureau} showMail />
        </StaticDevContent>
      </div>
      {
        reviewer &&
        <div className="bid-tracker-card-bottom-section">
          <ExternalUserStatus type="ao" {...reviewer} showMail />
        </div>
      }
      {
        reviewer &&
        <div className="bid-tracker-card-bottom-section">
          <StaticDevContent>
            <ExternalUserStatus type="hr" {...reviewer} showMail />
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
