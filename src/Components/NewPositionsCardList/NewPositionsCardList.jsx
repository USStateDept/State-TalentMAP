import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCard from '../ResultsCondensedCard';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const NewPositionsCardList = ({ positions, toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  const positionList = [];

  // Form positions into component and push them to array.
  // We want to explicitly call each index of our array
  // since we only want to show 5 results
  positions.forEach((p) => {
    positionList.push(
      <div className="usa-width-one-whole condensed-card">
        <ResultsCondensedCard
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          position={p}
        />
      </div>,
    );
  });

  return (
    <div className="usa-grid-full">
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
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

NewPositionsCardList.defaultProps = {
  positions: [],
};

export default NewPositionsCardList;
