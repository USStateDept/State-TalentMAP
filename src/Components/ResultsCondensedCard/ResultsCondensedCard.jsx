import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';
import ResultsCondensedCardFooter from '../ResultsCondensedCardFooter';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const ResultsCondensedCard = (
  {
    position,
    favorites,
    bidList,
    type,
    refreshFavorites,
    showBidListButton,
  }) => (

    <div className="usa-grid-full condensed-card-inner">
      <ResultsCondensedCardTop
        favorites={favorites}
        position={position}
        type={type}
      />
      <ResultsCondensedCardBottom
        position={position}
        favorites={favorites}
        bidList={bidList}
        refreshFavorites={refreshFavorites}
        showBidListButton={showBidListButton}
      />
      <ResultsCondensedCardFooter
        position={position}
      />
    </div>
);

ResultsCondensedCard.propTypes = {
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE.isRequired,
  refreshFavorites: PropTypes.bool,
  showBidListButton: PropTypes.bool,
};

ResultsCondensedCard.defaultProps = {
  favorites: [],
  refreshFavorites: false,
  showBidListButton: false,
};

export default ResultsCondensedCard;
