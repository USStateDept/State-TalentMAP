import React from 'react';
import PropTypes from 'prop-types';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SORT_BY_PARENT_OBJECT } from '../../Constants/PropTypes';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import ResultsControls from '../ResultsControls/ResultsControls';

const ResultsContainer = ({ results, isLoading, hasErrored, sortBy, pageCount, hasLoaded,
        defaultSort, pageSizes, defaultPageSize, defaultPageNumber, queryParamUpdate, onToggle,
  }) => (
    <div className="results-container">
      <ResultsControls
        results={results}
        hasLoaded={hasLoaded}
        defaultSort={defaultSort}
        pageSizes={pageSizes}
        defaultPageSize={defaultPageSize}
        sortBy={sortBy}
        defaultPageNumber={defaultPageNumber}
        queryParamUpdate={e => queryParamUpdate(e)}
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
           onPageChange={e => this.queryParamUpdate({ page: e.selected })}
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
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
  defaultPageNumber: PropTypes.number,
  pageCount: PropTypes.number.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

ResultsContainer.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  queryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
};

export default ResultsContainer;
