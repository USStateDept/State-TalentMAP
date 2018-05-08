import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SAVED_SEARCH_MESSAGE, SAVED_SEARCH_OBJECT,
         SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY, USER_PROFILE, NEW_SAVED_SEARCH_SUCCESS_OBJECT,
         BID_RESULTS } from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import Alert from '../Alert/Alert';
import ResultsControls from '../ResultsControls/ResultsControls';
import ResultsPillContainer from '../ResultsPillContainer/ResultsPillContainer';
import SaveNewSearchContainer from '../SaveNewSearchContainer';
import SaveNewSearchAlert from '../SaveNewSearchAlert';
import Dismiss from '../Dismiss';

class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(q) {
    this.props.queryParamUpdate(q);
    this.props.scrollToTop();
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, pageSize, hasLoaded, totalResults,
            defaultSort, pageSizes, defaultPageSize, refreshKey, pillFilters, userProfile,
            defaultPageNumber, queryParamUpdate, onToggle, onQueryParamToggle,
            toggleFavorite, userProfileFavoritePositionIsLoading, newSavedSearchHasErrored,
            userProfileFavoritePositionHasErrored, saveSearch, newSavedSearchSuccess,
            currentSavedSearch, newSavedSearchIsSaving, resetSavedSearchAlerts, toggleBid,
            bidList,
      } = this.props;
    return (
      <div className="results-container">
        {
          newSavedSearchSuccess.title &&
          <Dismiss onDismiss={resetSavedSearchAlerts}>
            <SaveNewSearchAlert newSavedSearchSuccess={newSavedSearchSuccess} />
          </Dismiss>
        }
        <ResultsPillContainer
          items={pillFilters}
          onPillClick={onQueryParamToggle}
        />
        <ResultsControls
          results={results}
          hasLoaded={hasLoaded}
          defaultSort={defaultSort}
          pageSizes={pageSizes}
          defaultPageSize={defaultPageSize}
          sortBy={sortBy}
          defaultPageNumber={defaultPageNumber}
          queryParamUpdate={queryParamUpdate}
        />
        <SaveNewSearchContainer
          saveSearch={saveSearch}
          newSavedSearchSuccess={newSavedSearchSuccess}
          newSavedSearchHasErrored={newSavedSearchHasErrored}
          currentSavedSearch={currentSavedSearch}
          newSavedSearchIsSaving={newSavedSearchIsSaving}
        />
        {
          // is not loading, results array exists, but is empty
          !isLoading && results.results && !results.results.length &&
            <div className="usa-grid-full no-results">
              <Alert title="No results found" messages={[{ body: 'Try broadening your search criteria' }]} />
            </div>
        }
        {
          <div className="results-list-container">
            {
              isLoading && !hasErrored &&
                <Spinner size="big" type="position-results" />
            }
            <ResultsList
              key={refreshKey}
              onToggle={onToggle}
              results={results}
              isLoading={!hasLoaded}
              favorites={userProfile.favorite_positions}
              toggleFavorite={toggleFavorite}
              userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
              userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
              toggleBid={toggleBid}
              bidList={bidList}
            />
          </div>
        }
        {
         // if there's no results, don't show pagination
         !!results.results && !!results.results.length &&
         // finally, render the pagination
         <div className="usa-grid-full react-paginate">
           <PaginationWrapper
             totalResults={totalResults}
             pageSize={pageSize}
             onPageChange={this.onPageChange}
             forcePage={defaultPageNumber}
           />
         </div>
        }
      </div>
    );
  }
}

ResultsContainer.propTypes = {
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  queryParamUpdate: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
  defaultPageNumber: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  refreshKey: PropTypes.number, // refresh components that rely on local storage
  pillFilters: PILL_ITEM_ARRAY,
  scrollToTop: PropTypes.func,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  saveSearch: PropTypes.func.isRequired,
  newSavedSearchSuccess: NEW_SAVED_SEARCH_SUCCESS_OBJECT.isRequired,
  newSavedSearchHasErrored: SAVED_SEARCH_MESSAGE.isRequired,
  newSavedSearchIsSaving: PropTypes.bool.isRequired,
  currentSavedSearch: SAVED_SEARCH_OBJECT,
  resetSavedSearchAlerts: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

ResultsContainer.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  queryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
  refreshKey: 0,
  pillFilters: [],
  scrollToTop: EMPTY_FUNCTION,
  userProfile: {},
  currentSavedSearch: {},
  totalResults: 0,
};

export default ResultsContainer;
