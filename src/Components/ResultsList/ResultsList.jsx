import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultsCard from '../../Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION } from '../../Constants/PropTypes';

class ResultsList extends Component {

  onChildToggle() {
    this.forceUpdate();
    this.props.onToggle();
  }

  render() {
    return (
      <div>
        { this.props.results.results.map(result => (
          <ResultsCard key={result.id} result={result} onToggle={() => this.onChildToggle()} />
          ))}
      </div>
    );
  }
}

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  onToggle: PropTypes.func,
};

ResultsList.defaultProps = {
  results: { results: [] },
  onToggle: EMPTY_FUNCTION,
};

export default ResultsList;
