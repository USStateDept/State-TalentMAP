import React from 'react';
import ExternalUserStatus from '../../ProfileDashboard/ExternalUserStatus';
import OrganizationStamp from '../../OrganizationStamp';

const BidTrackerCardBottom = () => (
  <div className="usa-grid-full bid-tracker-card-bottom">
    <div style={{ width: '290px', float: 'left' }}>
      <ExternalUserStatus showMail type="ao" name="Leah Shadtrach" />
    </div>
    <div style={{ width: '400px', float: 'left', marginLeft: '50px' }}>
      <OrganizationStamp
        showMail
        abbreviation="AF"
        name="(AF) BUREAU OF AFRICAN AFFAIRS"
      />
    </div>
  </div>
);

export default BidTrackerCardBottom;
