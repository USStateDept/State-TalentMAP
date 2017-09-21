import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';

const FavoritePositionsList = ({ favorites, toggleFavorite,
    toggleFavoritePositionIsLoading, toggleFavoritePositionHasErrored }) => {
  const positionList = favorites.slice().map((p, i) => (
    <div key={p.id} className={`usa-width-one-half condensed-card ${(i + 1) % 2 === 0 ? 'usa-end-row' : ''}`}>
      <ResultsCondensedCard
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={toggleFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={toggleFavoritePositionHasErrored}
        position={p}
      />
    </div>
  ));
  return (
    <div className="usa-grid-full positions-section positions-section-new">
      {positionList}
    </div>
  );
};

FavoritePositionsList.propTypes = {
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  toggleFavoritePositionIsLoading: PropTypes.bool.isRequired,
  toggleFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

export default FavoritePositionsList;
