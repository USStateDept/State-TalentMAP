import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, NOTIFICATION_RESULTS, ASSIGNMENT_OBJECT, BID_RESULTS,
  FAVORITE_POSITIONS_ARRAY, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import UserProfile from './UserProfile';
import BidList from './BidList';
import Notifications from './Notifications';
import Spinner from '../Spinner';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { Row, Column } from '../Layout';
import MediaQueryWrapper from '../MediaQuery';
import Favorites from './Favorites';
import Assignments from './Assignments';
import SavedSearches from './SavedSearches/SavedSearchesWrapper';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import BackButton from '../BackButton';
import BoxShadow from '../BoxShadow';

const ProfileDashboard = ({
  userProfile, isLoading, notifications, assignment, assignmentIsLoading, isPublic,
  notificationsIsLoading, bidList, bidListIsLoading, favoritePositions, favoritePositionsIsLoading,
  submitBidPosition, deleteBid,
}) => (
  <div className="usa-grid-full user-dashboard user-dashboard-main profile-content-inner-container">
    {isLoading || favoritePositionsIsLoading || assignmentIsLoading ||
      notificationsIsLoading ? (
        <Spinner type="homepage-position-results" size="big" />
    ) : (
      <div className="usa-grid-full">
        <div className="usa-grid-full dashboard-top-section">
          { isPublic ? <BackButton /> : <ProfileSectionTitle title={`Hello, ${userProfile.display_name}`} /> }
        </div>
        <MediaQueryWrapper breakpoint="screenLgMin" widthType="max">
          {(matches) => {
            let columns = !matches ? [3, 4, 5] : [6, 6, 12];
            if (isPublic) { columns = !matches ? [4, 8] : [12, 12, 12]; }
            return (
              <Row className="usa-grid-full">
                <Column
                  columns={columns[0]}
                  className={'user-dashboard-section-container user-dashboard-column-1'}
                >
                  <BoxShadow className="usa-width-one-whole user-dashboard-section current-user-section">
                    <UserProfile
                      userProfile={userProfile}
                      assignment={assignment}
                      showEditLink={!isPublic}
                    />
                  </BoxShadow>
                </Column>
                {isPublic ?
                  <div>
                    <Column
                      columns={columns[1]}
                      className="user-dashboard-section-container user-dashboard-column-3"
                    >
                      <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                        <Assignments assignments={userProfile.assignments} />
                      </BoxShadow>
                      <BoxShadow className="usa-width-one-whole user-dashboard-section bidlist-section">
                        <BidList bids={bidList} showMoreLink={!isPublic} />
                      </BoxShadow>
                    </Column>
                  </div>
                  :
                  <div>
                    <Column
                      columns={columns[1]}
                      className={'user-dashboard-section-container user-dashboard-column-2'}
                    >
                      <BoxShadow className="usa-width-one-whole user-dashboard-section notifications-section">
                        <Notifications notifications={notifications} />
                      </BoxShadow>
                      <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                        <SavedSearches />
                      </BoxShadow>
                    </Column>
                    <Column
                      columns={columns[2]}
                      className="user-dashboard-section-container user-dashboard-column-3"
                    >
                      <PermissionsWrapper permissions="bidder">
                        <BoxShadow className="usa-width-one-whole user-dashboard-section bidlist-section">
                          <BidList
                            bids={bidList}
                            showMoreLink={!isPublic}
                            submitBidPosition={submitBidPosition}
                            deleteBid={deleteBid}
                            isLoading={bidListIsLoading}
                          />
                        </BoxShadow>
                      </PermissionsWrapper>
                      <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                        <Favorites favorites={favoritePositions} />
                      </BoxShadow>
                    </Column>
                  </div>}
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
  assignment: ASSIGNMENT_OBJECT,
  assignmentIsLoading: PropTypes.bool,
  notifications: NOTIFICATION_RESULTS,
  notificationsIsLoading: PropTypes.bool,
  bidList: BID_RESULTS,
  bidListIsLoading: PropTypes.bool,
  favoritePositions: FAVORITE_POSITIONS_ARRAY,
  favoritePositionsIsLoading: PropTypes.bool,
  isPublic: PropTypes.bool,
  submitBidPosition: PropTypes.func,
  deleteBid: PropTypes.func,
};

ProfileDashboard.defaultProps = {
  favoritePositions: [],
  isLoading: false,
  assignment: {},
  favoritePositionsIsLoading: false,
  assignmentIsLoading: false,
  notifications: [],
  notificationsIsLoading: false,
  bidList: [],
  bidListIsLoading: false,
  isPublic: false,
  submitBidPosition: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
};

export default ProfileDashboard;
