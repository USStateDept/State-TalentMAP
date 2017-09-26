import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, USER_PROFILE, SAVED_SEARCH_MESSAGE,
  SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY, ACCORDION_SELECTION_OBJECT, FILTER_ITEMS_ARRAY,
  SAVED_SEARCH_OBJECT } from '../../Constants/PropTypes';
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
            newSavedSearchHasErrored, currentSavedSearch }
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
          <div className="usa-width-one-third compare-link">
            <ViewComparisonLink onToggle={this.onChildToggle} />
          </div>
          <div className="usa-width-one-third reset-comparisons">
            <ResetComparisons onToggle={this.onChildToggle} />
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
            currentSavedSearch={currentSavedSearch}
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
  defaultPageSize: PropTypes.node,
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
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchSuccess: SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE.isRequired,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
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
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
