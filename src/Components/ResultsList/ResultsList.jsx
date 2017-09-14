import React from 'react';
import PropTypes from 'prop-types';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION } from '../../Constants/PropTypes';

const ResultsList = ({ results, onToggle, isLoading }) => {
  const mapResults = results.results || [];
  return (
    <div className={isLoading ? 'results-loading' : null}>
      { mapResults.map(result => (
        <ResultsCard key={result.id} result={result} onToggle={onToggle} />
          ))}
    </div>
  );
};

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  onToggle: PropTypes.func,
  isLoading: PropTypes.bool,
};

ResultsList.defaultProps = {
  results: { results: [] },
  onToggle: EMPTY_FUNCTION,
  isLoading: false,
};

export default ResultsList;
