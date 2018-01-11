import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bidStatisticsFetchData } from '../../actions/bidStatistics';
import { BID_STATISTICS_OBJECT } from '../../Constants/PropTypes';
import BidStatistics from '../../Components/BidStatistics';

class BidStatisticsContainer extends Component {

  componentWillMount() {
    this.getBidStats();
  }

  getBidStats() {
    this.props.fetchBidStatistics();
  }

  render() {
    const { bidStatistics, bidStatisticsIsLoading, bidStatisticsHasErrored } = this.props;
    return (
      <BidStatistics
        bidStats={bidStatistics}
        isLoading={bidStatisticsIsLoading}
        hasErrored={bidStatisticsHasErrored}
      />
    );
  }
}

BidStatisticsContainer.propTypes = {
  bidStatistics: BID_STATISTICS_OBJECT.isRequired,
  bidStatisticsIsLoading: PropTypes.bool,
  bidStatisticsHasErrored: PropTypes.bool,
  fetchBidStatistics: PropTypes.func.isRequired,
};

BidStatisticsContainer.defaultProps = {
  bidStatistics: {},
  bidStatisticsIsLoading: false,
  bidStatisticsHasErrored: false,
};

const mapStateToProps = state => ({
  bidStatistics: state.bidStatistics,
  bidStatisticsIsLoading: state.bidStatisticsIsLoading,
  bidStatisticsHasErrored: state.bidStatisticsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchBidStatistics: () => dispatch(bidStatisticsFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidStatisticsContainer);
