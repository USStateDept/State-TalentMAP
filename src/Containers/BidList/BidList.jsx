import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import * as bidListActions from '../../actions/bidList';
import * as PROP_TYPES from '../../Constants/PropTypes';
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
    const { bidList, toggleBidPosition,
      bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
      bidListToggleIsLoading, bidListToggleSuccess, submitBid,
      submitBidHasErrored, submitBidIsLoading, submitBidSuccess } = this.props;
    return (
      <div>
        <BidList
          toggleBidPosition={toggleBidPosition}
          bidList={bidList}
          bidListHasErrored={bidListHasErrored}
          bidListIsLoading={bidListIsLoading}
          bidListToggleHasErrored={bidListToggleHasErrored}
          bidListToggleIsLoading={bidListToggleIsLoading}
          bidListToggleSuccess={bidListToggleSuccess}
          submitBid={submitBid}
          submitBidHasErrored={submitBidHasErrored}
          submitBidIsLoading={submitBidIsLoading}
          submitBidSuccess={submitBidSuccess}
        />
      </div>
    );
  }
}

BidListContainer.propTypes = {
  bidListRouteChangeResetState: PropTypes.func.isRequired,
  fetchBidList: PropTypes.func,
  toggleBidPosition: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: PROP_TYPES.BID_LIST,
  bidListToggleHasErrored: PROP_TYPES.BID_LIST_TOGGLE_HAS_ERRORED,
  bidListToggleIsLoading: PropTypes.bool,
  bidListToggleSuccess: PROP_TYPES.BID_LIST_TOGGLE_SUCCESS,
  submitBid: PropTypes.func.isRequired,
  submitBidHasErrored: PROP_TYPES.SUBMIT_BID_HAS_ERRORED.isRequired,
  submitBidIsLoading: PropTypes.bool.isRequired,
  submitBidSuccess: PROP_TYPES.SUBMIT_BID_SUCCESS.isRequired,
};

BidListContainer.defaultProps = {
  fetchBidList: PROP_TYPES.EMPTY_FUNCTION,
  toggleBidPosition: PROP_TYPES.EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
  submitBid: PROP_TYPES.EMPTY_FUNCTION,
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
  onNavigateTo: dest => dispatch(push(dest)),
  fetchBidList: () => dispatch(bidListActions.bidListFetchData()),
  toggleBidPosition: (id, remove) => dispatch(bidListActions.toggleBidPosition(id, remove)),
  bidListRouteChangeResetState: () => dispatch(bidListActions.routeChangeResetState()),
  submitBid: id => dispatch(bidListActions.submitBid(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidListContainer));
