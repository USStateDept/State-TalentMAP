import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { resultsFetchData } from '../../actions/results';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { POSITION_SEARCH_RESULTS } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultSort: { value: '' },
      defaultPageSize: { value: '' },
      defaultPageNumber: { value: 1 },
    };
  }

  componentWillMount() {
    const { query, defaultSort, defaultPageSize, defaultPageNumber } = this.state;
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      // set our current query
      const parsedQuery = queryString.parse(query.value);
      // set our default ordering
      defaultSort.value =
        parsedQuery.ordering || POSITION_SEARCH_SORTS.defaultSort;
      // set our default page size
      defaultPageSize.value =
        parseInt(parsedQuery.limit, 10) || POSITION_PAGE_SIZES.defaultSort;
      // set our default page number
      defaultPageNumber.value =
        parseInt(parsedQuery.page, 10) || defaultPageNumber.value;
      // add our defaultSort and defaultPageSize to the query,
      // but don't add them to history on initial render if
      // they weren't included in the initial query params
      const newQuery = Object.assign(
        {},
        { ordering: defaultSort.value,
          page: defaultPageNumber.value,
          limit: defaultPageSize.value },
        parsedQuery, // this order dictates that query params take precedence over default values
      );
      const newQueryString = queryString.stringify(newQuery);
      this.callFetchData(newQueryString);
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
    this.props.fetchData(q);
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
          defaultSort={this.state.defaultSort.value}
          pageSizes={POSITION_PAGE_SIZES}
          defaultPageSize={this.state.defaultPageSize.value}
          defaultPageNumber={this.state.defaultPageNumber.value}
          onQueryParamUpdate={q => this.onQueryParamUpdate(q)}
        />
      </div>
    );
  }
}

Results.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
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
