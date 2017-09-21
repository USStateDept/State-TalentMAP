import React from 'react';
import PropTypes from 'prop-types';
import FavoritePositionsTitle from '../FavoritePositionsTitle';
import FavoritePositionsList from '../FavoritePositionsList';
import Spinner from '../Spinner';

const FavoritePositions = ({ favorites, favoritePositionsIsLoading, favoritePositionsHasErrored,
toggleFavorite }) => (
  <div className={`usa-grid-full favorite-positions-container ${favoritePositionsIsLoading ? 'results-loading' : null}`}>
    <FavoritePositionsTitle />
    {
      favoritePositionsIsLoading && !favoritePositionsHasErrored &&
        <Spinner type="homepage-position-results" size="big" />
    }
    <FavoritePositionsList favorites={favorites.results} toggleFavorite={toggleFavorite} />
  </div>
);

FavoritePositions.propTypes = {
  favorites: PropTypes.arrayOf().isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default FavoritePositions;
