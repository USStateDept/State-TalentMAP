import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BID_LIST, EMPTY_FUNCTION, POSITION_SEARCH_RESULTS, USER_PROFILE } from 'Constants/PropTypes';
import { resultsFetchSimilarPositions } from '../../actions/results';
import { bidListFetchData } from '../../actions/bidList';
import HomePagePositionsSection from '../../Components/HomePagePositionsSection';

class Position extends Component {
  UNSAFE_componentWillMount() {
    const { fetchSimilarPositions, id, userProfile, bidList,
      positionDetailsIsLoading } = this.props;
    if (!positionDetailsIsLoading) {
      fetchSimilarPositions(id, userProfile.favorite_positions, bidList.results);
    }
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
  positionDetailsIsLoading: PropTypes.bool,
};

Position.defaultProps = {
  title: 'Similar Positions',
  similarPositions: { results: [] },
  similarPositionsIsLoading: true,
  similarPositionsHasErrored: false,
  userProfile: { favorite_positions: [] },
  bidList: { results: [] },
  fetchSimilarPositions: EMPTY_FUNCTION,
  positionDetailsIsLoading: false,
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
  positionDetailsIsLoading: state.positionDetailsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchSimilarPositions: (id, favorites, bidList) =>
    dispatch(resultsFetchSimilarPositions(id, favorites, bidList)),
  fetchBidList: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Position);
