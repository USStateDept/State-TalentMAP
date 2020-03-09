import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import { bidListFetchData } from '../../actions/bidList';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { POSITION_SEARCH_RESULTS, BID_LIST, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import FavoritePositions from '../../Components/FavoritePositions';
import CompareDrawer from '../../Components/CompareDrawer';
import { scrollToTop } from '../../utilities';

const FavoritePositionsContainer = props => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const { favoritePositions, favoritePositionsIsLoading,
    favoritePositionsHasErrored, bidList } = props;

  function getFavorites() {
    // const { page } = this.state; TODO: backend needed
    // this.props.fetchData(page);
    props.fetchData();
  }

  useEffect(() => {
    console.log('in useEffect');
    getFavorites();
    props.bidListFetchData();
    // passing an empty array bc i want useEffect to run only once, on load
  }, []);

  function onToggleFavorite({ id, remove }) {
    props.toggleFavorite(id, remove);
  }

  function onPageChange(e) {
    setPage(e);
    scrollToTop({ delay: 0, duration: 400 });
    getFavorites();
  }

  function getSortedFavorites(type) {
    if (type.target && type.target.value) {
      // props.fetchData(type.target.value);
    }
  }

  return (
    <div>
      ||{favoritePositionsIsLoading.toString()}||
      <FavoritePositions
        favorites={favoritePositions.favorites}
        favoritesPV={favoritePositions.favoritesPV}
        favoritePositionsIsLoading={favoritePositionsIsLoading}
        favoritePositionsHasErrored={favoritePositionsHasErrored}
        toggleFavorite={onToggleFavorite}
        bidList={bidList.results}
        onSortChange={getSortedFavorites}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
      />
      <CompareDrawer />
    </div>
  );
};

FavoritePositionsContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositions: POSITION_SEARCH_RESULTS,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  bidList: BID_LIST.isRequired,
  bidListFetchData: PropTypes.func.isRequired,
};

FavoritePositionsContainer.defaultProps = {
  favoritePositions: POSITION_RESULTS_OBJECT,
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  bidList: { results: [] },
  bidListFetchData: EMPTY_FUNCTION,
};

FavoritePositionsContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  bidList: state.bidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: sortType => dispatch(favoritePositionsFetchData(sortType)),
  // eslint-disable-next-line max-len
  // fetchData: sortType => dispatch(favoritePositionsFetchData(sortType, PAGE_SIZE, page)), TODO: backend needed
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
  bidListFetchData: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
