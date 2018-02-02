import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bidListFetchData, toggleBidPosition, routeChangeResetState,
submitBid, acceptBid, declineBid } from '../../actions/bidList';
import { bidTrackerNotificationsFetchData, markNotification } from '../../actions/notifications';
import { BID_LIST, BID_LIST_TOGGLE_HAS_ERRORED, BID_LIST_TOGGLE_SUCCESS, SUBMIT_BID_HAS_ERRORED,
SUBMIT_BID_SUCCESS, EMPTY_FUNCTION, ACCEPT_BID_SUCCESS, ACCEPT_BID_HAS_ERRORED, USER_PROFILE,
DECLINE_BID_SUCCESS, DECLINE_BID_HAS_ERRORED, NOTIFICATION_LIST, MARK_NOTIFICATION_SUCCESS } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import BidTracker from '../../Components/BidTracker';

class BidTrackerContainer extends Component {

  componentWillMount() {
    this.getBidList();
    // reset the alert messages
    this.props.bidListRouteChangeResetState();
    this.props.fetchNotifications();
  }

  getBidList() {
    this.props.fetchBidList();
  }

  render() {
    const { bidList, toggleBid, deleteBid,
      bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
      bidListToggleIsLoading, bidListToggleSuccess, submitBidPosition,
      submitBidHasErrored, submitBidIsLoading, submitBidSuccess,
      acceptBidPosition, acceptBidHasErrored, acceptBidIsLoading, acceptBidSuccess,
      declineBidPosition, declineBidHasErrored, declineBidIsLoading,
      declineBidSuccess, notifications, notificationsIsLoading,
      markNotificationHasErrored, markNotificationIsLoading, markNotificationSuccess,
      markBidTrackerNotification, userProfile, userProfileIsLoading } = this.props;
    return (
      <BidTracker
        toggleBidPosition={toggleBid}
        bidList={bidList}
        bidListHasErrored={bidListHasErrored}
        bidListIsLoading={bidListIsLoading}
        bidListToggleHasErrored={bidListToggleHasErrored}
        bidListToggleIsLoading={bidListToggleIsLoading}
        bidListToggleSuccess={bidListToggleSuccess}
        deleteBid={deleteBid}
        submitBid={submitBidPosition}
        submitBidHasErrored={submitBidHasErrored}
        submitBidIsLoading={submitBidIsLoading}
        submitBidSuccess={submitBidSuccess}
        acceptBid={acceptBidPosition}
        acceptBidHasErrored={acceptBidHasErrored}
        acceptBidIsLoading={acceptBidIsLoading}
        acceptBidSuccess={acceptBidSuccess}
        declineBid={declineBidPosition}
        declineBidHasErrored={declineBidHasErrored}
        declineBidIsLoading={declineBidIsLoading}
        declineBidSuccess={declineBidSuccess}
        notifications={notifications}
        notificationsIsLoading={notificationsIsLoading}
        markNotificationHasErrored={markNotificationHasErrored}
        markNotificationIsLoading={markNotificationIsLoading}
        markNotificationSuccess={markNotificationSuccess}
        markBidTrackerNotification={markBidTrackerNotification}
        userProfile={userProfile}
        userProfileIsLoading={userProfileIsLoading}
      />
    );
  }
}

BidTrackerContainer.propTypes = {
  bidListRouteChangeResetState: PropTypes.func.isRequired,
  fetchBidList: PropTypes.func,
  toggleBid: PropTypes.func,
  deleteBid: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: BID_LIST,
  bidListToggleHasErrored: BID_LIST_TOGGLE_HAS_ERRORED,
  bidListToggleIsLoading: PropTypes.bool,
  bidListToggleSuccess: BID_LIST_TOGGLE_SUCCESS,
  submitBidPosition: PropTypes.func.isRequired,
  submitBidHasErrored: SUBMIT_BID_HAS_ERRORED.isRequired,
  submitBidIsLoading: PropTypes.bool.isRequired,
  submitBidSuccess: SUBMIT_BID_SUCCESS.isRequired,
  acceptBidPosition: PropTypes.func.isRequired,
  acceptBidHasErrored: ACCEPT_BID_HAS_ERRORED.isRequired,
  acceptBidIsLoading: PropTypes.bool.isRequired,
  acceptBidSuccess: ACCEPT_BID_SUCCESS.isRequired,
  declineBidPosition: PropTypes.func.isRequired,
  declineBidHasErrored: DECLINE_BID_HAS_ERRORED.isRequired,
  declineBidIsLoading: PropTypes.bool.isRequired,
  declineBidSuccess: DECLINE_BID_SUCCESS.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  markNotificationHasErrored: PropTypes.bool.isRequired,
  markNotificationIsLoading: PropTypes.bool.isRequired,
  markNotificationSuccess: MARK_NOTIFICATION_SUCCESS,
  markBidTrackerNotification: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
};

BidTrackerContainer.defaultProps = {
  fetchBidList: EMPTY_FUNCTION,
  toggleBid: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
  submitBidPosition: EMPTY_FUNCTION,
  submitBidHasErrored: false,
  submitBidIsLoading: false,
  submitBidSuccess: false,
  acceptBidPosition: EMPTY_FUNCTION,
  acceptBidHasErrored: false,
  acceptBidIsLoading: false,
  acceptBidSuccess: false,
  declineBidPosition: EMPTY_FUNCTION,
  declineBidHasErrored: false,
  declineBidIsLoading: false,
  declineBidSuccess: false,
  notificationsIsLoading: false,
  notifications: { results: [] },
  fetchNotifications: EMPTY_FUNCTION,
  markNotificationHasErrored: false,
  markNotificationIsLoading: false,
  markNotificationSuccess: false,
  markBidTrackerNotification: EMPTY_FUNCTION,
  userProfile: DEFAULT_USER_PROFILE,
  userProfileIsLoading: false,
};

BidTrackerContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
  submitBidHasErrored: state.submitBidHasErrored,
  submitBidIsLoading: state.submitBidIsLoading,
  submitBidSuccess: state.submitBidSuccess,
  acceptBidHasErrored: state.acceptBidHasErrored,
  acceptBidIsLoading: state.acceptBidIsLoading,
  acceptBidSuccess: state.acceptBidSuccess,
  declineBidHasErrored: state.declineBidHasErrored,
  declineBidIsLoading: state.declineBidIsLoading,
  declineBidSuccess: state.declineBidSuccess,
  notifications: state.notifications,
  notificationsIsLoading: state.notificationsIsLoading,
  markNotificationHasErrored: state.markNotificationHasErrored,
  markNotificationIsLoading: state.markNotificationIsLoading,
  markNotificationSuccess: state.markNotificationSuccess,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchBidList: () => dispatch(bidListFetchData()),
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
  bidListRouteChangeResetState: () => dispatch(routeChangeResetState()),
  submitBidPosition: id => dispatch(submitBid(id)),
  acceptBidPosition: id => dispatch(acceptBid(id)),
  declineBidPosition: id => dispatch(declineBid(id)),
  deleteBid: id => dispatch(toggleBidPosition(id, true)),
  // Here, we only want the newest bidding-related notification.
  // We'll perform a client-side check to see if it's unread, as that's would be the only
  // case that we'd display this notification.
  fetchNotifications: () => dispatch(bidTrackerNotificationsFetchData()),
  markBidTrackerNotification: id => dispatch(markNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidTrackerContainer));
