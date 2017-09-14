import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';
import { POSITION_DETAILS_ARRAY } from '../../Constants/PropTypes';

const NewPositionsSection = ({ positions, toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => (

    <div className="usa-grid-full positions-section positions-section-new">
      <PositionsSectionTitle
        title={
          <span className="positions-section-title"><FontAwesome name="flag" />New Positions</span>
        }
        viewMoreLink="/results?ordering=create_date"
      />
      <NewPositionsCardList
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        positions={positions}
      />
    </div>
);

NewPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

export default NewPositionsSection;
