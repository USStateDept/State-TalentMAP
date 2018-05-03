import React from 'react';
import PropTypes from 'prop-types';
import CondensedCardData from '../CondensedCardData';
import BidListButton from '../BidListButton';
import { POSITION_DETAILS, BID_RESULTS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../Favorite/Favorite';

const ResultsCondensedCardBottom = ({ position, toggleBid, bidList, toggleFavorite,
favorites }) => (
  <div className="condensed-card-bottom-container">
    <div className="usa-grid-full condensed-card-bottom">
      <CondensedCardData position={position} />
      <div className="usa-grid-full condensed-card-buttons-section">
        <Favorite
          hideText
          hasBorder
          refKey={position.id}
          onToggle={toggleFavorite}
          compareArray={favorites}
          useButtonClass
          useButtonClassSecondary
        />
        <BidListButton
          className="tm-button"
          id={position.id}
          compareArray={bidList}
          toggleBidPosition={toggleBid}
        />
      </div>
    </div>
  </div>
  );

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
};

export default ResultsCondensedCardBottom;
