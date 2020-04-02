import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExportButton from 'Components/ExportButton';
import { downloadPositionData } from 'actions/favoritePositions';
import { FAVORITE_POSITIONS_ARRAY, BID_RESULTS, FAVORITE_POSITION_COUNTS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES_COUNTS } from 'Constants/DefaultProps';
import { POSITION_SEARCH_SORTS_DYNAMIC, filterPVSorts } from 'Constants/Sort';
import TotalResults from '../TotalResults';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import SelectForm from '../SelectForm';
import PaginationWrapper from '../PaginationWrapper';
import HomePagePositionsList from '../HomePagePositionsList';
import NoFavorites from '../EmptyListAlert/NoFavorites';
import Nav from './Nav';

const TYPE_PV = 'pv';
const TYPE_OPEN = 'open';

const FavoritePositions = props => {
  const [selected, setSelected] = useState(TYPE_OPEN);
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, favoritesPV, favoritePositionsIsLoading,
    favoritePositionsHasErrored, bidList, onSortChange, sortType,
    page, pageSize, counts, onPageChange } = props;

  function getPositions() {
    switch (selected) {
      case TYPE_OPEN:
        return favorites;
      case TYPE_PV:
        return favoritesPV;
      default:
        return favorites;
    }
  }

  useEffect(() => {
    props.selectedNav(selected);
  }, [selected]);

  function navSelected(s) {
    setSelected(s);
  }

  function exportPositionData() {
    const args = [
      !!(selected === TYPE_PV),
      !!(selected === TYPE_OPEN),
    ];

    setIsLoading(true);
    downloadPositionData(...args)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const positions = getPositions();
  const options = [
    { title: 'Open Positions ', value: TYPE_OPEN, numerator: counts.favorites },
    { title: 'Projected Vacancies ', value: TYPE_PV, numerator: counts.favoritesPV },
  ];

  let selectOptions$ = POSITION_SEARCH_SORTS_DYNAMIC;
  if (selected === TYPE_PV) {
    selectOptions$ = filterPVSorts(selectOptions$);
  }
  selectOptions$ = selectOptions$.options;

  const paginationTotal = {
    open: counts.favorites,
    pv: counts.favoritesPV,
  };

  return (
    <div className={`usa-grid-full favorite-positions-container profile-content-inner-container ${favoritePositionsIsLoading ? 'results-loading' : ''}`}>
      <div className="usa-grid-full favorites-top-section">
        <div className="favorites-title-container">
          <ProfileSectionTitle title="Favorites" icon="star" />
        </div>
      </div>
      <Nav
        options={options}
        onClick={navSelected}
        selected={selected}
        denominator={null}
      />
      <div className="usa-grid-full favorites-top-section">
        {
          !favoritePositionsIsLoading &&
          <TotalResults
            total={paginationTotal[selected]}
            pageNumber={page}
            pageSize={pageSize}
          />
        }
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
        sortType={sortType}
        limit={pageSize}
        page={page}
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
  sortType: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  counts: FAVORITE_POSITION_COUNTS,
  onPageChange: PropTypes.func,
  selectedNav: PropTypes.func,
};

FavoritePositions.defaultProps = {
  favorites: [],
  favoritesPV: [],
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  sortType: null,
  page: 1,
  pageSize: 12,
  counts: DEFAULT_FAVORITES_COUNTS,
  onPageChange: EMPTY_FUNCTION,
  selectedNav: EMPTY_FUNCTION,
};

export default FavoritePositions;
