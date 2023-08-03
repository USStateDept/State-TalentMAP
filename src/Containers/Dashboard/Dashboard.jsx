// ProfilePrivate
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userHasPermissions } from 'utilities';
import { notificationsFetchData } from 'actions/notifications';
import { bidListFetchData, submitBid, toggleBidPosition } from 'actions/bidList';
import { favoritePositionsFetchData } from 'actions/favoritePositions';
import { get } from 'lodash';
import { BID_LIST, CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION, FAVORITE_POSITIONS, NOTIFICATION_LIST, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES, DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import ProfileDashboard from 'Components/ProfileDashboard';
import { fetchClassifications, fetchUserClassifications } from 'actions/classifications';

class DashboardContainer extends Component {
  // DashboardContainer(Dashboard.jsx - this component) is
  // the 'ProfilePrivate' counterpart to ProfilePublic.jsx

  UNSAFE_componentWillMount() {
    this.props.fetchBidList();
    this.props.fetchFavorites();
    this.props.fetchNotifications();
    if (userHasPermissions(['bidder'], get(this.props.userProfile, 'permission_groups', []))) {
      this.props.fetchClassifications();
      this.props.fetchUserClassifications(this.props.userProfile.id);
    }
  }

  render() {
    const { userProfile, userProfileIsLoading,
      notifications, notificationsIsLoading, bidList, bidListIsLoading, favoritePositions,
      favoritePositionsIsLoading, favoritePositionsHasErrored, submitBidPosition,
      deleteBid, classifications, classificationsIsLoading, userClassificationsHasErrored,
      userClassificationsIsLoading, userClassifications } = this.props;
    const allFavorites = (favoritePositions.favorites || [])
      .concat(favoritePositions.favoritesPV || []);

    return (
      <ProfileDashboard
        userProfile={userProfile}
        isLoading={userProfileIsLoading || classificationsIsLoading || userClassificationsIsLoading}
        notifications={notifications.results}
        notificationsIsLoading={notificationsIsLoading}
        bidList={bidList.results}
        bidListIsLoading={bidListIsLoading}
        favoritePositions={allFavorites}
        favoritePositionsIsLoading={favoritePositionsIsLoading}
        favoritePositionsHasErrored={favoritePositionsHasErrored}
        submitBidPosition={submitBidPosition}
        deleteBid={deleteBid}
        classifications={classifications}
        clientClassifications={userClassifications}
        showAgendaItemHistory={false}
        showAssignmentHistory
        showBidTracker
        showClassifications={!userClassificationsHasErrored}
        canEditClassifications={false}
        showLanguages={false}
        showSearchAsClient={false}
      />
    );
  }
}

DashboardContainer.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  favoritePositions: FAVORITE_POSITIONS,
  favoritePositionsIsLoading: PropTypes.bool,
  favoritePositionsHasErrored: PropTypes.bool,
  submitBidPosition: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  classificationsIsLoading: PropTypes.bool,
  classifications: CLASSIFICATIONS,
  userClassificationsHasErrored: PropTypes.bool,
  userClassificationsIsLoading: PropTypes.bool,
  userClassifications: CLIENT_CLASSIFICATIONS,
  fetchBidList: PropTypes.func.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  fetchClassifications: PropTypes.func,
  fetchUserClassifications: PropTypes.func,
};

DashboardContainer.defaultProps = {
  userProfile: DEFAULT_USER_PROFILE,
  userProfileIsLoading: false,
  notificationsIsLoading: false,
  notifications: { results: [] },
  bidList: { results: [] },
  bidListIsLoading: false,
  favoritePositions: DEFAULT_FAVORITES,
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  classificationsIsLoading: true,
  classificationsHasErrored: false,
  classifications: [],
  userClassificationsHasErrored: false,
  userClassificationsIsLoading: true,
  userClassifications: [],
  fetchClassifications: EMPTY_FUNCTION,
  fetchUserClassifications: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  notifications: state.notifications,
  notificationsIsLoading: state.notificationsIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListIsLoading: state.bidListIsLoading,
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  classificationsIsLoading: state.classificationsIsLoading,
  classifications: state.classifications,
  userClassificationsHasErrored: state.userClassificationsHasErrored,
  userClassificationsIsLoading: state.userClassificationsIsLoading,
  userClassifications: state.userClassifications,
});

export const mapDispatchToProps = dispatch => ({
  fetchBidList: () => dispatch(bidListFetchData()),
  fetchFavorites: () => dispatch(favoritePositionsFetchData(null, 5, 1, 'all')),
  fetchNotifications: () => dispatch(notificationsFetchData()),
  deleteBid: id => dispatch(toggleBidPosition(id, true)),
  submitBidPosition: id => dispatch(submitBid(id)),
  fetchClassifications: () => dispatch(fetchClassifications()),
  fetchUserClassifications: id => dispatch(fetchUserClassifications(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
