import React from 'react';
import PropTypes from 'prop-types';
import CondensedCardData from '../CondensedCardData';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../../Containers/Favorite';

const ResultsCondensedCardBottom = ({ position, favorites, refreshFavorites }) => (
  <div className="condensed-card-bottom-container">
    <div className="usa-grid-full condensed-card-bottom">
      <CondensedCardData position={position} />
      <div className="usa-grid-full condensed-card-buttons-section">
        <Favorite
          useLongText
          hasBorder
          refKey={position.id}
          compareArray={favorites}
          useButtonClass
          useButtonClassSecondary
          refresh={refreshFavorites}
        />
      </div>
    </div>
  </div>
  );

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
  refreshFavorites: PropTypes.bool,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
  refreshFavorites: false,
};

export default ResultsCondensedCardBottom;
