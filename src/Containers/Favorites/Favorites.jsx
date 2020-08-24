import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import { usePrevious } from 'hooks';
import { favoritePositionsFetchData } from 'actions/favoritePositions';
import { bidListFetchData } from 'actions/bidList';
import { userProfileToggleFavoritePosition } from 'actions/userProfile';
import { FAVORITE_POSITIONS, BID_LIST, EMPTY_FUNCTION, SetType } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES } from 'Constants/DefaultProps';
import FavoritePositions from 'Components/FavoritePositions';
import CompareDrawer from 'Components/CompareDrawer';
import { scrollToTop } from 'utilities';

const FavoritePositionsContainer = props => {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState();
  const [navType, setNavType] = useState('open');
  const PAGE_SIZE = 15;
  const prevPage = usePrevious(page);

  const { favoritePositions, favoritePositionsIsLoading,
    favoritePositionsHasErrored, bidList, userProfileFavoritePositionIsLoading } = props;

  const prevUserProfileFavoritePositionIsLoading =
    usePrevious(userProfileFavoritePositionIsLoading);

  function getFavorites(nav = navType) {
    props.fetchData(sortType, PAGE_SIZE, page, nav);
  }

  useEffect(() => {
    props.bidListFetchData();
    getFavorites('all');
  }, []);

  useEffect(() => {
    if (prevPage) {
      getFavorites();
    }
  }, [page]);

  useEffect(() => {
    if ((page === 1) && prevPage) { getFavorites(); }
    setPage(1);
  }, [navType]);

  useEffect(() => {
    if ((page === 1) && prevPage) { getFavorites(); }
    setPage(1);
  }, [sortType]);

  useEffect(() => {
    if (get(prevUserProfileFavoritePositionIsLoading, 'size', 0)
      // eslint-disable-next-line react/prop-types
      && !get(userProfileFavoritePositionIsLoading, 'size', 0)) {
      setPage(1);
      getFavorites();
    }
  }, [userProfileFavoritePositionIsLoading]);

  function onToggleFavorite({ id, remove }) {
    props.toggleFavorite(id, remove);
  }

  function onPageChange(e) {
    if (get(e, 'page', 1) !== page) {
      setPage(e.page);
      scrollToTop({ delay: 0, duration: 400 });
    }
  }

  function selectedNav(navVal) {
    setNavType(navVal);
  }

  function getSortedFavorites(type) {
    if (type.target && type.target.value) {
      setSortType(get(type, 'target.value'));
    }
  }

  return (
    <div>
      <FavoritePositions
        favorites={favoritePositions.favorites}
        favoritesPV={favoritePositions.favoritesPV}
        favoritesTandem={favoritePositions.favoritesTandem}
        favoritesPVTandem={favoritePositions.favoritesPVTandem}
        favoritePositionsIsLoading={favoritePositionsIsLoading}
        favoritePositionsHasErrored={favoritePositionsHasErrored}
        toggleFavorite={onToggleFavorite}
        bidList={bidList.results}
        onSortChange={getSortedFavorites}
        sortType={sortType}
        page={page}
        pageSize={PAGE_SIZE}
        counts={favoritePositions.counts}
        onPageChange={onPageChange}
        selectedNav={selectedNav}
      />
      <CompareDrawer />
    </div>
  );
};

FavoritePositionsContainer.propTypes = {
  fetchData: PropTypes.func,
  bidListFetchData: PropTypes.func,
  toggleFavorite: PropTypes.func,
  favoritePositions: FAVORITE_POSITIONS,
  favoritePositionsHasErrored: PropTypes.bool,
  favoritePositionsIsLoading: PropTypes.bool,
  bidList: BID_LIST.isRequired,
  userProfileFavoritePositionIsLoading: SetType,
};

FavoritePositionsContainer.defaultProps = {
  fetchData: EMPTY_FUNCTION,
  bidListFetchData: EMPTY_FUNCTION,
  toggleFavorite: EMPTY_FUNCTION,
  favoritePositions: DEFAULT_FAVORITES,
  favoritePositionsHasErrored: false,
  favoritePositionsIsLoading: false,
  bidList: { results: [] },
  userProfileFavoritePositionIsLoading: new Set(),
};

FavoritePositionsContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  bidList: state.bidListFetchDataSuccess,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: (sortType, PAGE_SIZE, page, navType) =>
    dispatch(favoritePositionsFetchData(sortType, PAGE_SIZE, page, navType)),
  bidListFetchData: () => dispatch(bidListFetchData()),
  toggleFavorite: (id, remove, isTandem) => {
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, false, isTandem));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FavoritePositionsContainer));
