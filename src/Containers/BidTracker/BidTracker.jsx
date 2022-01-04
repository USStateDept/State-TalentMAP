import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { find, get } from 'lodash';
import { acceptBid, bidListFetchData, declineBid,
  routeChangeResetState, submitBid, toggleBidPosition,
} from 'actions/bidList';
import { registerHandshake, unregisterHandshake } from 'actions/handshake';
import { userProfilePublicFetchData } from 'actions/userProfilePublic';
import { bidTrackerNotificationsFetchData, markNotification } from 'actions/notifications';
import { ACCEPT_BID_HAS_ERRORED, ACCEPT_BID_SUCCESS, BID_LIST, BID_LIST_TOGGLE_HAS_ERRORED,
  BID_LIST_TOGGLE_SUCCESS, DECLINE_BID_HAS_ERRORED, DECLINE_BID_SUCCESS, EMPTY_FUNCTION,
  MARK_NOTIFICATION_SUCCESS, NOTIFICATION_LIST, REGISTER_HANDSHAKE_HAS_ERRORED,
  REGISTER_HANDSHAKE_SUCCESS, SUBMIT_BID_HAS_ERRORED, SUBMIT_BID_SUCCESS,
  UNREGISTER_HANDSHAKE_HAS_ERRORED, UNREGISTER_HANDSHAKE_SUCCESS,
  USER_PROFILE,
} from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import BidTracker from 'Components/BidTracker';

const STATUS = 'status';
const CREATED = 'bidlist_create_date';
const LOCATION = 'bidlist_location';
const REVERSE_STATUS = '-status';
// const TED = 'position.ted'; TODO - add

const SORT_OPTIONS = [
  { value: STATUS, text: 'Active Bids', defaultSort: true },
  { value: REVERSE_STATUS, text: 'Inactive Bids' },
  { value: CREATED, text: 'Creation date' },
  { value: LOCATION, text: 'City name (A-Z)' },
  // { value: TED, text: 'TED' }, TODO - add
];

const defaultSort = find(SORT_OPTIONS, f => f.defaultSort).value;

class BidTrackerContainer extends Component {
  UNSAFE_componentWillMount() {
    this.getBidList$ = this.getBidList$.bind(this);
    const { isPublic } = this.props;
    this.getBidList$();
    if (!isPublic) {
      this.props.fetchNotifications();
    }
    // reset the alert messages
    this.props.bidListRouteChangeResetState();
    this.state = {
      hasScrolled: false,
    };
  }

  componentDidUpdate() {
    const { match: { params } } = this.props;
    if (params.bid) {
      this.scrollToId(params.bid);
    }
  }

  getBidList(sort) {
    this.props.fetchBidList(sort);
  }

  getPublicBidList(id, sort) {
    this.props.fetchUserData(id, sort);
  }

  getBidList$(sort = defaultSort) {
    const { isPublic } = this.props;
    if (isPublic) {
      const { match: { params: { id } } } = this.props;
      this.getPublicBidList(id, sort);
    } else {
      this.getBidList(sort);
      this.props.fetchNotifications();
    }
  }

  // Scroll to the bid provided by route id.
  // Only perform once.
  scrollToId(id) {
    const el = document.querySelector(`#bid-${id}`);
    if (el && !this.state.hasScrolled) {
      el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
      if (!this.state.hasScrolled) {
        this.setState({ hasScrolled: true });
      }
    }
  }

