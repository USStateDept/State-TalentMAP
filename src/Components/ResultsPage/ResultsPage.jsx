import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SORT_BY_PARENT_OBJECT } from '../../Constants/PropTypes';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import ResetFiltersConnect from '../ResetFilters/ResetFiltersConnect';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import TotalResults from '../TotalResults/TotalResults';
import SelectForm from '../SelectForm/SelectForm';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
  }

  queryParamUpdate(e) {
    this.props.onQueryParamUpdate(e);
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultSort, pageSizes, defaultPageSize }
      = this.props;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    const pageCount = Math.ceil(results.count / defaultPageSize);
    return (
      <div className="results">
        <div className="usa-grid-full top-nav">
          <div className="usa-width-one-third compare-link">
            <ViewComparisonLink onToggle={() => this.onChildToggle()} />
          </div>
          <div className="usa-width-one-third reset-filters">
            <ResetFiltersConnect />
          </div>
          <div className="usa-width-one-third reset-comparisons">
            <ResetComparisons onToggle={() => this.onChildToggle()} />
          </div>
        </div>
        <div className="usa-grid-full">
          <div className="filter-container" />
          <div className="results-container">
            <div className="usa-grid-full results-controls">
              <div className="usa-width-one-third total-results">
                {
                  // if results have loaded, display the total number of results
                  hasLoaded &&
                    <TotalResults
                      total={results.count}
                      pageNumber={this.props.defaultPageNumber}
                      pageSize={this.props.defaultPageSize}
                    />
                }
              </div>
              <div className="usa-width-two-thirds" style={{ float: 'right', marginTop: '4px' }}>
                <div style={{ float: 'left', marginLeft: '10px' }} className="results-dropdown">
                  <SelectForm
                    id="sort"
                    label="Sort by:"
                    onSelectOption={e => this.queryParamUpdate({ ordering: e.target.value })}
                    options={sortBy.options}
                    defaultSort={defaultSort}
                  />
                </div>
                <div className="results-dropdown results-dropdown-page-size">
                  <SelectForm
                    id="pageSize"
                    label="Results:"
                    onSelectOption={e => this.queryParamUpdate({ limit: e.target.value, page: 1 })}
                    options={pageSizes.options}
                    defaultSort={defaultPageSize}
                  />
                </div>
                <div className="results-viewby-container">
                  <div className="view-label">View:</div>
                  <div className="view-icon">
                    <FontAwesome name="th-list" />
                  </div>
                  <div className="view-icon view-icon-border">
                    <FontAwesome name="th" />
                  </div>
                </div>
              </div>
            </div>
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
                  key={this.state.key}
                  onToggle={() => this.onChildToggle()}
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
                 forcePage={this.props.defaultPageNumber}
               />
             </div>
           }
          </div>
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
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
  defaultPageNumber: PropTypes.number,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onQueryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
