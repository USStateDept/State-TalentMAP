import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchData } from '../../actions/results';
import ResultsList from '../../Components/ResultsList/ResultsList';

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
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      grade: PropTypes.string,
      skill: PropTypes.string,
      bureau: PropTypes.string,
      organization: PropTypes.string,
      position_number: PropTypes.string.isRequired,
      is_overseas: PropTypes.boolean,
      create_date: PropTypes.string,
      update_date: PropTypes.string,
      post: PropTypes.shape({
        id: PropTypes.number,
        tour_of_duty: PropTypes.string,
        code: PropTypes.string,
        description: PropTypes.string,
        cost_of_living_adjustment: PropTypes.number,
        differential_rate: PropTypes.number,
        danger_pay: PropTypes.number,
        rest_relaxation_point: PropTypes.string,
        has_consumable_allowance: PropTypes.boolean,
        has_service_needs_differential: PropTypes.boolean,
      }),
      languages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          language: PropTypes.string,
          written_proficiency: PropTypes.string,
          spoken_proficiency: PropTypes.string,
          representation: PropTypes.string,
        }),
      ),
    }),
  ),
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