  render() {
    const { bidList, deleteBid, isPublic,
      bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
      bidListToggleSuccess, submitBidPosition,
      submitBidHasErrored, submitBidIsLoading, submitBidSuccess,
      acceptBidPosition, acceptBidHasErrored, acceptBidIsLoading, acceptBidSuccess,
      declineBidPosition, declineBidHasErrored, declineBidIsLoading,
      declineBidSuccess, notifications, notificationsIsLoading,
      markNotificationHasErrored, markNotificationIsLoading, markNotificationSuccess,
      markBidTrackerNotification, userProfile, userProfileIsLoading,
      userProfilePublic, userProfilePublicIsLoading, userProfilePublicHasErrored,
      registerHandshakePosition, registerHandshakeHasErrored,
      registerHandshakeIsLoading, registerHandshakeSuccess,
      unregisterHandshakeHasErrored, unregisterHandshakeSuccess,
      unregisterHandshakePosition, unregisterHandshakeIsLoading,
      acceptHandshakeHasErrored, acceptHandshakeIsLoading,
      acceptHandshakeSuccess, declineHandshakeHasErrored,
      declineHandshakeIsLoading, declineHandshakeSuccess,
    } = this.props;

    const bidList$ = isPublic ? { results: userProfilePublic.bidList } : bidList;
    const bidListHasErrored$ = isPublic ? userProfilePublicHasErrored : bidListHasErrored;
    const bidListIsLoading$ = isPublic ? userProfilePublicIsLoading : bidListIsLoading;
    const userProfile$ = isPublic ? userProfilePublic : userProfile;
    const userProfileIsLoading$ = isPublic ? userProfilePublicIsLoading : userProfileIsLoading;

    const useCDOView = get(userProfile, 'is_cdo') && isPublic && !userProfileIsLoading;

    return (
      <BidTracker
        bidList={bidList$}
        bidListHasErrored={bidListHasErrored$}
        bidListIsLoading={bidListIsLoading$}
        bidListToggleHasErrored={bidListToggleHasErrored}
        bidListToggleSuccess={bidListToggleSuccess}
        deleteBid={deleteBid}
        registerHandshake={registerHandshakePosition}
        registerHandshakeHasErrored={registerHandshakeHasErrored}
        registerHandshakeIsLoading={registerHandshakeIsLoading}
        registerHandshakeSuccess={registerHandshakeSuccess}
        unregisterHandshake={unregisterHandshakePosition}
        unregisterHandshakeHasErrored={unregisterHandshakeHasErrored}
        unregisterHandshakeIsloading={unregisterHandshakeIsLoading}
        unregisterHandshakeSuccess={unregisterHandshakeSuccess}
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
        userProfile={userProfile$}
        userProfileIsLoading={userProfileIsLoading$}
        isPublic={isPublic}
        useCDOView={useCDOView}
        acceptHandshakeHasErrored={acceptHandshakeHasErrored}
        acceptHandshakeIsLoading={acceptHandshakeIsLoading}
        acceptHandshakeSuccess={acceptHandshakeSuccess}
        declineHandshakeHasErrored={declineHandshakeHasErrored}
        declineHandshakeIsLoading={declineHandshakeIsLoading}
        declineHandshakeSuccess={declineHandshakeSuccess}
        sortOptions={SORT_OPTIONS}
        onSortChange={this.getBidList$}
        defaultSort={defaultSort}
      />
    );
  }
}

BidTrackerContainer.propTypes = {
  bidListRouteChangeResetState: PropTypes.func.isRequired,
  isPublic: PropTypes.bool,
  fetchBidList: PropTypes.func,
  fetchUserData: PropTypes.func,
  deleteBid: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: BID_LIST,
  bidListToggleHasErrored: BID_LIST_TOGGLE_HAS_ERRORED,
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
  registerHandshakePosition: PropTypes.func.isRequired,
  registerHandshakeHasErrored: REGISTER_HANDSHAKE_HAS_ERRORED.isRequired,
  registerHandshakeSuccess: REGISTER_HANDSHAKE_SUCCESS.isRequired,
  registerHandshakeIsLoading: PropTypes.bool.isRequired,
  unregisterHandshakePosition: PropTypes.func.isRequired,
  unregisterHandshakeHasErrored: UNREGISTER_HANDSHAKE_HAS_ERRORED.isRequired,
  unregisterHandshakeSuccess: UNREGISTER_HANDSHAKE_SUCCESS.isRequired,
  unregisterHandshakeIsLoading: PropTypes.bool.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  markNotificationHasErrored: PropTypes.bool.isRequired,
  markNotificationIsLoading: PropTypes.bool.isRequired,
  markNotificationSuccess: MARK_NOTIFICATION_SUCCESS,
  markBidTrackerNotification: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  userProfilePublic: USER_PROFILE,
  userProfilePublicIsLoading: PropTypes.bool,
  userProfilePublicHasErrored: PropTypes.bool,
  acceptHandshakeHasErrored: PropTypes.bool,
  acceptHandshakeIsLoading: PropTypes.bool,
  acceptHandshakeSuccess: PropTypes.bool,
  declineHandshakeHasErrored: PropTypes.bool,
  declineHandshakeIsLoading: PropTypes.bool,
  declineHandshakeSuccess: PropTypes.bool,
};

