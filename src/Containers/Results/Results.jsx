import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resultsFetchData } from '../../actions/results';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { RESULTS } from '../../Constants/PropTypes';

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
    const { results, hasErrored, isLoading } = this.props;
    return (
      <div className="usa-grid-full">
        <ResultsPage results={results} hasErrored={hasErrored} isLoading={isLoading} />
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
