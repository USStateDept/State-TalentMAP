import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import { favoritePositionsFetchData } from 'actions/favoritePositions';
import { bidListFetchData } from 'actions/bidList';
import { userProfileToggleFavoritePosition } from 'actions/userProfile';
import { POSITION_SEARCH_RESULTS, BID_LIST, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { POSITION_RESULTS_OBJECT } from 'Constants/DefaultProps';
import FavoritePositions from 'Components/FavoritePositions';
import CompareDrawer from 'Components/CompareDrawer';
import { scrollToTop } from 'utilities';

const FavoritePositionsContainer = props => {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const { favoritePositions, favoritePositionsIsLoading, favoritePositionsHasErrored,
    bidList } = props;

  function getFavorites() {
    // props.fetchData(page); TODO: backend needed
    props.fetchData();
  }

  useEffect(() => {
    getFavorites();
    props.bidListFetchData();
  }, []);

  function onToggleFavorite({ id, remove }) {
    props.toggleFavorite(id, remove);
  }

  function onPageChange(e) {
    if (get(e, 'page', 1) !== page) {
      setPage(e.page);
      scrollToTop({ delay: 0, duration: 400 });
      getFavorites();
    }
  }

  function getSortedFavorites(type) {
    if (type.target && type.target.value) {
      props.fetchData(type.target.value);
    }
  }

  return (
    <div>
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
  fetchData: PropTypes.func,
  bidListFetchData: PropTypes.func,
  toggleFavorite: PropTypes.func,
  favoritePositions: POSITION_SEARCH_RESULTS,
  favoritePositionsHasErrored: PropTypes.bool,
  favoritePositionsIsLoading: PropTypes.bool,
  bidList: BID_LIST.isRequired,
};

FavoritePositionsContainer.defaultProps = {
  fetchData: EMPTY_FUNCTION,
  bidListFetchData: EMPTY_FUNCTION,
  toggleFavorite: EMPTY_FUNCTION,
  favoritePositions: POSITION_RESULTS_OBJECT,
  favoritePositionsHasErrored: false,
  favoritePositionsIsLoading: false,
  bidList: { results: [] },
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
  // fetchData: sortType => dispatch(favoritePositionsFetchData(sortType,
  // PAGE_SIZE, page)), TODO: backend needed
  bidListFetchData: () => dispatch(bidListFetchData()),
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
