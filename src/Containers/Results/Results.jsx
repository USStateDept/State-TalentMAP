import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchData } from '../../actions/results';
import ResultsList from '../../Components/ResultsList/ResultsList';
import { RESULTS } from '../../Constants/PropTypes';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const query = window.location.search || '';
    const api = this.props.api;
    this.props.fetchData(`${api}/position/${query}`);
  }

  render() {
    const { results } = this.props;
    const e = this.props.hasErrored ? (
      <span>There was an error loading the results</span>
    ) : null;
    const l = this.props.isLoading && !this.props.hasErrored ? (<span>Loading...</span>) : null;
    const n = !this.props.isLoading && !this.props.hasErrored && !results.length ?
      <span>No results with that search criteria</span> : null;
    const resultsCards = (results.length && !this.props.hasErrored && !this.props.isLoading) ?
      <ResultsList results={results} /> : null;
    return (
      <div>
        {resultsCards}
        <div className="usa-grid">
          <center> {e} {l} {n} </center>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: RESULTS,
};

Results.defaultProps = {
  results: [],
  hasErrored: false,
  isLoading: true,
};

Results.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  results: state.results,
  hasErrored: state.resultsHasErrored,
  isLoading: state.resultsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(resultsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
