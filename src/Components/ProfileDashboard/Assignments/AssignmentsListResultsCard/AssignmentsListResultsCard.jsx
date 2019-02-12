import React from 'react';
import { POSITION_DETAILS } from '../../../../Constants/PropTypes';
import InformationDataPoint from '../../../ProfileDashboard/InformationDataPoint';
import FavoriteContent from './AssignmentsContent';

const FavoritesListResultsCard = ({ assignment }) => (
  <div className="usa-grid-full saved-search-card favorites-card" key={assignment.id}>
    <div className="usa-grid-full">
      <div className="usa-width-one-whole favorites-card-section">
        <InformationDataPoint
          titleOnBottom
          content={
            <FavoriteContent assignment={assignment} />
          }
        />
      </div>
    </div>
  </div>
);

FavoritesListResultsCard.propTypes = {
  assignment: POSITION_DETAILS.isRequired,
};

export default FavoritesListResultsCard;
