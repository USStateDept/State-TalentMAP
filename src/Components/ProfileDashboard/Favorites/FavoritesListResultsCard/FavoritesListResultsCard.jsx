import React from 'react';
import { POSITION_DETAILS } from '../../../../Constants/PropTypes';
import InformationDataPoint from '../../../ProfileDashboard/InformationDataPoint';
import FavoriteContent from './FavoriteContent';
import LinkButton from '../../../LinkButton';

const FavoritesListResultsCard = ({ position }) => (
  <div className="usa-grid-full saved-search-card favorites-card" key={position.id}>
    <div className="usa-grid-full">
      <div className="usa-width-two-thirds favorites-card-section">
        <InformationDataPoint
          titleOnBottom
          content={
            <FavoriteContent position={position} />
          }
        />
      </div>
      <div className="usa-width-one-third favorites-card-section">
        <LinkButton toLink={`/details/${position.id}`}>View Position</LinkButton>
      </div>
    </div>
  </div>
);

FavoritesListResultsCard.propTypes = {
  position: POSITION_DETAILS.isRequired,
};

export default FavoritesListResultsCard;
