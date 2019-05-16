import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from '../../Constants/PropTypes';

const ResultsList = ({ results, isLoading, favorites, favoritesPV, bidList }) => {
  const mapResults = results.results || [];
  return (
    <div className={isLoading ? 'results-loading' : null}>
      { mapResults.map((result) => {
        const key = shortid.generate();
        return (
          <ResultsCard
            id={key}
            favorites={favorites}
            favoritesPV={favoritesPV}
            key={key}
            result={result}
            bidList={bidList}
          />
        );
      })}
    </div>
  );
};

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  isLoading: PropTypes.bool,
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  bidList: BID_RESULTS.isRequired,
};

ResultsList.defaultProps = {
  results: { results: [] },
  isLoading: false,
  favorites: [],
  favoritesPV: [],
};

export default ResultsList;
