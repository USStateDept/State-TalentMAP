import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { debounce, get, keys, isString, omit, pickBy } from 'lodash';
import queryParamUpdate from '../queryParams';
import { scrollToTop, cleanQueryParams, getAssetPath } from '../../utilities';
import { resultsFetchData } from '../../actions/results';
import { filtersFetchData } from '../../actions/filters/filters';
import { bidListFetchData } from '../../actions/bidList';
import { storeCurrentSearch } from '../../actions/savedSearch';
import { missionSearchFetchData } from '../../actions/autocomplete/missionAutocomplete';
import { postSearchFetchData } from '../../actions/autocomplete/postAutocomplete';
import { setSelectedAccordion } from '../../actions/selectedAccordion';
import { toggleSearchBar } from '../../actions/showSearchBar';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import CompareDrawer from '../../Components/CompareDrawer';
import { POSITION_SEARCH_RESULTS, FILTERS_PARENT, ACCORDION_SELECTION_OBJECT,
USER_PROFILE, MISSION_DETAILS_ARRAY, POST_DETAILS_ARRAY,
EMPTY_FUNCTION, BID_LIST } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import { LOGIN_REDIRECT } from '../../login/routes';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES, POSITION_PAGE_SIZES_TYPE } from '../../Constants/Sort';

const DEFAULT_PAGE_NUMBER = 1;

