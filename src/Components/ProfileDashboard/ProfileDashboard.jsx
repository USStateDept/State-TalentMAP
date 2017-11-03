import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../Constants/PropTypes';
import CurrentUser from './CurrentUser';
import CDOInfo from './CDOInfo';
import BidList from './BidList';
import PositionInformation from './PositionInformation';
import Notifications from './Notifications';
import Inbox from './Inbox';
import Spinner from '../Spinner';

const ProfileDashboard = ({ userProfile, isLoading, assignment, assignmentIsLoading }) => (
  <div className="usa-grid-full user-dashboard">
    {
      (isLoading || assignmentIsLoading) ?
        <Spinner type="homepage-position-results" size="big" />
        :
        <div>
          <div
            className={`usa-width-one-fourth user-dashboard-section-container
              user-dashboard-column-1`}
          >
            <div className="usa-width-one-whole user-dashboard-section current-user-section">
              <CurrentUser userProfile={userProfile} />
            </div>
            <div className="usa-width-one-whole user-dashboard-section cdo-section">
              <CDOInfo />
            </div>
          </div>
          <div
            className={`usa-width-one-fourth user-dashboard-section-container
              user-dashboard-column-2`}
          >
            <div className="usa-width-one-whole user-dashboard-section position-info-section">
              <PositionInformation assignment={assignment} />
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
      }
  </div>
);

ProfileDashboard.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  isLoading: PropTypes.bool.isRequired,
  assignment: PropTypes.shape({}).isRequired,
  assignmentIsLoading: PropTypes.bool.isRequired,
};


export default ProfileDashboard;
