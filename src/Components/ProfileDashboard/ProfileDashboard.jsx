import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, NOTIFICATION_RESULTS, ASSIGNMENT_OBJECT, BID_RESULTS } from '../../Constants/PropTypes';
import CurrentUser from './CurrentUser';
import CDOInfo from './CDOInfo';
import BidList from './BidList';
import PositionInformation from './PositionInformation';
import Notifications from './Notifications';
import Spinner from '../Spinner';
import StaticDevContent from '../StaticDevContent';

const ProfileDashboard = ({ userProfile, isLoading, assignment, assignmentIsLoading, notifications,
  notificationsIsLoading, bidList, bidListIsLoading }) => (
    <div className="usa-grid-full user-dashboard">
      {
        (isLoading || assignmentIsLoading || notificationsIsLoading || bidListIsLoading) ?
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
                <StaticDevContent>
                  <CDOInfo name="Leah Shadtrach" />
                </StaticDevContent>
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
                <Notifications notifications={notifications} />
              </div>
            </div>
            <div
              className={`usa-width-one-half user-dashboard-section-container
                user-dashboard-column-3`}
            >
              <div className="usa-width-one-whole user-dashboard-section bidlist-section">
                <BidList bids={bidList} />
              </div>
            </div>
          </div>
        }
    </div>
);

ProfileDashboard.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  isLoading: PropTypes.bool.isRequired,
  assignment: ASSIGNMENT_OBJECT.isRequired,
  assignmentIsLoading: PropTypes.bool.isRequired,
  notifications: NOTIFICATION_RESULTS.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  bidList: BID_RESULTS.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
};


export default ProfileDashboard;
