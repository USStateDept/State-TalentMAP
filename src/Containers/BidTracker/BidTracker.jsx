import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bidListFetchData, toggleBidPosition, routeChangeResetState,
submitBid, acceptBid, declineBid } from '../../actions/bidList';
import { BID_LIST, BID_LIST_TOGGLE_HAS_ERRORED, BID_LIST_TOGGLE_SUCCESS, SUBMIT_BID_HAS_ERRORED,
SUBMIT_BID_SUCCESS, EMPTY_FUNCTION, ACCEPT_BID_SUCCESS, ACCEPT_BID_HAS_ERRORED,
DECLINE_BID_SUCCESS, DECLINE_BID_HAS_ERRORED } from '../../Constants/PropTypes';
import BidTracker from '../../Components/BidTracker';

class BidTrackerContainer extends Component {

  componentWillMount() {
    this.getBidList();
    // reset the alert messages
    this.props.bidListRouteChangeResetState();
  }

  getBidList() {
    this.props.fetchBidList();
  }

  render() {
    const { bidList, toggleBid,
      bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
      bidListToggleIsLoading, bidListToggleSuccess, submitBidPosition,
      submitBidHasErrored, submitBidIsLoading, submitBidSuccess,
      acceptBidPosition, acceptBidHasErrored, acceptBidIsLoading, acceptBidSuccess,
      declineBidPosition, declineBidHasErrored, declineBidIsLoading,
      declineBidSuccess } = this.props;
    return (
      <BidTracker
        toggleBidPosition={toggleBid}
        bidList={bidList}
        bidListHasErrored={bidListHasErrored}
        bidListIsLoading={bidListIsLoading}
        bidListToggleHasErrored={bidListToggleHasErrored}
        bidListToggleIsLoading={bidListToggleIsLoading}
        bidListToggleSuccess={bidListToggleSuccess}
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
      />
    );
  }
}

BidTrackerContainer.propTypes = {
  bidListRouteChangeResetState: PropTypes.func.isRequired,
  fetchBidList: PropTypes.func,
  toggleBid: PropTypes.func,
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
};

BidTrackerContainer.defaultProps = {
  fetchBidList: EMPTY_FUNCTION,
  toggleBid: EMPTY_FUNCTION,
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
});

export const mapDispatchToProps = dispatch => ({
  fetchBidList: () => dispatch(bidListFetchData()),
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
  bidListRouteChangeResetState: () => dispatch(routeChangeResetState()),
  submitBidPosition: id => dispatch(submitBid(id)),
  acceptBidPosition: id => dispatch(acceptBid(id)),
  declineBidPosition: id => dispatch(declineBid(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidTrackerContainer));
