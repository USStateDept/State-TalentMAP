import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS, BID_RESULTS } from '../../Constants/PropTypes';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import SelectForm from '../SelectForm';
import { POSITION_SEARCH_SORTS } from '../../Constants/Sort';
import HomePagePositionsList from '../HomePagePositionsList';
import NoFavorites from '../EmptyListAlert/NoFavorites';

const FavoritePositions = ({ favorites, favoritePositionsIsLoading, favoritePositionsHasErrored,
bidList, onSortChange }) => (
  <div className={`usa-grid-full favorite-positions-container profile-content-inner-container ${favoritePositionsIsLoading ? 'results-loading' : ''}`}>
    <div className="usa-grid-full favorites-top-section">
      <div className="favorites-title-container">
        <ProfileSectionTitle title="Favorites" icon="star" />
      </div>
      <div className="results-dropdown results-dropdown-sort">
        <SelectForm
          id="sort"
          label="Sort by:"
          onSelectOption={onSortChange}
          options={POSITION_SEARCH_SORTS.options}
          disabled={favoritePositionsIsLoading}
        />
      </div>
    </div>
    {
      favoritePositionsIsLoading && !favoritePositionsHasErrored &&
        <Spinner type="homepage-position-results" size="big" />
    }
    {
      !favoritePositionsIsLoading && !favorites.results.length &&
        <NoFavorites />
    }
    <HomePagePositionsList
      positions={favorites.results}
      favorites={favorites.results}
      bidList={bidList}
      title="favorites"
      maxLength={300}
      refreshFavorites
      showBidListButton
      useShortFavButton
      showCompareButton
    />
  </div>
);

FavoritePositions.propTypes = {
  favorites: POSITION_SEARCH_RESULTS.isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  bidList: BID_RESULTS.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default FavoritePositions;
