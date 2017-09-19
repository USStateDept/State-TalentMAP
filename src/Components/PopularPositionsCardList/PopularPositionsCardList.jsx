import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';

const PopularPositionsCardList = ({ positions, toggleFavorite, favorites, isLoading,
    userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  const positionList = positions.slice().map(p => (
    <div key={p.id} className="usa-width-one-third condensed-card">
      <ResultsCondensedCard
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        type="popular"
        position={p}
      />
    </div>
  ));
  return (
    <div className={`usa-grid-full condensed-card-popular ${isLoading ? 'results-loading' : ''}`}>
      {positionList}
    </div>
  );
};

PopularPositionsCardList.propTypes = {
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

PopularPositionsCardList.defaultProps = {
  positions: [],
  favorites: [],
  isLoading: false,
};

export default PopularPositionsCardList;
