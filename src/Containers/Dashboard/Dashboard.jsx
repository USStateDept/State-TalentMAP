import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationsFetchData } from 'actions/notifications';
import { bidListFetchData, submitBid, toggleBidPosition } from 'actions/bidList';
import { favoritePositionsFetchData } from 'actions/favoritePositions';
import { BID_LIST, FAVORITE_POSITIONS, NOTIFICATION_LIST, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES, DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import ProfileDashboard from 'Components/ProfileDashboard';

class DashboardContainer extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchNotifications();
    this.props.fetchBidList();
    this.props.fetchFavorites();
  }

  render() {
    const { userProfile, userProfileIsLoading,
      notifications, notificationsIsLoading, bidList, bidListIsLoading, favoritePositions,
      favoritePositionsIsLoading, favoritePositionsHasErrored, submitBidPosition,
      deleteBid } = this.props;
    const allFavorites = favoritePositions.favorites.concat(favoritePositions.favoritesPV);
    return (
      <ProfileDashboard
        userProfile={userProfile}
        isLoading={userProfileIsLoading}
        notifications={notifications.results}
        notificationsIsLoading={notificationsIsLoading}
        bidList={bidList.results}
        bidListIsLoading={bidListIsLoading}
        favoritePositions={allFavorites}
        favoritePositionsIsLoading={favoritePositionsIsLoading}
        favoritePositionsHasErrored={favoritePositionsHasErrored}
        submitBidPosition={submitBidPosition}
        deleteBid={deleteBid}
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
});

export const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(notificationsFetchData()),
  fetchBidList: () => dispatch(bidListFetchData()),
  fetchFavorites: () => dispatch(favoritePositionsFetchData(null, 5, 1, 'all')),
  submitBidPosition: id => dispatch(submitBid(id)),
  deleteBid: id => dispatch(toggleBidPosition(id, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
