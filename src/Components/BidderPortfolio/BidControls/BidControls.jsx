import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import SelectForm from '../../SelectForm';
import { BID_PORTFOLIO_SORTS, BID_PORTFOLIO_FILTERS } from '../../../Constants/Sort';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import BidCyclePicker from './BidCyclePicker';
import CDOAutoSuggest from '../CDOAutoSuggest';

const useCDOSeasonFilter = () => checkFlag('flags.cdo_season_filter');

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }
  onSortChange(q) {
    const orderingObject = { ordering: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  }
  onFilterChange(q) {
    const orderingObject = { hasHandshake: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  }
  render() {
    const { viewType, changeViewType } = this.props;
    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents bid-cycle-picker-container" style={{ float: 'left' }}>
            <div className="label">Proxy CDO View:</div>
            <CDOAutoSuggest />
          </div>
          {useCDOSeasonFilter() &&
          <div className="portfolio-sort-container-contents">
            <BidCyclePicker />
            <SelectForm
              id="porfolio-filter"
              options={BID_PORTFOLIO_FILTERS.options}
              label="Filter by:"
              onSelectOption={this.onFilterChange}
            />
            <SelectForm
              id="porfolio-sort"
              options={BID_PORTFOLIO_SORTS.options}
              label="Sort by:"
              onSelectOption={this.onSortChange}
            />
          </div>}
        </div>
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <ResultsViewBy initial={viewType} onClick={changeViewType} />
        </div>
      </div>
    );
  }
}

BidControls.propTypes = {
  queryParamUpdate: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
  changeViewType: PropTypes.func.isRequired,
};

export default BidControls;
