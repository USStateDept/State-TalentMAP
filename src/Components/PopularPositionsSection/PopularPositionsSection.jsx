import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import PopularPositionsCardList from '../PopularPositionsCardList';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const PopularPositionsSection = ({ positions, toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => (
    <div className="usa-grid-full positions-section positions-section-popular">
      <PositionsSectionTitle
        title={
          <span className="positions-section-title">
            <FontAwesome name="gratipay" />
            Popular Positions
          </span>
        }
        viewMoreLink="/results"
      />
      <PopularPositionsCardList
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        positions={positions}
      />
    </div>
);

PopularPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

export default PopularPositionsSection;
