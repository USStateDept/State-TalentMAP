import React from 'react';
import PropTypes from 'prop-types';
import CondensedCardData from '../CondensedCardData';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../Favorite/Favorite';

const ResultsCondensedCardBottom = ({ position, toggleFavorite,
favorites }) => (
  <div className="condensed-card-bottom-container">
    <div className="usa-grid-full condensed-card-bottom">
      <CondensedCardData position={position} />
      <div className="usa-grid-full condensed-card-buttons-section">
        <Favorite
          useLongText
          hasBorder
          refKey={position.id}
          onToggle={toggleFavorite}
          compareArray={favorites}
        />
      </div>
    </div>
  </div>
  );

ResultsCondensedCardBottom.propTypes = {
  position: POSITION_DETAILS.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY.isRequired,
};

ResultsCondensedCardBottom.defaultProps = {
  type: 'default',
};

export default ResultsCondensedCardBottom;
