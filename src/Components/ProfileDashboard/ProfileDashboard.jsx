import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, NOTIFICATION_RESULTS, ASSIGNMENT_OBJECT, BID_RESULTS,
  FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import UserProfile from './UserProfile';
import BidList from './BidList';
import Notifications from './Notifications';
import Spinner from '../Spinner';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { Row, Column } from '../Layout';
import MediaQueryWrapper from '../MediaQuery';
import Favorites from './Favorites';
import SavedSearches from './SavedSearches/SavedSearchesWrapper';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';

const ProfileDashboard = ({
  userProfile, isLoading, notifications, assignment, assignmentIsLoading,
  notificationsIsLoading, bidList, bidListIsLoading, favoritePositions, favoritePositionsIsLoading,
}) => (
  <div className="usa-grid-full user-dashboard user-dashboard-main profile-content-inner-container">
    {isLoading || favoritePositionsIsLoading || assignmentIsLoading ||
      notificationsIsLoading || bidListIsLoading ? (
        <Spinner type="homepage-position-results" size="big" />
    ) : (
      <div className="usa-grid-full">
        <div className="usa-grid-full dashboard-top-section">
          <ProfileSectionTitle title={`Hello, ${userProfile.display_name}`} />
        </div>
        <MediaQueryWrapper breakpoint="screenSmMax" widthType="max">
          {(matches) => {
            const columns = !matches ? [3, 4, 5] : [12, 12, 12];
            return (
              <Row className="usa-grid-full">
                <Column
                  columns={columns[0]}
                  className={'user-dashboard-section-container user-dashboard-column-1'}
                >
                  <div className="usa-width-one-whole user-dashboard-section current-user-section">
                    <UserProfile userProfile={userProfile} assignment={assignment} />
                  </div>
                </Column>
                <Column
                  columns={columns[1]}
                  className={'user-dashboard-section-container user-dashboard-column-2'}
                >
                  <div className="usa-width-one-whole user-dashboard-section notifications-section">
                    <Notifications notifications={notifications} />
                  </div>
                  <div className="usa-width-one-whole user-dashboard-section favorites-section">
                    <SavedSearches />
                  </div>
                </Column>
                <Column
                  columns={columns[2]}
                  className="user-dashboard-section-container user-dashboard-column-3"
                >
                  <PermissionsWrapper permissions="bidder">
                    <div className="usa-width-one-whole user-dashboard-section bidlist-section">
                      <BidList bids={bidList} />
                    </div>
                  </PermissionsWrapper>
                  <div className="usa-width-one-whole user-dashboard-section favorites-section">
                    <Favorites favorites={favoritePositions} />
                  </div>
                </Column>
              </Row>
            );
          }}
        </MediaQueryWrapper>
      </div>
    )}
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
  favoritePositions: FAVORITE_POSITIONS_ARRAY,
  favoritePositionsIsLoading: PropTypes.bool,
};

ProfileDashboard.defaultProps = {
  favoritePositions: [],
  favoritePositionsIsLoading: false,
};

export default ProfileDashboard;
