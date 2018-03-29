import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import debounce from 'lodash/debounce';
import queryParamUpdate from '../queryParams';
import { scrollToTop, cleanQueryParams } from '../../utilities';
import { resultsFetchData } from '../../actions/results';
import { filtersFetchData } from '../../actions/filters/filters';
import { saveSearch, routeChangeResetState } from '../../actions/savedSearch';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { missionSearchFetchData } from '../../actions/autocomplete/missionAutocomplete';
import { postSearchFetchData } from '../../actions/autocomplete/postAutocomplete';
import { setSelectedAccordion } from '../../actions/selectedAccordion';
import { toggleSearchBar } from '../../actions/showSearchBar';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { POSITION_SEARCH_RESULTS, FILTERS_PARENT, ACCORDION_SELECTION_OBJECT, ROUTER_LOCATIONS,
USER_PROFILE, SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT, MISSION_DETAILS_ARRAY, POST_DETAILS_ARRAY,
EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import { LOGIN_REDIRECT } from '../../login/routes';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';

class Results extends Component {
  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.onQueryParamToggle = this.onQueryParamToggle.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.saveSearch = this.saveSearch.bind(this);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultSort: { value: '' },
      defaultPageSize: { value: 0 },
      defaultPageNumber: { value: 1 },
      defaultKeyword: { value: '' },
    };

    // Create an instance attribute for storing a reference to debounced requests
    this.debounced = debounce(() => {});
  }

  componentWillMount() {
    const { resetSavedSearchAlerts, isAuthorized, onNavigateTo } = this.props;
    // clear out old alert messages
    resetSavedSearchAlerts();
    // check auth
    if (!isAuthorized()) {
      onNavigateTo(LOGIN_REDIRECT);
    } else {
      this.createQueryParams();
    }
  }

  componentDidMount() {
    // Check if the user came from another page.
    // If so, scroll the user to the top of the page.
    const { routerLocations } = this.props;
    const rLength = routerLocations.length;
    if (rLength > 1) {
      // compare the most recent and second-most recent pathnames
      if (routerLocations[rLength - 1].pathname !== routerLocations[rLength - 2].pathname) {
        window.scrollTo(0, 0);
      }
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
      parseInt(limit, 10) || POSITION_PAGE_SIZES.defaultSort;
    // set our default page number
    defaultPageNumber.value =
      parseInt(page, 10) || defaultPageNumber.value;
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
    this.setState({ query: { value: q } }, () => {
      window.history.pushState('', '', `/results?${q}`);
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

  // When we want to save a search, the child component passes a string for the name (e)
  // We'll handle the actual "filters" object here
  // An optional "id" can be passed if we want to patch an existing saved search
  saveSearch(e, id) {
    // parse the string to an object
    const parsedQuery = queryString.parse(this.state.query.value);
    // remove any invalid filters
    const cleanedQuery = cleanQueryParams(parsedQuery);
    // form our object for the API
    const queryObject = Object.assign({}, {
      name: e,
      endpoint: '/api/v1/position/',
      filters: cleanedQuery,
    });
    // send formed object to our redux action
    this.props.saveSearch(queryObject, id);
  }

  render() {
    const { results, hasErrored, isLoading, filters, toggleFavorite,
            selectedAccordion, setAccordion, userProfile, fetchMissionAutocomplete,
            missionSearchResults, missionSearchIsLoading, missionSearchHasErrored,
            userProfileFavoritePositionIsLoading, resetSavedSearchAlerts,
            userProfileFavoritePositionHasErrored, currentSavedSearch,
            newSavedSearchSuccess, newSavedSearchIsSaving, newSavedSearchHasErrored,
            fetchPostAutocomplete, postSearchResults, postSearchIsLoading,
            postSearchHasErrored, shouldShowSearchBar } = this.props;
    return (
      <ResultsPage
        results={results}
        hasErrored={hasErrored}
        isLoading={isLoading}
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
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        newSavedSearchSuccess={newSavedSearchSuccess}
        newSavedSearchIsSaving={newSavedSearchIsSaving}
        newSavedSearchHasErrored={newSavedSearchHasErrored}
        saveSearch={this.saveSearch}
        currentSavedSearch={currentSavedSearch}
        resetSavedSearchAlerts={resetSavedSearchAlerts}
        fetchMissionAutocomplete={fetchMissionAutocomplete}
        missionSearchResults={missionSearchResults}
        missionSearchIsLoading={missionSearchIsLoading}
        missionSearchHasErrored={missionSearchHasErrored}
        fetchPostAutocomplete={fetchPostAutocomplete}
        postSearchResults={postSearchResults}
        postSearchIsLoading={postSearchIsLoading}
        postSearchHasErrored={postSearchHasErrored}
        shouldShowSearchBar={shouldShowSearchBar}
      />
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
  fetchFilters: PropTypes.func.isRequired,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
  routerLocations: ROUTER_LOCATIONS,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE,
  newSavedSearchIsSaving: PropTypes.bool.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE,
  saveSearch: PropTypes.func.isRequired,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
  resetSavedSearchAlerts: PropTypes.func.isRequired,
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
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  filters: { filters: [] },
  filtersHasErrored: false,
  filtersIsLoading: true,
  selectedAccordion: ACCORDION_SELECTION,
  routerLocations: [],
  userProfile: {},
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
  newSavedSearchSuccess: false,
  newSavedSearchHasErrored: false,
  newSavedSearchIsSaving: false,
  currentSavedSearch: {},
  resetSavedSearchAlerts: EMPTY_FUNCTION,
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
  routerLocations: state.routerLocations,
  userProfile: state.userProfile,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
  newSavedSearchSuccess: state.newSavedSearchSuccess,
  newSavedSearchIsSaving: state.newSavedSearchIsSaving,
  newSavedSearchHasErrored: state.newSavedSearchHasErrored,
  currentSavedSearch: state.currentSavedSearch,
  missionSearchResults: state.missionSearchSuccess,
  missionSearchIsLoading: state.missionSearchIsLoading,
  missionSearchHasErrored: state.missionSearchHasErrored,
  postSearchResults: state.postSearchSuccess,
  postSearchIsLoading: state.postSearchIsLoading,
  postSearchHasErrored: state.postSearchHasErrored,
  shouldShowSearchBar: state.shouldShowSearchBar,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(resultsFetchData(url)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters, true)),
  setAccordion: accordion => dispatch(setSelectedAccordion(accordion)),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) =>
    // We don't need to pull the full Favorite Positions route, since
    // all we want to do is check that they exist in the profile, so
    // we don't pass the refreshFavorites arg
    dispatch(userProfileToggleFavoritePosition(id, remove)),
  saveSearch: (object, id) => dispatch(saveSearch(object, id)),
  resetSavedSearchAlerts: () => dispatch(routeChangeResetState()),
  fetchMissionAutocomplete: query => dispatch(missionSearchFetchData(query)),
  fetchPostAutocomplete: query => dispatch(postSearchFetchData(query)),
  toggleSearchBarVisibility: bool => dispatch(toggleSearchBar(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));
