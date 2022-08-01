import PropTypes from 'prop-types';
import { BID_RESULTS, CLASSIFICATIONS, CLIENT_CLASSIFICATIONS,
  EMPTY_FUNCTION, FAVORITE_POSITIONS_ARRAY, NOTIFICATION_RESULTS, USER_PROFILE } from 'Constants/PropTypes';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import SearchAsClientButton from 'Components/BidderPortfolio/SearchAsClientButton/SearchAsClientButton';
import { get, includes } from 'lodash';
import UserProfile from './UserProfile';
import BidList from './BidList';
import Notifications from './Notifications';
import Spinner from '../Spinner';
import ProfileSectionTitle from '../ProfileSectionTitle';
import { Column, Row } from '../Layout';
import MediaQueryWrapper from '../MediaQuery';
import Favorites from './Favorites';
import Assignments from './Assignments';
import SavedSearches from './SavedSearches/SavedSearchesWrapper';
import BackButton from '../BackButton';
import BoxShadow from '../BoxShadow';
import Classifications from './Classifications';
import Languages from './Languages';


const ProfileDashboard = ({
  userProfile, isLoading, notifications, isPublic,
  notificationsIsLoading, bidList, bidListIsLoading, favoritePositions, favoritePositionsIsLoading,
  submitBidPosition, deleteBid, classifications, clientClassifications, registerHandshake,
  showBidTracker, showClassifications, showAssignmentHistory, showSearchAsClient,
  unregisterHandshake, userClassificationsHasErrored, showLanguages,
}) => (
  <div className="usa-grid-full user-dashboard user-dashboard-main profile-content-inner-container">
    {isLoading || favoritePositionsIsLoading ||
      notificationsIsLoading ? (
        <Spinner type="homepage-position-results" size="big" />
      ) : (
        <div className="usa-grid-full">
          <div className="usa-grid-full dashboard-top-section">
            { isPublic ? <BackButton /> : <ProfileSectionTitle title={`Hello, ${userProfile.display_name}`} /> }
            { isPublic && showSearchAsClient &&
              <SearchAsClientButton user={userProfile} />
            }
          </div>
          <MediaQueryWrapper breakpoint="screenLgMin" widthType="max">
            {(matches) => {
              const isBidder = () => includes(get(userProfile, 'permission_groups', []), 'bidder');
              const favoritesContainer = () => (
                <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                  <Favorites favorites={favoritePositions} />
                </BoxShadow>
              );
              let columns = !matches ? [3, 4, 5] : [6, 6, 12];
              if (isPublic) { columns = !matches ? [3, 4, 5] : [12, 12, 12]; }
              return (
                <Row className="usa-grid-full">
                  <Column
                    columns={columns[0]}
                    className={'user-dashboard-section-container user-dashboard-column-1'}
                  >
                    <BoxShadow className="usa-width-one-whole user-dashboard-section current-user-section">
                      <UserProfile
                        userProfile={userProfile}
                        showEditLink={!isPublic}
                        isPublic={isPublic}
                      />
                    </BoxShadow>
                  </Column>
                  {
                    <div>
                      <Column
                        columns={columns[1]}
                        className={'user-dashboard-section-container user-dashboard-column-2'}
                      >
                        {
                          showLanguages &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                            <Languages
                              languagesArray={userProfile.languages}
                            />
                          </BoxShadow>
                        }
                        {
                          !isPublic &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section notifications-section">
                            <Notifications notifications={notifications} />
                          </BoxShadow>
                        }
                        {
                          !isPublic &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                            <SavedSearches />
                          </BoxShadow>
                        }
                        { isPublic && isBidder() && favoritesContainer() }
                        {
                          isPublic && showClassifications && !userClassificationsHasErrored &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                            <Classifications
                              classifications={classifications}
                              clientClassifications={clientClassifications}
                              userId={userProfile.perdet_seq_number}
                              isPublic={isPublic}
                            />
                          </BoxShadow>
                        }
                      </Column>
                      <Column
                        columns={columns[2]}
                        className="user-dashboard-section-container user-dashboard-column-3"
                      >
                        {
                          (!isPublic && showBidTracker) &&
                          <PermissionsWrapper permissions="bidder">
                            <BoxShadow className="usa-width-one-whole user-dashboard-section bidlist-section">
                              <BidList
                                bids={bidList}
                                showMoreLink={!isPublic}
                                submitBidPosition={submitBidPosition}
                                deleteBid={deleteBid}
                                isLoading={bidListIsLoading}
                                registerHandshake={registerHandshake}
                              />
                            </BoxShadow>
                          </PermissionsWrapper>
                        }
                        { !isPublic && !isBidder() && favoritesContainer() }
                        {
                          !isPublic && !userClassificationsHasErrored &&
                          <PermissionsWrapper permissions="bidder">
                            <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                              <Classifications
                                classifications={classifications}
                                clientClassifications={clientClassifications}
                                userId={userProfile.perdet_seq_number}
                                isPublic={isPublic}
                              />
                            </BoxShadow>
                          </PermissionsWrapper>
                        }
                        {
                          (isPublic && showBidTracker) &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section bidlist-section">
                            <BidList
                              bids={bidList}
                              isPublic={isPublic}
                              registerHandshake={registerHandshake}
                              unregisterHandshake={unregisterHandshake}
                              userId={userProfile.perdet_seq_number}
                              deleteBid={deleteBid}
                            />
                          </BoxShadow>
                        }
                        {
                          (showAssignmentHistory) &&
                          <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                            <Assignments assignments={userProfile.assignments} />
                          </BoxShadow>
                        }
                      </Column>
                    </div>
                  }
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
  notifications: NOTIFICATION_RESULTS,
  notificationsIsLoading: PropTypes.bool,
  bidList: BID_RESULTS,
  bidListIsLoading: PropTypes.bool,
  favoritePositions: FAVORITE_POSITIONS_ARRAY,
  favoritePositionsIsLoading: PropTypes.bool,
  isPublic: PropTypes.bool,
  submitBidPosition: PropTypes.func,
  deleteBid: PropTypes.func,
  registerHandshake: PropTypes.func,
  unregisterHandshake: PropTypes.func,
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
  showBidTracker: PropTypes.bool,
  showClassifications: PropTypes.bool,
  showAssignmentHistory: PropTypes.bool,
  showSearchAsClient: PropTypes.bool,
  userClassificationsHasErrored: PropTypes.bool,
  showLanguages: PropTypes.bool,
};

ProfileDashboard.defaultProps = {
  favoritePositions: [],
  isLoading: false,
  favoritePositionsIsLoading: false,
  notifications: [],
  notificationsIsLoading: false,
  bidList: [],
  bidListIsLoading: false,
  isPublic: false,
  submitBidPosition: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
  registerHandshake: EMPTY_FUNCTION,
  unregisterHandshake: EMPTY_FUNCTION,
  classifications: [],
  clientClassifications: [],
  showBidTracker: true,
  showClassifications: true,
  showAssignmentHistory: true,
  showSearchAsClient: true,
  userClassificationsHasErrored: false,
  showLanguages: true,
};

export default ProfileDashboard;