class Results extends Component {
  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.onQueryParamToggle = this.onQueryParamToggle.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.getQueryExists = this.getQueryExists.bind(this);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultSort: { value: POSITION_SEARCH_SORTS.defaultSort },
      defaultPageSize: { value: props.defaultPageSize },
      defaultPageNumber: { value: DEFAULT_PAGE_NUMBER },
      defaultKeyword: { value: '' },
      filtersIsLoading: true,
    };

    // Create an instance attribute for storing a reference to debounced requests
    this.debounced = debounce(() => {});
  }

  componentWillMount() {
    const { isAuthorized, onNavigateTo } = this.props;
    // store default search
    this.storeSearch();
    // check auth
    if (!isAuthorized()) {
      onNavigateTo(LOGIN_REDIRECT);
    } else {
      this.createQueryParams();
      this.props.bidListFetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filtersIsLoading === false) {
      this.setState({ filtersIsLoading: false });
    }
  }

  // for when we need to UPDATE the ENTIRE value of a filter
  onQueryParamUpdate(q) {
    const newQueryString = queryParamUpdate(q, this.state.query.value);
    // and push to history
    this.updateHistory(newQueryString);
  }

  // for when we need to ADD or DELETE a NESTED value of a filter
  onQueryParamToggle(param, value, remove) {
    const stringifiedValue = value.toString();
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
        const index = keyArray.indexOf(stringifiedValue);
        // does the filter exist in the query params? if so, delete it
        if (index > -1 && remove) {
          keyArray.splice(index, 1);
        } else if (!remove) {
          // value should not be a duplicate
          if (keyArray.indexOf(stringifiedValue) <= -1) {
            keyArray.push(stringifiedValue);
          }
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
      parsedQuery[param] = stringifiedValue;
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
    if (newQueryString !== this.state.query.value) {
      this.updateHistory(newQueryString);
    }
  }

  // check if there are filters selected so that the clear filters button can be displayed or hidden
  getQueryExists() {
    const { query: { value } } = this.state;
    let query = queryString.parse(value);
    // omit page size and ordering
    query = omit(query, ['limit', 'ordering']);
    // remove any falsy props, unless it's a 0
    query = pickBy(query, v => v || v === 0);
    // query exists if it has keys
    return !!keys(query).length;
  }

  getStringifiedQuery(q) {
    const keyword = this.resultsPageRef.getKeywordValue();
    if (isString(keyword)) {
      const parsed$ = queryString.parse(q);
      parsed$.q = keyword;
      return queryString.stringify(parsed$);
    }
    return false;
  }

  createQueryParams() {
    const { query, defaultSort, defaultPageSize, defaultPageNumber, defaultKeyword } = this.state;
    const { filters, fetchFilters } = this.props;
    // set our current query
    const parsedQuery = queryString.parse(query.value);
    const { ordering, limit, page, q } = parsedQuery;
    // set our default ordering
    defaultSort.value =
      ordering || POSITION_SEARCH_SORTS.defaultSort;
    // set our default page size
    defaultPageSize.value =
      parseInt(limit, 10) || this.props.defaultPageSize;
    // set our default page number
    defaultPageNumber.value =
      parseInt(page, 10) || DEFAULT_PAGE_NUMBER;
    // set our default keyword (?q=...)
    defaultKeyword.value =
      q || defaultKeyword.value;
    // add our defaultSort and defaultPageSize to the query,
    // but don't add them to history on initial render if
    // they weren't included in the initial query params
    const newQuery =
      { ordering: defaultSort.value,
        page: defaultPageNumber.value,
        limit: defaultPageSize.value,
        // this order dictates that query params take precedence over default values
        ...parsedQuery,
      };
    const newQueryString = queryString.stringify(newQuery);

    // Have the filters already been fetched?
    // if so, we'll pass back the saved filters
    // as a param, which tells our filters action
    // to not perform AJAX, and simply compare
    // the query params against the filters
    if (filters.hasFetched) {
      fetchFilters(filters, newQuery, filters);
    } else { // if not, we'll perform AJAX
      fetchFilters(filters, newQuery);
    }
    // fetch new results
    this.callFetchData(newQueryString);
  }

  // updates the history by passing a string of query params
  updateHistory(q) {
    let q$ = q;

    // check if the keyword changed
    if (this.resultsPageRef) {
      const q$$ = this.getStringifiedQuery(q);
      if (q$$) {
        q$ = q$$;
      }
    }

    this.setState({ query: { value: q$ } }, () => {
      this.storeSearch();
      window.history.pushState('', '', getAssetPath(`/results?${q$}`));
      this.debounced.cancel();
      // add debounce so that quickly selecting multiple filters is smooth
      this.debounced = debounce(() => this.createQueryParams(), this.props.debounceTimeInMs);
      this.debounced();
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

  // Store the last search for use in creating a new saved search
  storeSearch() {
    // parse the string to an object
    const parsedQuery = queryString.parse(this.state.query.value);
    // remove any invalid filters
    const cleanedQuery = cleanQueryParams(parsedQuery);
    // store formed object in redux
    this.props.storeSearch(cleanedQuery);
  }

  render() {
    const { results, hasErrored, isLoading, filters,
            selectedAccordion, setAccordion, userProfile, fetchMissionAutocomplete,
            missionSearchResults, missionSearchIsLoading, missionSearchHasErrored,
            fetchPostAutocomplete, postSearchResults, postSearchIsLoading,
            postSearchHasErrored, shouldShowSearchBar, bidList } = this.props;
    const { filtersIsLoading } = this.state;
    const showClear = this.getQueryExists();
    return (
      <div>
        <ResultsPage
          ref={(ref) => { this.resultsPageRef = ref; }}
          results={results}
          hasErrored={hasErrored}
          isLoading={isLoading}
          filtersIsLoading={filtersIsLoading}
          sortBy={POSITION_SEARCH_SORTS}
          defaultSort={this.state.defaultSort.value}
          pageSizes={POSITION_PAGE_SIZES}
          defaultPageSize={this.state.defaultPageSize.value}
          defaultPageNumber={this.state.defaultPageNumber.value}
          onQueryParamUpdate={this.onQueryParamUpdate}
          defaultKeyword={this.state.defaultKeyword.value}
          resetFilters={this.resetFilters}
          pillFilters={filters.mappedParams}
          filters={filters.filters}
          onQueryParamToggle={this.onQueryParamToggle}
          selectedAccordion={selectedAccordion}
          setAccordion={setAccordion}
          scrollToTop={scrollToTop}
          userProfile={userProfile}
          fetchMissionAutocomplete={fetchMissionAutocomplete}
          missionSearchResults={missionSearchResults}
          missionSearchIsLoading={missionSearchIsLoading}
          missionSearchHasErrored={missionSearchHasErrored}
          fetchPostAutocomplete={fetchPostAutocomplete}
          postSearchResults={postSearchResults}
          postSearchIsLoading={postSearchIsLoading}
          postSearchHasErrored={postSearchHasErrored}
          shouldShowSearchBar={shouldShowSearchBar}
          bidList={bidList.results}
          isProjectedVacancy={results.isProjectedVacancy}
          showClear={showClear}
        />
        <CompareDrawer />
      </div>
    );
  }
}

Results.contextTypes = {
  router: PropTypes.object,
};

Results.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  isAuthorized: PropTypes.func.isRequired,
  filters: FILTERS_PARENT,
  filtersIsLoading: PropTypes.bool,
  fetchFilters: PropTypes.func.isRequired,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  fetchMissionAutocomplete: PropTypes.func.isRequired,
  missionSearchResults: MISSION_DETAILS_ARRAY.isRequired,
  missionSearchIsLoading: PropTypes.bool.isRequired,
  missionSearchHasErrored: PropTypes.bool.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: POST_DETAILS_ARRAY.isRequired,
  postSearchIsLoading: PropTypes.bool.isRequired,
  postSearchHasErrored: PropTypes.bool.isRequired,
  shouldShowSearchBar: PropTypes.bool.isRequired,
  debounceTimeInMs: PropTypes.number,
  bidList: BID_LIST.isRequired,
  bidListFetchData: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  storeSearch: PropTypes.func,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  filters: { filters: [] },
  filtersHasErrored: false,
  filtersIsLoading: true,
  selectedAccordion: ACCORDION_SELECTION,
  userProfile: {},
  fetchMissionAutocomplete: EMPTY_FUNCTION,
  missionSearchResults: [],
  missionSearchIsLoading: false,
  missionSearchHasErrored: false,
  fetchPostAutocomplete: EMPTY_FUNCTION,
  postSearchResults: [],
  postSearchIsLoading: false,
  postSearchHasErrored: false,
  shouldShowSearchBar: true,
  debounceTimeInMs: 50,
  bidList: { results: [] },
  storeSearch: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  results: state.results,
  hasErrored: state.resultsHasErrored,
  isLoading: state.resultsIsLoading,
  filters: state.filters,
  filtersHasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
  selectedAccordion: state.selectedAccordion,
  routerLocations: state.routerLocations,
  userProfile: state.userProfile,
  missionSearchResults: state.missionSearchSuccess,
  missionSearchIsLoading: state.missionSearchIsLoading,
  missionSearchHasErrored: state.missionSearchHasErrored,
  postSearchResults: state.postSearchSuccess,
  postSearchIsLoading: state.postSearchIsLoading,
  postSearchHasErrored: state.postSearchHasErrored,
  shouldShowSearchBar: state.shouldShowSearchBar,
  bidList: state.bidListFetchDataSuccess,
  defaultPageSize: get(state, `sortPreferences.${POSITION_PAGE_SIZES_TYPE}.defaultSort`, POSITION_PAGE_SIZES.defaultSort),
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(resultsFetchData(url)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters, true)),
  setAccordion: accordion => dispatch(setSelectedAccordion(accordion)),
  onNavigateTo: dest => dispatch(push(dest)),
  fetchMissionAutocomplete: query => dispatch(missionSearchFetchData(query)),
  fetchPostAutocomplete: query => dispatch(postSearchFetchData(query)),
  toggleSearchBarVisibility: bool => dispatch(toggleSearchBar(bool)),
  bidListFetchData: () => dispatch(bidListFetchData()),
  storeSearch: obj => dispatch(storeCurrentSearch(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));
