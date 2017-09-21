import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';

const FavoritePositionsList = ({ favorites, toggleFavorite,
    userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  const positionList = favorites.slice().map((p, i) => (
    <div key={p.id} className={`usa-width-one-third condensed-card ${(i + 1) % 3 === 0 ? 'usa-end-row' : ''}`}>
      <ResultsCondensedCard
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        position={p}
      />
    </div>
  ));
  return (
    <div className="usa-grid-full condensed-card-popular">
      {positionList}
    </div>
  );
};

FavoritePositionsList.propTypes = {
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

export default FavoritePositionsList;
