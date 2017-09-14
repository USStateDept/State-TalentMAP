import React from 'react';
import PropTypes from 'prop-types';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION } from '../../Constants/PropTypes';

const ResultsList = ({ results, onToggle, isLoading, favorites, toggleFavorite,
                       userProfileFavoritePositionIsLoading,
                       userProfileFavoritePositionHasErrored }) => {
  const mapResults = results.results || [];
  return (
    <div className={isLoading ? 'results-loading' : null}>
      { mapResults.map(result => (
        <ResultsCard
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          key={result.id}
          result={result}
          onToggle={onToggle}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        />
          ))}
    </div>
  );
};

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  onToggle: PropTypes.func,
  isLoading: PropTypes.bool,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

ResultsList.defaultProps = {
  results: { results: [] },
  onToggle: EMPTY_FUNCTION,
  isLoading: false,
};

export default ResultsList;
