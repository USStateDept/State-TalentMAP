import { useState } from 'react';
import PropTypes from 'prop-types';
import ExportButton from 'Components/ExportButton';
import { downloadPositionData } from 'actions/favoritePositions';
import { BID_RESULTS, EMPTY_FUNCTION, FAVORITE_POSITIONS_ARRAY, FAVORITE_POSITION_COUNTS } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES_COUNTS } from 'Constants/DefaultProps';
import { POSITION_SEARCH_SORTS_DYNAMIC, filterPVSorts, filterTandemSorts } from 'Constants/Sort';
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
const TYPE_PV_TANDEM = 'pvTandem';
const TYPE_OPEN_TANDEM = 'openTandem';

const FavoritePositions = props => {
  const [selected, setSelected] = useState(props.navType === 'all' ? TYPE_OPEN : props.navType);
  const [isLoading, setIsLoading] = useState(false);

  const { favorites, favoritesTandem, favoritesPV,
    favoritesPVTandem, favoritePositionsIsLoading,
    favoritePositionsHasErrored, bidList, onSortChange, sortType,
    page, pageSize, counts, onPageChange } = props;

  function getPositions() {
    switch (selected) {
      case TYPE_OPEN:
        return favorites;
      case TYPE_PV:
        return favoritesPV;
      case TYPE_OPEN_TANDEM:
        return favoritesTandem;
      case TYPE_PV_TANDEM:
        return favoritesPVTandem;
      default:
        return favorites;
    }
  }

  function navSelected(s) {
    setSelected(s);
    props.selectedNav(s);
  }

  function exportPositionData() {
    const args = [
      !!(selected === TYPE_PV) || !!(selected === TYPE_PV_TANDEM),
      !!(selected === TYPE_OPEN) || !!(selected === TYPE_OPEN_TANDEM),
      !!(selected === TYPE_PV_TANDEM) || !!(selected === TYPE_OPEN_TANDEM),
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

  // Only show options if the user has favorites for tandem
  if (counts.favoritesTandem || counts.favoritesPVTandem) {
    options.push(
      { title: 'Tandem Open Positions ', value: TYPE_OPEN_TANDEM, numerator: counts.favoritesTandem },
      { title: 'Tandem Projected Vacancies ', value: TYPE_PV_TANDEM, numerator: counts.favoritesPVTandem },
    );
  }

  let selectOptions$ = POSITION_SEARCH_SORTS_DYNAMIC;
  if (selected === TYPE_PV || selected === TYPE_PV_TANDEM) {
    selectOptions$ = filterPVSorts(selectOptions$);
  }
  if (selected === TYPE_OPEN_TANDEM || selected === TYPE_PV_TANDEM) {
    selectOptions$ = filterTandemSorts(selectOptions$);
  }
  selectOptions$ = selectOptions$.options;

  const paginationTotal = {
    open: counts.favorites,
    pv: counts.favoritesPV,
    openTandem: counts.favoritesTandem,
    pvTandem: counts.favoritesPVTandem,
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
        <div className="total-results-container">
          {
            !favoritePositionsIsLoading &&
            <TotalResults
              total={paginationTotal[selected]}
              pageNumber={page}
              pageSize={pageSize}
            />
          }
        </div>
        <div className="favorites-top-section--controls">
          <div className="results-dropdown results-dropdown-sort">
            <SelectForm
              id="sort"
              label="Sort by:"
              onSelectOption={onSortChange}
              options={selectOptions$}
              disabled={favoritePositionsIsLoading}
              defaultSort={sortType}
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
        (
          (!favorites.length && selected === TYPE_OPEN) ||
          (!favoritesPV.length && selected === TYPE_PV) ||
          (!favoritesTandem.length && selected === TYPE_OPEN_TANDEM) ||
          (!favoritesPVTandem.length && selected === TYPE_PV_TANDEM)
        ) && !favoritePositionsIsLoading &&
        <NoFavorites />
      }
      <HomePagePositionsList
        positions={positions}
        favorites={favorites}
        favoritesPV={favoritesPV}
        favoritesTandem={favoritesTandem}
        favoritesPVTandem={favoritesPVTandem}
        bidList={bidList}
        title="favorites"
        maxLength={300}
        refreshFavorites={false}
        showBidListButton
        useShortFavButton
        showCompareButton
        sortType={sortType}
        limit={pageSize}
        page={page}
        isTandem={selected === TYPE_OPEN_TANDEM || selected === TYPE_PV_TANDEM}
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
  favoritesTandem: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  favoritesPVTandem: FAVORITE_POSITIONS_ARRAY,
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
  navType: PropTypes.string,
};

FavoritePositions.defaultProps = {
  favorites: [],
  favoritesTandem: [],
  favoritesPV: [],
  favoritesPVTandem: [],
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  sortType: null,
  page: 1,
  pageSize: 12,
  counts: DEFAULT_FAVORITES_COUNTS,
  onPageChange: EMPTY_FUNCTION,
  selectedNav: EMPTY_FUNCTION,
  navType: TYPE_OPEN,
};

export default FavoritePositions;
