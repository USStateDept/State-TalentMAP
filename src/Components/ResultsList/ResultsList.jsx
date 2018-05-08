import React from 'react';
import PropTypes from 'prop-types';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';
import { propOrDefault } from '../../utilities';

const ResultsList = ({ results, onToggle, isLoading, favorites, toggleFavorite,
                       userProfileFavoritePositionIsLoading, toggleBid, bidList,
                       userProfileFavoritePositionHasErrored }) => {
  const mapResults = results.results || [];
  return (
    <div className={isLoading ? 'results-loading' : null}>
      { mapResults.map((result) => {
        const key = `${result.id}-${propOrDefault(result, 'latest_bidcycle.id', '')}`;
        return (
          <ResultsCard
            id={key}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            key={key}
            result={result}
            onToggle={onToggle}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            toggleBid={toggleBid}
            bidList={bidList}
          />
        );
      })}
    </div>
  );
};

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  onToggle: PropTypes.func,
  isLoading: PropTypes.bool,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

ResultsList.defaultProps = {
  results: { results: [] },
  onToggle: EMPTY_FUNCTION,
  isLoading: false,
  favorites: [],
};

export default ResultsList;
