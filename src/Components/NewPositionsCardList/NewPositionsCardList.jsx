import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';

const NewPositionsCardList = ({ positions, toggleFavorite, favorites, isLoading,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  // we only want to show 5
  const arrayMaxLength = 5;
  // create an initial array with 5 values
  const positionList = Array(arrayMaxLength).fill(null);

  // Form positions into component and add them to array.
  // We want to explicitly call each index of our array
  // since we only want to show 5 results
  positions.forEach((p, i) => {
    if (i < arrayMaxLength) {
      positionList[i] = (
        <div className="usa-width-one-whole condensed-card">
          <ResultsCondensedCard
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            position={p}
          />
        </div>
    );
    }
  });

  return (
    <div className={`usa-grid-full ${isLoading ? 'results-loading' : ''}`}>
      <div className="usa-width-one-third condensed-card-first-big">
        {positionList[0]}
      </div>
      <div className="usa-width-one-third condensed-card-second">
        {positionList[1]}
        {positionList[2]}
      </div>
      <div className="usa-width-one-third condensed-card-third">
        {positionList[3]}
        {positionList[4]}
      </div>
    </div>
  );
};

NewPositionsCardList.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

NewPositionsCardList.defaultProps = {
  positions: [],
  favorites: [],
  isLoading: false,
};

export default NewPositionsCardList;
