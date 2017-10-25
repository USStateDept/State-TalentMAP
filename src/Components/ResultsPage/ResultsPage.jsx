import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as PROP_TYPES from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import ResultsSearchHeader from '../ResultsSearchHeader/ResultsSearchHeader';
import ResultsFilterContainer from '../ResultsFilterContainer/ResultsFilterContainer';

class Results extends Component {
  constructor(props) {
    super(props);
    this.onChildToggle = this.onChildToggle.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultKeyword, defaultLocation, resetFilters,
            pillFilters, defaultSort, pageSizes, defaultPageSize, onQueryParamToggle,
            defaultPageNumber, onQueryParamUpdate, filters, userProfile, toggleFavorite,
            selectedAccordion, setAccordion, scrollToTop, userProfileFavoritePositionIsLoading,
            userProfileFavoritePositionHasErrored, saveSearch, newSavedSearchSuccess,
            newSavedSearchHasErrored, currentSavedSearch, newSavedSearchIsSaving,
            fetchMissionAutocomplete, missionSearchResults, missionSearchIsLoading,
            missionSearchHasErrored, resetSavedSearchAlerts, fetchPostAutocomplete,
            postSearchResults, postSearchIsLoading, postSearchHasErrored }
      = this.props;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    const pageCount = Math.ceil(results.count / defaultPageSize);
    return (
      <div className="results">
        <ResultsSearchHeader
          onUpdate={onQueryParamUpdate}
          defaultKeyword={defaultKeyword}
          defaultLocation={defaultLocation}
        />
        <div className="usa-grid-full top-nav">
          <div className="usa-width-one-third reset-compare-link">
            <ResetComparisons onToggle={this.onChildToggle} />
          </div>
          <div className="usa-width-one-third comparisons-button">
            <ViewComparisonLink onToggle={this.onChildToggle} />
          </div>
        </div>
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
            pageCount={pageCount}
            hasLoaded={hasLoaded || false}
            defaultSort={defaultSort}
            pageSizes={pageSizes}
            defaultPageSize={defaultPageSize}
            defaultPageNumber={defaultPageNumber}
            queryParamUpdate={onQueryParamUpdate}
            refreshKey={this.state.key}
            onToggle={this.onChildToggle}
            pillFilters={pillFilters}
            onQueryParamToggle={onQueryParamToggle}
            scrollToTop={scrollToTop}
            userProfile={userProfile}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            saveSearch={saveSearch}
            newSavedSearchSuccess={newSavedSearchSuccess}
            newSavedSearchHasErrored={newSavedSearchHasErrored}
            newSavedSearchIsSaving={newSavedSearchIsSaving}
            currentSavedSearch={currentSavedSearch}
            resetSavedSearchAlerts={resetSavedSearchAlerts}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: PROP_TYPES.POSITION_SEARCH_RESULTS,
  onQueryParamUpdate: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  sortBy: PROP_TYPES.SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: PROP_TYPES.SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
  defaultPageNumber: PropTypes.number,
  defaultKeyword: PropTypes.string,
  defaultLocation: PropTypes.string,
  resetFilters: PropTypes.func.isRequired,
  pillFilters: PROP_TYPES.PILL_ITEM_ARRAY,
  selectedAccordion: PROP_TYPES.ACCORDION_SELECTION_OBJECT,
  setAccordion: PropTypes.func.isRequired,
  filters: PROP_TYPES.FILTER_ITEMS_ARRAY,
  scrollToTop: PropTypes.func,
  userProfile: PROP_TYPES.USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchSuccess: PROP_TYPES.SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchHasErrored: PROP_TYPES.SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchIsSaving: PropTypes.bool.isRequired,
  currentSavedSearch: PROP_TYPES.SAVED_SEARCH_OBJECT,
  resetSavedSearchAlerts: PropTypes.func.isRequired,
  fetchMissionAutocomplete: PropTypes.func.isRequired,
  missionSearchResults: PROP_TYPES.MISSION_DETAILS_ARRAY.isRequired,
  missionSearchIsLoading: PropTypes.bool.isRequired,
  missionSearchHasErrored: PropTypes.bool.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: PROP_TYPES.POST_DETAILS_ARRAY.isRequired,
  postSearchIsLoading: PropTypes.bool.isRequired,
  postSearchHasErrored: PropTypes.bool.isRequired,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onQueryParamUpdate: PROP_TYPES.EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
  defaultKeyword: '',
  defaultLocation: '',
  pillFilters: [],
  selectedAccordion: ACCORDION_SELECTION,
  filters: [],
  scrollToTop: PROP_TYPES.EMPTY_FUNCTION,
  userProfile: {},
  currentSavedSearch: {},
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
