import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import NewPositionsCardList from '../NewPositionsCardList';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const NewPositionsSection = ({ positions, toggleFavorite, favorites, isLoading, toggleBid,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored, bidList }) => (

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
        isLoading={isLoading}
        toggleBid={toggleBid}
        bidList={bidList}
      />
    </div>
);

NewPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

NewPositionsSection.defaultProps = {
  favorites: [],
  isLoading: false,
};

export default NewPositionsSection;
