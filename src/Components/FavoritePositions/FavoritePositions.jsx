import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExportButton from 'Components/ExportButton';
import { downloadPositionData } from 'actions/favoritePositions';
import { FAVORITE_POSITIONS_ARRAY, BID_RESULTS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { POSITION_SEARCH_SORTS_DYNAMIC, filterPVSorts } from 'Constants/Sort';
import { checkFlag } from 'flags';
import TotalResults from '../TotalResults';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import SelectForm from '../SelectForm';
import PaginationWrapper from '../PaginationWrapper';
import HomePagePositionsList from '../HomePagePositionsList';
import NoFavorites from '../EmptyListAlert/NoFavorites';
import Nav from './Nav';

const getUsePV = () => checkFlag('flags.projected_vacancy');

const TYPE_PV = 'pv';
const TYPE_OPEN = 'open';
const TYPE_ALL = 'all';

const FavoritePositions = props => {
  const [selected, setSelected] = useState(TYPE_ALL);
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, favoritesPV, favoritePositionsIsLoading,
    favoritePositionsHasErrored, bidList, onSortChange,
    page, pageSize, onPageChange } = props;

  function getPositions() {
    switch (selected) {
      case TYPE_OPEN:
        return favorites;
      case TYPE_PV:
        return favoritesPV;
      default:
        return [...favorites, ...favoritesPV];
    }
  }

  function navSelected(s) {
    setSelected(s);
    props.onPageChange(1);
  }

  function exportPositionData() {
    const args = [
      !!(selected === TYPE_PV),
      !!(selected === TYPE_OPEN),
    ];

    downloadPositionData(...args)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const positions = getPositions();
  let options = [{ title: 'All Favorites', value: TYPE_ALL, numerator: favorites.length + favoritesPV.length }];
  if (getUsePV()) {
    options = [
      ...options,
      { title: 'Open Positions', value: TYPE_OPEN, numerator: favorites.length },
      { title: 'Projected Vacancies', value: TYPE_PV, numerator: favoritesPV.length },
    ];
  }
  let selectOptions$ = POSITION_SEARCH_SORTS_DYNAMIC;
  if (selected === TYPE_PV) {
    selectOptions$ = filterPVSorts(selectOptions$);
  }
  selectOptions$ = selectOptions$.options;

  const paginationTotal = {
    all: favorites.length + favoritesPV.length,
    open: favorites.length,
    pv: favoritesPV.length,
  };

  return (
    <div className={`usa-grid-full favorite-positions-container profile-content-inner-container ${favoritePositionsIsLoading ? 'results-loading' : ''}`}>
      <div className="usa-grid-full favorites-top-section">
        <div className="favorites-title-container">
          <ProfileSectionTitle title="Favorites" icon="star" />
          page:{page} pageSize:{pageSize}
        </div>
      </div>
      <Nav
        options={options}
        onClick={navSelected}
        selected={selected}
        denominator={favorites.length + favoritesPV.length}
      />
      <div className="usa-grid-full favorites-top-section">
        <TotalResults
          total={paginationTotal[selected]}
          pageNumber={page}
          pageSize={pageSize}
        />
        <div className="favorites-top-section--controls">
          <div className="results-dropdown results-dropdown-sort">
            <SelectForm
              id="sort"
              label="Sort by:"
              onSelectOption={onSortChange}
              options={selectOptions$}
              disabled={favoritePositionsIsLoading}
            />
          </div>
          <div className="export-button-container">
            <ExportButton onClick={exportPositionData} isLoading={isLoading} />
          </div>
        </div>
      </div>
      {
        favoritePositionsIsLoading && !favoritePositionsHasErrored &&
            <Spinner type="homepage-position-results" size="big" />
      }
      {
        !favoritePositionsIsLoading && !favorites.length && !favoritesPV.length &&
            <NoFavorites />
      }
      <HomePagePositionsList
        positions={positions}
        favorites={favorites}
        favoritesPV={favoritesPV}
        bidList={bidList}
        title="favorites"
        maxLength={300}
        refreshFavorites
        showBidListButton
        useShortFavButton
        showCompareButton
      />
      <div className="usa-grid-full react-paginate">
        <PaginationWrapper
          pageSize={pageSize}
          forcePage={page}
          onPageChange={onPageChange}
          totalResults={paginationTotal[selected]}
        />
      </div>
    </div>
  );
};

FavoritePositions.propTypes = {
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  favoritePositionsIsLoading: PropTypes.bool,
  favoritePositionsHasErrored: PropTypes.bool,
  bidList: BID_RESULTS.isRequired,
  onSortChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
};

FavoritePositions.defaultProps = {
  favorites: [],
  favoritesPV: [],
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  page: 1,
  pageSize: 12,
  onPageChange: EMPTY_FUNCTION,
};

export default FavoritePositions;
