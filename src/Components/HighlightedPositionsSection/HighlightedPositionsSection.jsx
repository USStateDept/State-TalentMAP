import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import HighlightedPositionsCardList from '../HighlightedPositionsCardList';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const HighlightedPositionsSection = ({ positions, toggleFavorite, favorites, isLoading, bidList,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored, toggleBid }) => (
    <div className="usa-grid-full positions-section positions-section-highlighted">
      <PositionsSectionTitle
        title={
          <span className="positions-section-title">
            <FontAwesome name="star" />
            Highlighted Positions
          </span>
        }
        viewMoreLink="/results"
      />
      <HighlightedPositionsCardList
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

HighlightedPositionsSection.propTypes = {
  positions: POSITION_DETAILS_ARRAY.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

HighlightedPositionsSection.defaultProps = {
  favorites: [],
  isLoading: false,
};

export default HighlightedPositionsSection;
