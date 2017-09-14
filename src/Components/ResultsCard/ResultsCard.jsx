import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import Favorite from '../Favorite/Favorite';
import CompareCheck from '../CompareCheck/CompareCheck';
import ResultsCardDataSection from '../ResultsCardDataSection/ResultsCardDataSection';

const ResultsCard = ({ result, onToggle, favorites, toggleFavorite,
    userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => (
      <div id={result.id} className="usa-grid-full results-card">
        <div className="usa-grid-full">
          <div className="usa-width-one-half results-card-title">
            Position Number: {result.position_number}
          </div>
          <div className="results-card-favorite">
            {
              !!favorites &&
              <Favorite
                isLoading={userProfileFavoritePositionIsLoading}
                hasErrored={userProfileFavoritePositionHasErrored}
                compareArray={favorites}
                refKey={result.id}
                onToggle={toggleFavorite}
              />
            }
          </div>
        </div>
        <div className="usa-grid-full">
          <ResultsCardDataSection result={result} />
        </div>
        <div className="usa-grid-full bottom-section" >
          <div className="button-link details-button-container">
            <Link
              className="usa-button usa-button-primary details-button"
              type="submit"
              role="button"
              to={`/details/${result.position_number}`}
            >
        View details
        </Link>
          </div>
          <div className="compare-check">
            <CompareCheck refKey={result.position_number} onToggle={onToggle} />
          </div>
        </div>
      </div>
);

ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  onToggle: PropTypes.func.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

ResultsCard.defaultProps = {
  favorites: [],
};

export default ResultsCard;
