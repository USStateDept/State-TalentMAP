import PropTypes from 'prop-types';
import { BID_RESULTS, CLASSIFICATIONS, CLIENT_CLASSIFICATIONS,
  EMPTY_FUNCTION, FAVORITE_POSITIONS_ARRAY, NOTIFICATION_RESULTS, USER_PROFILE } from 'Constants/PropTypes';
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
import AgendaItemHistoryLink from './AgendaItemHistoryLink';

const ProfileDashboard = ({
  userProfile, isLoading, notifications, isPublic,
  notificationsIsLoading, bidList, bidListIsLoading, favoritePositions, favoritePositionsIsLoading,
  submitBidPosition, deleteBid, classifications, clientClassifications, registerHandshake,
  showBidTracker, showClassifications, showAssignmentHistory, showSearchAsClient,
  unregisterHandshake, showLanguages, canEditClassifications,
  showAgendaItemHistory, isAOView,
}) => (
  // Updating document ABC is a criterion for PRs
  // that make content display updates to this file
  // perfect js Docs candidate?
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
              const checkIsBidder = () => includes(userProfile?.permission_groups || [], 'bidder') || includes(userProfile?.permissions || [], 'bidder');
              const isBidder = checkIsBidder();
              const perdet = get(userProfile, 'perdet_seq_number') || '';
              const userRole = isAOView ? 'ao' : 'cdo';
              const favoritesContainer = () => (
                <BoxShadow className="usa-width-one-whole user-dashboard-section favorites-section">
                  <Favorites favorites={favoritePositions} />
                </BoxShadow>
              );
              // this determines the width of our columns, not their content
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
                        isPublic={isPublic}
                      />
                    </BoxShadow>
                  </Column>
                  <Column
                    columns={columns[1]}
                    className={'user-dashboard-section-container user-dashboard-column-2'}
                  >
                    {
                      showLanguages &&
                      <BoxShadow className="usa-width-one-whole user-dashboard-section">
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
                    { !isPublic && isBidder && favoritesContainer() }
                    {
                      isPublic && showClassifications &&
                      <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                        <Classifications
                          classifications={classifications}
                          clientClassifications={clientClassifications}
                          userId={userProfile.perdet_seq_number}
                          isPublic={isPublic}
                          canEditClassifications={canEditClassifications}
                        />
                      </BoxShadow>
                    }
                  </Column>
                  <Column
                    columns={columns[2]}
                    className="user-dashboard-section-container user-dashboard-column-3"
                  >
                    {
                      !isPublic && isBidder &&
                        <BoxShadow className="usa-width-one-whole user-dashboard-section bidlist-section">
                          <BidList
                            bids={bidList}
                            submitBidPosition={submitBidPosition}
                            deleteBid={deleteBid}
                            isLoading={bidListIsLoading}
                            registerHandshake={registerHandshake}
                          />
                        </BoxShadow>
                    }
                    { !isPublic && !isBidder && favoritesContainer() }
                    {
                      !isPublic && isBidder &&
                      <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                        <Classifications
                          classifications={classifications}
                          clientClassifications={clientClassifications}
                          userId={userProfile.perdet_seq_number}
                          isPublic={isPublic}
                        />
                      </BoxShadow>
                    }
                    {
                      isPublic && showBidTracker &&
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
                      isPublic && showAgendaItemHistory &&
                      <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                        <AgendaItemHistoryLink perdet={perdet} userRole={userRole} />
                      </BoxShadow>
                    }
                    {
                      showAssignmentHistory &&
                      <BoxShadow className="usa-width-one-whole user-dashboard-section assignments-section">
                        <Assignments assignments={userProfile.assignments} />
                      </BoxShadow>
                    }
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
  showBidTracker: PropTypes.bool.isRequired,
  showSearchAsClient: PropTypes.bool.isRequired,
  showLanguages: PropTypes.bool.isRequired,
  showClassifications: PropTypes.bool.isRequired,
  canEditClassifications: PropTypes.bool.isRequired,
  showAgendaItemHistory: PropTypes.bool.isRequired,
  showAssignmentHistory: PropTypes.bool.isRequired,
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
  isAOView: PropTypes.bool,
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
  isAOView: false,
};

export default ProfileDashboard;
