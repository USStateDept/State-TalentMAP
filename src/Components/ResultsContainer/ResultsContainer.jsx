import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { connect } from 'react-redux';
import Sticky from 'react-sticky-el';
import ErrorBoundary from 'Components/ErrorBoundary';
import ResultsList from 'Components/ResultsList/ResultsList';
import ScrollUpButton from '../ScrollUpButton';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import { BIDDER_OBJECT, BID_RESULTS, EMPTY_FUNCTION,
  PILL_ITEM_ARRAY, POSITION_SEARCH_RESULTS, SORT_BY_PARENT_OBJECT,
  USER_PROFILE } from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import Alert from '../Alert/Alert';
import ResultsControls from '../ResultsControls/ResultsControls';
import ResultsPillContainer from '../ResultsPillContainer/ResultsPillContainer';
import { SaveNewSearchDialog, Trigger } from '../SaveNewSearch';
import MediaQuery from '../MediaQuery';
import SelectForm from '../SelectForm/SelectForm';
import InteractiveElement from '../InteractiveElement';
import { toggleMobileFilter } from '../../actions/showMobileFilter';

class ResultsContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  onPageChange = q => {
    this.props.queryParamUpdate(q);
    this.props.scrollToTop();
  };

  onSelectOrdering = e => {
    this.props.queryParamUpdate({ ordering: e.target.value });
  };

  render() {
    const { results, isLoading, hasErrored, sortBy, pageSize, hasLoaded, totalResults,
      defaultSort, pageSizes, defaultPageSize, refreshKey, pillFilters, userProfile,
      defaultPageNumber, queryParamUpdate, onQueryParamToggle, bidList, toggle,
      client } = this.props;

    const { isTandemSearch } = this.context;
    return (
      <div className="results-container">
        <MediaQuery breakpoint="screenSmMax" widthType="max">
          {
            matches => (matches &&
              (
                <div className="usa-width-one-whole mobile-controls">
                  {
                    isTandemSearch &&
                    <Trigger isPrimary>
                      <button className="usa-button-secondary">Save Tandem Search</button>
                    </Trigger>
                  }
                  {
                    !isTandemSearch &&
                    <Trigger isPrimary>
                      <button className="usa-button-secondary">Save Search</button>
                    </Trigger>
                  }
                  <InteractiveElement onClick={toggle} className="filter-button">Filter</InteractiveElement>
                  <div className="results-dropdown results-dropdown-sort">
                    <SelectForm
                      id="sort"
                      label="Sort by:"
                      labelSrOnly
                      onSelectOption={this.onSelectOrdering}
                      options={sortBy.options}
                      defaultSort={defaultSort}
                      className="select-blue select-offset select-small"
                    />
                  </div>
                </div>
              )
            )
          }
        </MediaQuery>
        <Sticky topOffset={0} hideOnBoundaryHit={false} stickyClassName={`${isEmpty(client) ? 'sticky' : 'controls-sticky-client-view'}`}>
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
        </Sticky>
        <SaveNewSearchDialog />
        {
          // is not loading, results array exists, but is empty
          !isLoading && results.results && !results.results.length && !hasErrored &&
            <div className="usa-grid-full no-results">
              <Alert title="No results found" messages={[{ body: 'Try broadening your search criteria' }]} />
            </div>
        }
        {
          // is not loading and has errored
          !isLoading && hasErrored &&
            <div className="usa-grid-full no-results">
              <Alert type="error" title="An error has occurred" messages={[{ body: 'Try performing another search' }]} />
            </div>
        }
        {
          <div className="results-list-container">
            {
              isLoading && !hasErrored &&
                <Spinner size="big" type="position-results" />
            }
            <ErrorBoundary>
              <ResultsList
                key={refreshKey}
                results={results}
                isLoading={!hasLoaded}
                favorites={userProfile.favorite_positions}
                favoritesPV={userProfile.favorite_positions_pv}
                favoritesTandem={userProfile.favorite_tandem_positions}
                favoritesPVTandem={userProfile.favorite_tandem_positions_pv}
                bidList={bidList}
              />
            </ErrorBoundary>
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
            <ScrollUpButton />
          </div>
        }
      </div>
    );
  }
}

ResultsContainer.contextTypes = {
  isTandemSearch: PropTypes.bool,
};

ResultsContainer.propTypes = {
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  queryParamUpdate: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.number,
  defaultPageNumber: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  refreshKey: PropTypes.number, // refresh components that rely on local storage
  pillFilters: PILL_ITEM_ARRAY,
  scrollToTop: PropTypes.func,
  userProfile: USER_PROFILE,
  totalResults: PropTypes.number,
  bidList: BID_RESULTS.isRequired,
  toggle: PropTypes.func,
  client: BIDDER_OBJECT,
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
  toggle: EMPTY_FUNCTION,
  client: {},
};

export const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleMobileFilter(true)),
});

export default connect(null, mapDispatchToProps)(ResultsContainer);
