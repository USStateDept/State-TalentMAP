import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SORT_BY_PARENT_OBJECT, PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import ResetFilters from '../ResetFilters/ResetFilters';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import ResultsSearchHeader from '../ResultsSearchHeader/ResultsSearchHeader';
import SearchBar from '../SearchBar/SearchBar';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer/SearchFiltersContainer';

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
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultKeyword, defaultLocation, resetFilters,
            pillFilters, defaultSort, pageSizes, defaultPageSize, onQueryParamToggle,
            defaultPageNumber, onQueryParamUpdate, filters, defaultFilters, // eslint-disable-line
            selectedAccordion, setAccordion }
      = this.props;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    const pageCount = Math.ceil(results.count / defaultPageSize);
    return (
      <div className="results">
        <ResultsSearchHeader
          queryParamUpdate={e => onQueryParamUpdate(e)}
          defaultKeyword={defaultKeyword}
          defaultLocation={defaultLocation}
        />
        <div className="usa-grid-full top-nav">
          <div className="usa-width-one-third compare-link">
            <ViewComparisonLink onToggle={() => this.onChildToggle()} />
          </div>
          <div className="usa-width-one-third reset-comparisons">
            <ResetComparisons onToggle={() => this.onChildToggle()} />
          </div>
        </div>
        <div className="usa-grid-full results-section-container">
          <div className="filter-container" style={{ fontSize: '.8em', padding: '15px 10px' }}>
            <div className="usa-grid-full" style={{ color: 'white', marginBottom: '.5em' }}>
              Keywords
            </div>
            <div className="usa-grid-full">
              <SearchBar
                id="searchbar-filter-container"
                type="small"
                onChangeText={() => {}}
                onSubmitSearch={() => {}}
                submitText="search"
                placeholder="Position, Region, Posts"
              />
            </div>
            <div style={{ margin: '15px 0', color: 'white' }}>
              <div style={{ width: '50%', float: 'left' }}>Select Filter</div>
              <div style={{ width: '50%', float: 'left' }}><ResetFilters resetFilters={() => resetFilters()} /></div>
              <br />
              <div className="usa-grid-full search-filters-container">
                <SearchFiltersContainer
                  filters={filters}
                  queryParamUpdate={(e) => { onQueryParamUpdate(e); this.onChildToggle(); }}
                  queryParamToggle={(p, v, r) => {
                    onQueryParamToggle(p, v, r); this.onChildToggle();
                  }}
                  selectedAccordion={selectedAccordion}
                  setAccordion={a => setAccordion(a)}
                />
              </div>
            </div>
          </div>
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
            queryParamUpdate={e => onQueryParamUpdate(e)}
            refreshKey={this.state.key}
            onToggle={() => this.onChildToggle()}
            pillFilters={pillFilters}
            onQueryParamToggle={(p, v, r) => onQueryParamToggle(p, v, r)}
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
  selectedAccordion: PropTypes.string,
  setAccordion: PropTypes.func.isRequired,
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
  selectedAccordion: '',
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
