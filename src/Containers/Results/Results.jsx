import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchData } from '../../actions/results';
import ResultsList from '../../Components/ResultsList/ResultsList';
import { RESULTS } from '../../Constants/PropTypes';
import ViewComparisonLink from '../../Components/ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../../Components/ResetComparisons/ResetComparisons';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    const query = window.location.search || '';
    const api = this.props.api;
    this.props.fetchData(`${api}/position/${query}`);
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
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
      <ResultsList results={results} onToggle={() => this.onChildToggle()} /> : null;
    return (
      <div className="usa-grid-full">
        <div className="usa-grid-full">
          <div className="usa-width-one-half" style={{ float: 'left', padding: '15px 5px 0 10px' }}>
            <ViewComparisonLink onToggle={() => this.onChildToggle()} />
          </div>
          <div className="usa-width-one-half" style={{ float: 'left', padding: '0px 0px 5px 0px', textAlign: 'right' }}>
            <ResetComparisons onToggle={() => this.onChildToggle()} />
          </div>
        </div>
        <div className="usa-grid-full">
          {resultsCards}
        </div>
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
