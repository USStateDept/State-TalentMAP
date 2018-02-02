import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';
import ResultsCondensedCardFooter from '../ResultsCondensedCardFooter';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const ResultsCondensedCard = ({ type, position, toggleFavorite, favorites, bidList,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored,
  toggleBid }) => (

    <div className="usa-grid-full condensed-card-inner">
      <ResultsCondensedCardTop
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        position={position}
        type={type}
      />
      <ResultsCondensedCardBottom
        toggleFavorite={toggleFavorite}
        position={position}
        favorites={favorites}
        toggleBid={toggleBid}
        bidList={bidList}
      />
      <ResultsCondensedCardFooter
        position={position}
      />
    </div>
);

ResultsCondensedCard.propTypes = {
  type: PropTypes.string,
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

ResultsCondensedCard.defaultProps = {
  type: 'new',
  favorites: [],
};

export default ResultsCondensedCard;
