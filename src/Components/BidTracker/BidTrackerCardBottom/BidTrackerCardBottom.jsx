import React from 'react';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';

const BidTrackerCardBottom = () => (
  <div className="usa-grid-full bid-tracker-card-bottom">
    <div className="bid-tracker-ao-container">
      <ExternalUserStatus showMail type="ao" name="Leah Shadtrach" />
    </div>
    <div className="bid-tracker-organization-container">
      <OrganizationStamp
        showMail
        abbreviation="AF"
        name="(AF) BUREAU OF AFRICAN AFFAIRS"
      />
    </div>
  </div>
);

export default BidTrackerCardBottom;
