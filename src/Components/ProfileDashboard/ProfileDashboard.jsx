import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, ASSIGNMENT_OBJECT } from '../../Constants/PropTypes';
import UserProfile from './UserProfile';
import PositionInformation from './PositionInformation';
import Spinner from '../Spinner';

const ProfileDashboard = ({ userProfile, isLoading, assignment, assignmentIsLoading,
  notificationsIsLoading, bidListIsLoading }) => (
    <div className="usa-grid-full user-dashboard profile-content-inner-container">
      {
        (isLoading || assignmentIsLoading || notificationsIsLoading || bidListIsLoading) ?
          <Spinner type="homepage-position-results" size="big" />
          :
          <div className="usa-grid-full">
            <div className="hello-greeting">
              {
                `Hello, ${userProfile.user.first_name} ${userProfile.user.last_name}`
              }
            </div>
            <div className="usa-grid-full">
              <div
                className={`usa-width-one-half user-dashboard-section-container
                  user-dashboard-column-1`}
              >
                <div className="usa-width-one-whole user-dashboard-section current-user-section">
                  <UserProfile userProfile={userProfile} />
                </div>
              </div>
              <div
                className={`usa-width-one-half user-dashboard-section-container
                  user-dashboard-column-2`}
              >
                <div className="usa-width-one-whole user-dashboard-section position-info-section">
                  <PositionInformation assignment={assignment} />
                </div>
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
  notificationsIsLoading: PropTypes.bool.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
};

export default ProfileDashboard;
