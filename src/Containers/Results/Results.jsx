import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { resultsFetchData } from '../../actions/results';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';
import POSITION_SEARCH_SORTS from '../../Constants/Sort';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultSort: { value: '' },
    };
  }

  componentWillMount() {
    this.setState({ defaultSort: { value: (queryString.parse(this.state.query.value)).ordering || '' } });
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.callFetchData(`position/?${this.state.query.value}`);
    }
  }

  onQueryParamUpdate(q) {
    const parsedQuery = queryString.parse(this.state.query.value);
    const newQuery = Object.assign({}, parsedQuery, q);
    const newQueryString = queryString.stringify(newQuery);
    this.context.router.history.push({
      search: newQueryString,
    });
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
  }

  callFetchData(q) {
    const api = this.props.api;
    this.props.fetchData(`${api}/${q}`);
  }

  render() {
    const { results, hasErrored, isLoading } = this.props;
    return (
      <div className="usa-grid-full">
        <ResultsPage
          results={results}
          hasErrored={hasErrored}
          isLoading={isLoading}
          sortBy={POSITION_SEARCH_SORTS}
          defaultSort={this.state.defaultSort.value || POSITION_SEARCH_SORTS.defaultSort}
          onQueryParamUpdate={q => this.onQueryParamUpdate(q)}
        />
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  isAuthorized: PropTypes.func.isRequired,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onNavigateTo: EMPTY_FUNCTION,
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
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
