import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bidListFetchData, toggleBidPosition, routeChangeResetState,
submitBid } from '../../actions/bidList';
import { BID_LIST, BID_LIST_TOGGLE_HAS_ERRORED, BID_LIST_TOGGLE_SUCCESS, SUBMIT_BID_HAS_ERRORED,
SUBMIT_BID_SUCCESS, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import BidList from '../../Components/BidList';

class BidListContainer extends Component {

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
      submitBidHasErrored, submitBidIsLoading, submitBidSuccess } = this.props;
    return (
      <BidList
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
      />
    );
  }
}

BidListContainer.propTypes = {
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
};

BidListContainer.defaultProps = {
  fetchBidList: EMPTY_FUNCTION,
  toggleBid: EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
  submitBid: EMPTY_FUNCTION,
  submitBidHasErrored: false,
  submitBidIsLoading: false,
  submitBidSuccess: false,
};

BidListContainer.contextTypes = {
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
});

const mapDispatchToProps = dispatch => ({
  fetchBidList: () => dispatch(bidListFetchData()),
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
  bidListRouteChangeResetState: () => dispatch(routeChangeResetState()),
  submitBidPosition: id => dispatch(submitBid(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidListContainer));
