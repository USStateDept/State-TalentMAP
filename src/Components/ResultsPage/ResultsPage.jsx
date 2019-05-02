import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS, SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY,
ACCORDION_SELECTION_OBJECT, FILTER_ITEMS_ARRAY, USER_PROFILE, BID_RESULTS,
SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT, MISSION_DETAILS_ARRAY,
POST_DETAILS_ARRAY, EMPTY_FUNCTION, NEW_SAVED_SEARCH_SUCCESS_OBJECT } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import ResultsSearchHeader from '../ResultsSearchHeader/ResultsSearchHeader';
import ResultsFilterContainer from '../ResultsFilterContainer/ResultsFilterContainer';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: { value: 0 },
    };
  }

  getChildContext() {
    return { isProjectedVacancy: this.props.isProjectedVacancy };
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultKeyword, defaultLocation, resetFilters,
            pillFilters, defaultSort, pageSizes, defaultPageSize, onQueryParamToggle,
            defaultPageNumber, onQueryParamUpdate, filters, userProfile,
            selectedAccordion, setAccordion, scrollToTop, saveSearch, newSavedSearchSuccess,
            newSavedSearchHasErrored, currentSavedSearch, newSavedSearchIsSaving,
            fetchMissionAutocomplete, missionSearchResults, missionSearchIsLoading,
            missionSearchHasErrored, resetSavedSearchAlerts, fetchPostAutocomplete,
            postSearchResults, postSearchIsLoading, postSearchHasErrored, shouldShowSearchBar,
            bidList, isProjectedVacancy }
      = this.props;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    return (
      <div className="results content-container">
        <h2 className="sr-only">Search results</h2>
        {
          shouldShowSearchBar &&
          <ResultsSearchHeader
            onUpdate={onQueryParamUpdate}
            defaultKeyword={defaultKeyword}
            defaultLocation={defaultLocation}
            searchBarDisabled={isProjectedVacancy}
          />
        }
        <div className="usa-grid-full results-section-container">
          <ResultsFilterContainer
            filters={filters}
            onQueryParamUpdate={onQueryParamUpdate}
            onChildToggle={this.onChildToggle}
            onQueryParamToggle={onQueryParamToggle}
            resetFilters={resetFilters}
            setAccordion={setAccordion}
            selectedAccordion={selectedAccordion}
            fetchMissionAutocomplete={fetchMissionAutocomplete}
            missionSearchResults={missionSearchResults}
            missionSearchIsLoading={missionSearchIsLoading}
            missionSearchHasErrored={missionSearchHasErrored}
            fetchPostAutocomplete={fetchPostAutocomplete}
            postSearchResults={postSearchResults}
            postSearchIsLoading={postSearchIsLoading}
            postSearchHasErrored={postSearchHasErrored}
          />
          <ResultsContainer
            results={results}
            isLoading={isLoading}
            hasErrored={hasErrored}
            sortBy={sortBy}
            pageSize={defaultPageSize}
            totalResults={results.count}
            hasLoaded={hasLoaded || false}
            defaultSort={defaultSort}
            pageSizes={pageSizes}
            defaultPageSize={defaultPageSize}
            defaultPageNumber={defaultPageNumber}
            queryParamUpdate={onQueryParamUpdate}
            refreshKey={this.state.key}
            pillFilters={pillFilters}
            onQueryParamToggle={onQueryParamToggle}
            scrollToTop={scrollToTop}
            userProfile={userProfile}
            saveSearch={saveSearch}
            newSavedSearchSuccess={newSavedSearchSuccess}
            newSavedSearchHasErrored={newSavedSearchHasErrored}
            newSavedSearchIsSaving={newSavedSearchIsSaving}
            currentSavedSearch={currentSavedSearch}
            resetSavedSearchAlerts={resetSavedSearchAlerts}
            bidList={bidList}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  onQueryParamUpdate: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.number,
  defaultPageNumber: PropTypes.number,
  defaultKeyword: PropTypes.string,
  defaultLocation: PropTypes.string,
  resetFilters: PropTypes.func.isRequired,
  pillFilters: PILL_ITEM_ARRAY,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
  filters: FILTER_ITEMS_ARRAY,
  scrollToTop: PropTypes.func,
  userProfile: USER_PROFILE,
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchSuccess: NEW_SAVED_SEARCH_SUCCESS_OBJECT.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchIsSaving: PropTypes.bool.isRequired,
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
  bidList: BID_RESULTS.isRequired,
  isProjectedVacancy: PropTypes.bool,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onQueryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
  defaultKeyword: '',
  defaultLocation: '',
  pillFilters: [],
  selectedAccordion: ACCORDION_SELECTION,
  filters: [],
  scrollToTop: EMPTY_FUNCTION,
  userProfile: {},
  currentSavedSearch: {},
  isProjectedVacancy: false,
};

Results.contextTypes = {
  router: PropTypes.object,
};

Results.childContextTypes = {
  isProjectedVacancy: PropTypes.bool,
};

export default Results;
