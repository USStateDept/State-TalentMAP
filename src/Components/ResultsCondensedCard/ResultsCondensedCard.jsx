import React from 'react';
import PropTypes from 'prop-types';
import ResultsCondensedCardTop from '../ResultsCondensedCardTop';
import ResultsCondensedCardBottom from '../ResultsCondensedCardBottom';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCard = ({ type, position, toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => (

    <div className="usa-grid-full condensed-card-inner">
      <ResultsCondensedCardTop
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        position={position}
        type={type}
      />
      <div className="condensed-card-bottom-container">
        <ResultsCondensedCardBottom position={position} />
      </div>
    </div>
);

ResultsCondensedCard.propTypes = {
  type: PropTypes.string,
  position: POSITION_DETAILS.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

ResultsCondensedCard.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCard;
