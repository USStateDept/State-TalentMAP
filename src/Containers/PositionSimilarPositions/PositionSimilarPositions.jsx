import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchSimilarPositions } from '../../actions/results';
import { bidListFetchData } from '../../actions/bidList';
import { POSITION_SEARCH_RESULTS, USER_PROFILE, BID_LIST, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import HomePagePositionsSection from '../../Components/HomePagePositionsSection';

class Position extends Component {

  componentWillMount() {
    const { fetchSimilarPositions, id } = this.props;
    fetchSimilarPositions(id);
  }

  render() {
    const { title, similarPositions, similarPositionsHasErrored,
      userProfile, similarPositionsIsLoading, bidList } = this.props;
    return (
      <HomePagePositionsSection
        title={title}
        positions={similarPositions.results}
        favorites={userProfile.favorite_positions}
        isLoading={similarPositionsIsLoading}
        hasErrored={similarPositionsHasErrored}
        bidList={bidList.results}
        useSpinner
        wrapInLink={false}
      />
    );
  }
}

Position.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  similarPositions: POSITION_SEARCH_RESULTS,
  similarPositionsIsLoading: PropTypes.bool,
  similarPositionsHasErrored: PropTypes.bool,
  userProfile: USER_PROFILE,
  bidList: BID_LIST,
  fetchSimilarPositions: PropTypes.func.isRequired,
};

Position.defaultProps = {
  title: 'Similar Positions',
  similarPositions: { results: [] },
  similarPositionsIsLoading: true,
  similarPositionsHasErrored: false,
  userProfile: { favorite_positions: [] },
  bidList: { results: [] },
  fetchSimilarPositions: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
  similarPositions: state.similarPositions,
  similarPositionsIsLoading: state.similarPositionsIsLoading,
  similarPositionsHasErrored: state.similarPositionsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchSimilarPositions: id => dispatch(resultsFetchSimilarPositions(id)),
  fetchBidList: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Position);
