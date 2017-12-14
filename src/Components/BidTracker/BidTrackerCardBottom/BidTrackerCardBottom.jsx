import React from 'react';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';

const BidTrackerCardBottom = () => (
  <div className="usa-grid-full bid-tracker-card-bottom">
    <div style={{ width: '290px', float: 'left' }}>
      <ExternalUserStatus type="ao" name="Leah Shadtrach" />
    </div>
    <div style={{ width: '300px', float: 'left', marginLeft: '50px' }}>
      <OrganizationStamp abbreviation="AF" name="(AF) Bureau of African Affairs" />
    </div>
  </div>
);

export default BidTrackerCardBottom;
