import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
import CDOInfo from './CDOInfo';
import BidList from './BidList';
import PositionInformation from './PositionInformation';
import Notifications from './Notifications';
import Inbox from './Inbox';

// eslint-disable-next-line
class ProfileDashboard extends Component {
  render() {
    return (
      <div className="usa-grid-full user-dashboard">
        <div
          className="usa-width-one-fourth user-dashboard-section-container user-dashboard-column-1"
        >
          <div className="usa-width-one-whole user-dashboard-section current-user-section">
            <CurrentUser />
          </div>
          <div className="usa-width-one-whole user-dashboard-section cdo-section">
            <CDOInfo />
          </div>
        </div>
        <div
          className="usa-width-one-fourth user-dashboard-section-container user-dashboard-column-2"
        >
          <div className="usa-width-one-whole user-dashboard-section position-info-section">
            <PositionInformation />
          </div>
          <div className="usa-width-one-whole user-dashboard-section notifications-section">
            <Notifications />
          </div>
        </div>
        <div
          className="usa-width-one-half user-dashboard-section-container user-dashboard-column-3"
        >
          <div className="usa-width-one-whole user-dashboard-section bidlist-section">
            <BidList />
          </div>
          <div className="usa-width-one-whole user-dashboard-section inbox-section">
            <Inbox />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDashboard;
