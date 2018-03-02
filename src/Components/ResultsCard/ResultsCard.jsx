import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { NO_LAST_UPDATED_DATE, NO_BID_CYCLE } from '../../Constants/SystemMessages';
import Favorite from '../Favorite/Favorite';
import CompareCheck from '../CompareCheck/CompareCheck';
import ResultsCardDataSection from '../ResultsCardDataSection/ResultsCardDataSection';
import { formatDate } from '../../utilities';

const ResultsCard = ({ result, onToggle, favorites, toggleFavorite,
  userProfileFavoritePositionIsLoading, userProfileFavoritePositionHasErrored }) => {
  const postedDate = result.description && result.description.date_created ?
    formatDate(result.description.date_created) : NO_LAST_UPDATED_DATE;
  const bidCycle = result.bid_statistics && result.bid_statistics.length ?
    result.bid_statistics[0].bidcycle : NO_BID_CYCLE;
  return (
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
      <div className="usa-width-one-whole bottom-section" >
        <div className="usa-grid-full">
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
        <div className="usa-grid-full bid-cycle-container">
          <div className="bid-cycle-container-section">
            <strong>Date Posted:</strong> {postedDate}
          </div>
          <div className="bid-cycle-container-section">
            <strong>Bid Cycle:</strong> {bidCycle}
          </div>
        </div>
      </div>
    </div>
  );
};

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
