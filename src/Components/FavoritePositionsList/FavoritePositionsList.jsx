import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const FavoritePositionsList = ({ favorites, toggleFavorite, toggleBid,
    bidList, toggleFavoritePositionIsLoading,
    toggleFavoritePositionHasErrored }) => {
  const positionList = favorites.slice().map((p, i) => (
    // use the .usa-end-row class for the last item in each row
    <div key={p.id} className={`usa-width-one-half condensed-card ${(i + 1) % 2 === 0 ? 'usa-end-row' : ''}`}>
      <ResultsCondensedCard
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={toggleFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={toggleFavoritePositionHasErrored}
        position={p}
        toggleBid={toggleBid}
        bidList={bidList}
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
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

export default FavoritePositionsList;
