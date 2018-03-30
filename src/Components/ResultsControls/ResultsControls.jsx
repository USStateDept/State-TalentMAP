import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TotalResults from '../TotalResults/TotalResults';
import SelectForm from '../SelectForm/SelectForm';
import { POSITION_SEARCH_RESULTS, SORT_BY_PARENT_OBJECT } from '../../Constants/PropTypes';

class ResultsControls extends Component {
  constructor(props) {
    super(props);
    this.onSelectOrdering = this.onSelectOrdering.bind(this);
    this.onSelectLimit = this.onSelectLimit.bind(this);
  }

  onSelectOrdering(e) {
    this.props.queryParamUpdate({ ordering: e.target.value });
  }

  onSelectLimit(e) {
    this.props.queryParamUpdate({ limit: e.target.value });
  }

  render() {
    const { results, hasLoaded, defaultSort, pageSizes,
            defaultPageSize, defaultPageNumber, sortBy } = this.props;
    return (
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
          <div className="dropdowns-container">
            <div className="results-dropdown results-dropdown-sort">
              <SelectForm
                id="sort"
                label="Sort by:"
                onSelectOption={this.onSelectOrdering}
                options={sortBy.options}
                defaultSort={defaultSort}
                className="select-blue select-offset select-small"
              />
            </div>
            <div className="results-dropdown results-dropdown-page-size">
              <SelectForm
                id="pageSize"
                label="Results:"
                onSelectOption={this.onSelectLimit}
                options={pageSizes.options}
                defaultSort={defaultPageSize}
                className="select-blue select-offset select-small"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
