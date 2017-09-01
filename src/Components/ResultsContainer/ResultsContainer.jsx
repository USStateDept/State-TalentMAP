import React from 'react';
import PropTypes from 'prop-types';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import ResultsControls from '../ResultsControls/ResultsControls';
import ResultsPillContainer from '../ResultsPillContainer/ResultsPillContainer';

const ResultsContainer = ({ results, isLoading, hasErrored, sortBy, pageCount, hasLoaded,
        defaultSort, pageSizes, defaultPageSize, refreshKey, pillFilters,
        defaultPageNumber, queryParamUpdate, onToggle, onQueryParamToggle,
  }) => (
    <div className="results-container">
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
      {
        // is not loading, results array exists, but is empty
        !isLoading && results.results && !results.results.length &&
          <div className="usa-grid-full no-results">
            <Alert title="No results found" messages={[{ body: 'Try broadening your search criteria' }]} />
          </div>
      }
      {
        <div className="results-list-container">
          <ResultsList
            key={refreshKey}
            onToggle={onToggle}
            results={results}
            isLoading={!hasLoaded}
          />
        </div>
      }
      {
        <Loading isLoading={isLoading} hasErrored={hasErrored} />
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
           onPageChange={queryParamUpdate}
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
};

export default ResultsContainer;
