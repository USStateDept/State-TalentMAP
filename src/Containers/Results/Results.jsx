import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { resultsFetchData } from '../../actions/results';
import { filtersFetchData } from '../../actions/filters';
import { setSelectedAccordion } from '../../actions/selectedAccordion';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { POSITION_SEARCH_RESULTS, FILTERS_PARENT, ACCORDION_SELECTION_OBJECT } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
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
      defaultKeyword: { value: '' },
      defaultLocation: { value: '' },
    };
  }

  componentWillMount() {
    const { query, defaultSort, defaultPageSize, defaultPageNumber, defaultKeyword,
            defaultLocation } = this.state;
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
      // set our default keyword (?q=...)
      defaultKeyword.value =
        parsedQuery.q || defaultKeyword.value;
      // set our default location keyword
      defaultLocation.value =
        parsedQuery.location || defaultLocation.value;
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
      // get our filters to map against
      const { filters } = this.props;
      // have the filters already been fetched?
      // if so, we'll pass back the saved filters
      // as a param, which tells our filters action
      // to not perform AJAX, and simply compare
      // the query params against the filters
      if (filters.hasFetched) {
        this.props.fetchFilters(filters, newQuery, filters);
      } else { // if not, we'll perform AJAX
        this.props.fetchFilters(filters, newQuery);
      }
      // fetch new results
      this.callFetchData(newQueryString);
    }
  }

  // for when we need to UPDATE the ENTIRE value of a filter
  onQueryParamUpdate(q) {
    const parsedQuery = queryString.parse(this.state.query.value);
    // unless we're changing the page number, go back to page 1
    if (Object.keys(q).indexOf('page') <= -1) {
      if (parsedQuery.page) {
        // deleting the key does the same thing as going back to page 1
        // and also makes our query params cleaner
        delete parsedQuery.page;
      }
    }
    // combine our old and new query objects, overwriting any diffs with new
    const newQuery = Object.assign({}, parsedQuery, q);
    // remove any params with no value
    Object.keys(newQuery).forEach((key) => {
      if (!(newQuery[key].toString().length)) {
        delete newQuery[key];
      }
    });
    // convert the object to a string
    const newQueryString = queryString.stringify(newQuery);
    // and push to history
    this.updateHistory(newQueryString);
  }

  // for when we need to ADD or DELETE a NESTED value of a filter
  onQueryParamToggle(param, value, remove) {
    const parsedQuery = queryString.parse(this.state.query.value);
    // was the key found?
    let wasKeyFound = false;
    // iterate over the query params
    Object.keys(parsedQuery).forEach((key) => {
      if (key === param) {
        // key was found
        wasKeyFound = true;
        // split filter strings into array
        const keyArray = parsedQuery[key].split(',');
        const index = keyArray.indexOf(value);
        // does the filter exist in the query params? if so, delete it
        if (index > -1 && remove) {
          keyArray.splice(index, 1);
        } else if (!remove) {
          keyArray.push(value);
        }
        // convert the array back to a string
        parsedQuery[key] = keyArray.join();
        // if there's no more filters selected, delete the property so that we don't
        // end up with empty params like "?skill=&grade=&language="
        if (!parsedQuery[key].length) {
          delete parsedQuery[key];
        }
      }
    });
    if (!wasKeyFound && !remove) {
      parsedQuery[param] = value;
    }
    // Go back to page 1 if a page number >1 was set.
    // We never change the page number from this function, so we can always assume this
    // should be 1.
    if (parsedQuery.page) {
      // deleting the page does the same thing as setting it to 1
      // and makes our params cleaner
      delete parsedQuery.page;
    }
    // finally, turn the object back into a string
    const newQueryString = queryString.stringify(parsedQuery);
    // check if there were actually any changes (example - two fast clicks of a pill)
    if (newQueryString !== this.state.query.value) { this.updateHistory(newQueryString); }
  }

  // updates the history by passing a string of query params
  updateHistory(q) {
    this.context.router.history.push({
      search: q,
    });
  }

  // reset to no query params
  resetFilters() {
    this.context.router.history.push({
      search: '',
    });
  }

  callFetchData(q) {
    this.props.fetchData(q);
  }

  render() {
    const { results, hasErrored, isLoading, filters, selectedAccordion, setAccordion } = this.props;
    return (
      <div>
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
          defaultKeyword={this.state.defaultKeyword.value}
          defaultLocation={this.state.defaultLocation.value}
          resetFilters={() => this.resetFilters()}
          pillFilters={filters.mappedParams}
          filters={filters.filters}
          onQueryParamToggle={(p, v, r) => this.onQueryParamToggle(p, v, r)}
          selectedAccordion={selectedAccordion}
          setAccordion={a => setAccordion(a)}
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
  filters: FILTERS_PARENT,
  fetchFilters: PropTypes.func.isRequired,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  filters: { filters: [] },
  filtersHasErrored: false,
  filtersIsLoading: true,
  selectedAccordion: ACCORDION_SELECTION,
};

Results.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  results: state.results,
  hasErrored: state.resultsHasErrored,
  isLoading: state.resultsIsLoading,
  filters: state.filters,
  filtersHasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
  selectedAccordion: state.selectedAccordion,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(resultsFetchData(url)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  setAccordion: accordion => dispatch(setSelectedAccordion(accordion)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
