import React from 'react';
import PropTypes from 'prop-types';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION,
         SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY, USER_PROFILE } from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import Alert from '../Alert/Alert';
import ResultsControls from '../ResultsControls/ResultsControls';
import ResultsPillContainer from '../ResultsPillContainer/ResultsPillContainer';
import SaveNewSearchContainer from '../SaveNewSearchContainer';
import SaveNewSearchAlert from '../SaveNewSearchAlert';

const ResultsContainer = ({ results, isLoading, hasErrored, sortBy, pageCount, hasLoaded,
        defaultSort, pageSizes, defaultPageSize, refreshKey, pillFilters, userProfile,
        defaultPageNumber, queryParamUpdate, onToggle, onQueryParamToggle, scrollToTop,
        toggleFavorite, userProfileFavoritePositionIsLoading, newSavedSearchHasErrored,
        userProfileFavoritePositionHasErrored, saveSearch, newSavedSearchSuccess,
  }) => (
    <div className="results-container">
      {
        newSavedSearchSuccess &&
        <SaveNewSearchAlert newSavedSearchSuccess={newSavedSearchSuccess} />
      }
      <ResultsPillContainer
        items={pillFilters}
        onPillClick={onQueryParamToggle}
      />
      <SaveNewSearchContainer
        saveSearch={saveSearch}
        newSavedSearchSuccess={newSavedSearchSuccess}
        newSavedSearchHasErrored={newSavedSearchHasErrored}
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
          />
        </div>
      }
      {
       // if there's no results, don't show pagination
       !!results.results && !!results.results.length
       // also let page count initiate before trying to render
       && pageCount > 0 &&
       // finally, render the pagination
       <div className="usa-grid-full react-paginate">
         <PaginationWrapper
           pageCount={pageCount}
           onPageChange={(q) => {
             queryParamUpdate(q);
             scrollToTop();
           }
           }
           forcePage={defaultPageNumber}
         />
       </div>
     }
    </div>
);

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
  pageCount: PropTypes.number.isRequired,
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
  newSavedSearchSuccess: PropTypes.string.isRequired,
  newSavedSearchHasErrored: PropTypes.string.isRequired,
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
};

export default ResultsContainer;
