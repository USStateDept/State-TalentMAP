import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchSimilarPositions } from '../../actions/results';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { bidListFetchData, toggleBidPosition } from '../../actions/bidList';
import { POSITION_SEARCH_RESULTS, USER_PROFILE, BID_LIST, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import HomePagePositionsSection from '../../Components/HomePagePositionsSection';

class Position extends Component {

  componentWillMount() {
    const { fetchSimilarPositions, id } = this.props;
    fetchSimilarPositions(id);
  }

  render() {
    const { title, similarPositions, toggleFavorite, similarPositionsHasErrored,
      userProfile, similarPositionsIsLoading, bidList, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, toggleBid } = this.props;
    return (
      <HomePagePositionsSection
        title={title}
        positions={similarPositions.results}
        toggleFavorite={toggleFavorite}
        favorites={userProfile.favorite_positions}
        isLoading={similarPositionsIsLoading}
        hasErrored={similarPositionsHasErrored}
        bidList={bidList.results}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        toggleBid={toggleBid}
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
  toggleFavorite: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  bidList: BID_LIST,
  userProfileFavoritePositionIsLoading: PropTypes.bool,
  userProfileFavoritePositionHasErrored: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  fetchSimilarPositions: PropTypes.func.isRequired,
};

Position.defaultProps = {
  title: 'Similar Positions',
  similarPositions: { results: [] },
  similarPositionsIsLoading: true,
  similarPositionsHasErrored: false,
  toggleFavorite: EMPTY_FUNCTION,
  userProfile: { favorite_positions: [] },
  bidList: { results: [] },
  userProfileFavoritePositionIsLoading: true,
  userProfileFavoritePositionHasErrored: false,
  toggleBid: EMPTY_FUNCTION,
  fetchSimilarPositions: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
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
  toggleFavorite: (id, remove) => dispatch(userProfileToggleFavoritePosition(id, remove)),
  fetchBidList: () => dispatch(bidListFetchData()),
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Position);
