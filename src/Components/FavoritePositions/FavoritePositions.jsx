import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS, BID_RESULTS } from '../../Constants/PropTypes';
import ProfileSectionTitle from '../ProfileSectionTitle';
import FavoritePositionsList from '../FavoritePositionsList';
import Spinner from '../Spinner';

const FavoritePositions = ({ favorites, favoritePositionsIsLoading, favoritePositionsHasErrored,
toggleFavorite, toggleFavoritePositionIsLoading, toggleFavoritePositionHasErrored,
toggleBid, bidList }) => (
  <div className={`usa-grid-full favorite-positions-container profile-content-inner-container ${favoritePositionsIsLoading ? 'results-loading' : null}`}>
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
      toggleBid={toggleBid}
      bidList={bidList}
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
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

FavoritePositions.defaultProps = {
  toggleFavoritePositionIsLoading: false,
  toggleFavoritePositionHasErrored: false,
};

export default FavoritePositions;