BidTrackerContainer.defaultProps = {
  fetchBidList: EMPTY_FUNCTION,
  isPublic: false,
  fetchUserData: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
  registerHandshakePosition: EMPTY_FUNCTION,
  registerHandshakeHasErrored: false,
  registerHandshakeSuccess: false,
  registerHandshakeIsLoading: false,
  unregisterHandshakeHasErrored: false,
  unregisterHandshakeSuccess: false,
  unregisterHandshakeIsLoading: false,
  unregisterHandshakePosition: EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
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
  userProfilePublic: DEFAULT_USER_PROFILE,
  userProfilePublicIsLoading: false,
  userProfilePublicHasErrored: false,
  match: { params: {} },
  acceptHandshakeHasErrored: false,
  acceptHandshakeIsLoading: false,
  acceptHandshakeSuccess: false,
  declineHandshakeHasErrored: false,
  declineHandshakeIsLoading: false,
  declineHandshakeSuccess: false,
};

BidTrackerContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
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
  registerHandshakeHasErrored: state.registerHandshakeHasErrored,
  registerHandshakeIsLoading: state.registerHandshakeIsLoading,
  registerHandshakeSuccess: state.registerHandshakeSuccess,
  unregisterHandshakeHasErrored: state.unregisterHandshakeHasErrored,
  unregisterHandshakeIsLoading: state.unregisterHandshakeIsLoading,
  unregisterHandshakeSuccess: state.unregisterHandshakeSuccess,
  notifications: state.notifications,
  notificationsIsLoading: state.notificationsIsLoading,
  markNotificationHasErrored: state.markNotificationHasErrored,
  markNotificationIsLoading: state.markNotificationIsLoading,
  markNotificationSuccess: state.markNotificationSuccess,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  userProfilePublic: state.userProfilePublic,
  userProfilePublicIsLoading: state.userProfilePublicIsLoading,
  userProfilePublicHasErrored: state.userProfilePublicHasErrored,
  acceptHandshakeHasErrored: state.acceptHandshakeHasErrored,
  acceptHandshakeIsLoading: state.acceptHandshakeIsLoading,
  acceptHandshakeSuccess: state.acceptHandshakeSuccess,
  declineHandshakeHasErrored: state.declineHandshakeHasErrored,
  declineHandshakeIsLoading: state.declineHandshakeIsLoading,
  declineHandshakeSuccess: state.declineHandshakeSuccess,
});

export const mapDispatchToProps = (dispatch, ownProps) => {
  const isPublic = get(ownProps, 'isPublic');
  const id$ = get(ownProps, 'match.params.id');
  let config = {
    fetchUserData: (id, sort) => dispatch(userProfilePublicFetchData(id, false, true, sort)),
    fetchBidList: (sort) => dispatch(bidListFetchData(sort)),
    bidListRouteChangeResetState: () => dispatch(routeChangeResetState()),
    // Here, we only want the newest bidding-related notification.
    // We'll perform a client-side check to see if it's unread, as that's would be the only
    // case that we'd display this notification.
    fetchNotifications: () => dispatch(bidTrackerNotificationsFetchData()),
    markBidTrackerNotification: id => dispatch(markNotification(id)),
  };
  // Different configs based on whether this is the public view or not
  if (!isPublic) {
    config = {
      ...config,
      submitBidPosition: id => dispatch(submitBid(id)),
      acceptBidPosition: id => dispatch(acceptBid(id)),
      declineBidPosition: id => dispatch(declineBid(id)),
      deleteBid: id => dispatch(toggleBidPosition(id, true, false, false, true)),
    };
  } else {
    config = {
      ...config,
      submitBidPosition: id => dispatch(submitBid(id, id$)),
      acceptBidPosition: id => dispatch(acceptBid(id, id$)),
      declineBidPosition: id => dispatch(declineBid(id, id$)),
      registerHandshakePosition: id => dispatch(registerHandshake(id, id$)),
      unregisterHandshakePosition: id => dispatch(unregisterHandshake(id, id$)),
      deleteBid: id => dispatch(toggleBidPosition(id, true, false, id$, true)),
    };
  }
  return config;
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidTrackerContainer));
