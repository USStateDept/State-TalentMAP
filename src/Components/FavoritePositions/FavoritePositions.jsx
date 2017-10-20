import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS } from '../../Constants/PropTypes';
import ProfileSectionTitle from '../ProfileSectionTitle';
import FavoritePositionsList from '../FavoritePositionsList';
import Spinner from '../Spinner';

const FavoritePositions = ({ favorites, favoritePositionsIsLoading, favoritePositionsHasErrored,
toggleFavorite, toggleFavoritePositionIsLoading, toggleFavoritePositionHasErrored }) => (
  <div className={`usa-grid-full favorite-positions-container ${favoritePositionsIsLoading ? 'results-loading' : null}`}>
    <ProfileSectionTitle title="Your Favorite Positions:" />
    {
      favoritePositionsIsLoading && !favoritePositionsHasErrored &&
        <Spinner type="homepage-position-results" size="big" />
    }
    <FavoritePositionsList
      favorites={favorites.results}
      toggleFavorite={toggleFavorite}
      toggleFavoritePositionIsLoading={toggleFavoritePositionIsLoading}
      toggleFavoritePositionHasErrored={toggleFavoritePositionHasErrored}
    />
  </div>
);

FavoritePositions.propTypes = {
  favorites: POSITION_SEARCH_RESULTS.isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  toggleFavoritePositionIsLoading: PropTypes.bool,
  toggleFavoritePositionHasErrored: PropTypes.bool,
};

FavoritePositions.defaultProps = {
  toggleFavoritePositionIsLoading: false,
  toggleFavoritePositionHasErrored: false,
};

export default FavoritePositions;
