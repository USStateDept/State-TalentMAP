import React from 'react';
import PropTypes from 'prop-types';
import ResultsViewBy from '../ResultsViewBy/ResultsViewBy';
import TotalResults from '../TotalResults/TotalResults';
import SelectForm from '../SelectForm/SelectForm';
import { POSITION_SEARCH_RESULTS, SORT_BY_PARENT_OBJECT } from '../../Constants/PropTypes';

const ResultsControls = ({
    results,
    hasLoaded,
    defaultSort,
    pageSizes,
    defaultPageSize,
    defaultPageNumber,
    queryParamUpdate,
    sortBy }) => (
      <div className="usa-grid-full results-controls">
        <div className="usa-width-one-third total-results">
          {
          // if results have loaded, display the total number of results
          hasLoaded &&
            <TotalResults
              total={results.count}
              pageNumber={defaultPageNumber}
              pageSize={defaultPageSize}
            />
        }
        </div>
        <div className="usa-width-two-thirds drop-downs">
          <div className="results-dropdown results-dropdown-sort">
            <SelectForm
              id="sort"
              label="Sort by:"
              onSelectOption={e => queryParamUpdate({ ordering: e.target.value })}
              options={sortBy.options}
              defaultSort={defaultSort}
            />
          </div>
          <div className="results-dropdown results-dropdown-page-size">
            <SelectForm
              id="pageSize"
              label="Results:"
              onSelectOption={e => queryParamUpdate({ limit: e.target.value, page: 1 })}
              options={pageSizes.options}
              defaultSort={defaultPageSize}
            />
          </div>
          <ResultsViewBy />
        </div>
      </div>
);

ResultsControls.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
  hasLoaded: PropTypes.bool,
  defaultPageNumber: PropTypes.number,
  queryParamUpdate: PropTypes.func.isRequired,
};

ResultsControls.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  defaultSort: '',
  defaultPageSize: 10,
  defaultPageNumber: 0,
  hasLoaded: false,
};

export default ResultsControls;
