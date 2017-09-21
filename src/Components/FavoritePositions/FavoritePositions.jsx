import React from 'react';
import PropTypes from 'prop-types';
import FavoritePositionsTitle from '../FavoritePositionsTitle';
import FavoritePositionsList from '../FavoritePositionsList';

const FavoritePositions = ({ favorites, isLoading, hasErrored }) => (
  <div className="explore-section">
    <FavoritePositionsTitle />
    {
      !isLoading && !hasErrored &&
      <FavoritePositionsList favorites={favorites} />
    }
  </div>
);

FavoritePositions.propTypes = {
  favorites: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
};

export default FavoritePositions;
