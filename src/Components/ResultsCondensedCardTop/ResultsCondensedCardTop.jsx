import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCardTop = ({ position, /* toggleFavorite, favorites,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored */ }) => (
    <div className="usa-grid-full condensed-card-top">
      <div className="usa-grid-full condensed-card-top-header-container">
        <div
          className={
            'usa-width-two-thirds condensed-card-top-header condensed-card-top-header-left'
          }
        >
          {position.title}
        </div>
        <div
          className="usa-width-one-third condensed-card-top-header condensed-card-top-header-right"
        >
          {
            /* !!favorites && <Favorite
              compareArray={favorites}
              onToggle={toggleFavorite}
              isLoading={userProfileFavoritePositionIsLoading}
              hasErrored={userProfileFavoritePositionHasErrored}
              refKey={position.id}
              hideText
            /> */
          }
          Grade: {position.grade}
        </div>
      </div>
    </div>
);

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default ResultsCondensedCardTop;
