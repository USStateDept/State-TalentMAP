import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';
import ResultsCondensedCardFooter from '../ResultsCondensedCardFooter';
import ResultsCondensedCardStats from '../ResultsCondensedCardStats';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const ResultsCondensedCard = ({ position, toggleFavorite, favorites, bidList,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored,
  toggleBid, type }) => (

    <div className="usa-grid-full condensed-card-inner">
      <ResultsCondensedCardTop
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        position={position}
        type={type}
      />
      <ResultsCondensedCardStats bidStatisticsArray={position.bid_statistics} />
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
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE.isRequired,
};

ResultsCondensedCard.defaultProps = {
  favorites: [],
};

export default ResultsCondensedCard;
