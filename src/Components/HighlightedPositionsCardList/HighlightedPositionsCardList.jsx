import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const HighlightedPositionsCardList = ({ positions, toggleFavorite, favorites, isLoading,
    userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored, toggleBid,
    bidList }) => {
  // we only want to show 3
  const arrayMaxLength = 3;
  // create an initial array with x values
  const positionList = Array(arrayMaxLength).fill(null);

  // Form positions into component and add them to array.
  // We want to explicitly call each index of our array
  // since we only want to show x results
  positions.forEach((p, i) => {
    if (i < arrayMaxLength) {
      positionList[i] = (
        <div className="usa-width-one-third condensed-card">
          <ResultsCondensedCard
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            position={p}
            toggleBid={toggleBid}
            bidList={bidList}
          />
        </div>
    );
    }
  });
  return (
    <div className={`usa-grid-full condensed-card-highlighted ${isLoading ? 'results-loading' : ''}`}>
      <div className="usa-grid-full">
        {positionList[0]}
        {positionList[1]}
        {positionList[2]}
      </div>
    </div>
  );
};

HighlightedPositionsCardList.propTypes = {
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

HighlightedPositionsCardList.defaultProps = {
  positions: [],
  favorites: [],
  isLoading: false,
};

export default HighlightedPositionsCardList;
