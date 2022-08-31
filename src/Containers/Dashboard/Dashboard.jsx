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
import { checkFlag } from '../../flags';

class DashboardContainer extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchNotifications();
    this.props.fetchBidList();
    this.props.fetchFavorites();
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
        userClassificationsHasErrored={userClassificationsHasErrored}
        showClassifications
        showLanguages={false}
        showAssignmentHistory={false}
      />
    );
  }
}

DashboardContainer.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  fetchBidList: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
  favoritePositions: FAVORITE_POSITIONS,
  favoritePositionsIsLoading: PropTypes.bool,
  favoritePositionsHasErrored: PropTypes.bool,
  submitBidPosition: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  fetchClassifications: PropTypes.func,
  classificationsIsLoading: PropTypes.bool,
  classifications: CLASSIFICATIONS,
  fetchUserClassifications: PropTypes.func,
  userClassificationsHasErrored: PropTypes.bool,
  userClassificationsIsLoading: PropTypes.bool,
  userClassifications: CLIENT_CLASSIFICATIONS,
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
  fetchClassifications: EMPTY_FUNCTION,
  classificationsIsLoading: true,
  classificationsHasErrored: false,
  classifications: [],
  fetchUserClassifications: EMPTY_FUNCTION,
  userClassificationsHasErrored: false,
  userClassificationsIsLoading: true,
  userClassifications: [],
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
  fetchNotifications: () => dispatch(notificationsFetchData()),
  fetchBidList: () => dispatch(bidListFetchData()),
  fetchFavorites: () => dispatch(favoritePositionsFetchData(null, 5, 1, 'all')),
  submitBidPosition: id => dispatch(submitBid(id)),
  deleteBid: id => dispatch(toggleBidPosition(id, true)),
  fetchClassifications: () => dispatch(fetchClassifications()),
  fetchUserClassifications: id => dispatch(fetchUserClassifications(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
