import { useEffect, useState } from 'react';
import { usePrevious } from 'hooks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get, isEqual, keys } from 'lodash';
import { NumberParam, StringParam, withDefault, withQueryParams } from 'use-query-params';
import { favoritePositionsFetchData } from 'actions/favoritePositions';
import { bidListFetchData } from 'actions/bidList';
import { userProfileToggleFavoritePosition } from 'actions/userProfile';
import { BID_LIST, EMPTY_FUNCTION, FAVORITE_POSITIONS, SetType } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES } from 'Constants/DefaultProps';
import FavoritePositions from 'Components/FavoritePositions';
import CompareDrawer from 'Components/CompareDrawer';
import { scrollToTop } from 'utilities';

const FavoritePositionsContainer = props => {
  const { favoritePositions, favoritePositionsIsLoading, query, setQuery,
    favoritePositionsHasErrored, bidList, userProfileFavoritePositionIsLoading } = props;

  const [called, setCalled] = useState(false);

  const { page, sortType, navType } = query;
  const PAGE_SIZE = 15;

  const prevUserProfileFavoritePositionIsLoading =
    usePrevious(userProfileFavoritePositionIsLoading);

  function getFavorites(nav = navType) {
    props.fetchData(sortType, PAGE_SIZE, page, nav);
  }

  const setPage$ = e => setQuery({ page: e });
  const setSortType$ = e => setQuery({ sortType: e, page: 1 });
  const setNavType$ = e => setQuery({ navType: e, page: 1 });

  useEffect(() => {
    const isNavAll = navType === 'all';
    if (!called ||
      !isEqual(userProfileFavoritePositionIsLoading, prevUserProfileFavoritePositionIsLoading)) {
      if (isNavAll) {
        // on initial page call, grab all favorites
        setCalled(true);
        setQuery({ navType: 'open', page: 1 });
        props.bidListFetchData();
        getFavorites('pv');
        getFavorites('pvTandem');
        getFavorites('openTandem');
      } else {
        // Only fetch all if counts doesn't exist; otherwise fetch selected navType
        let type = 'all';
        if (keys(favoritePositions.counts).length) {
          type = navType;
        }
        setCalled(true);
        props.bidListFetchData();
        getFavorites(type);
      }
    }
  });

  function onToggleFavorite({ id, remove }) {
    props.toggleFavorite(id, remove);
  }

  function onPageChange(e) {
    if (get(e, 'page', 1) !== page) {
      setPage$(e.page);
      scrollToTop({ delay: 0, duration: 400 });
    }
  }

  function selectedNav(navVal) {
    setNavType$(navVal);
  }

  function getSortedFavorites(type) {
    if (type.target && type.target.value) {
      setSortType$(get(type, 'target.value'));
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
        navType={navType}
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
  query: PropTypes.shape({
    page: PropTypes.number,
    sortType: PropTypes.string,
    navType: PropTypes.string,
  }),
  setQuery: PropTypes.func,
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
  query: {},
  setQuery: EMPTY_FUNCTION,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withQueryParams({
    page: withDefault(NumberParam, 1),
    sortType: StringParam,
    navType: withDefault(StringParam, 'all'),
  }, withRouter(
    FavoritePositionsContainer,
  )),
);
