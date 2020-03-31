import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import PreferenceWrapper from 'Containers/PreferenceWrapper';
import {
  BID_PORTFOLIO_SORTS, BID_PORTFOLIO_FILTERS, BID_PORTFOLIO_SORTS_TYPE,
  BID_PORTFOLIO_FILTERS_TYPE, CLIENTS_PAGE_SIZES } from 'Constants/Sort';
import SelectForm from '../../SelectForm';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import BidCyclePicker from './BidCyclePicker';
import CDOAutoSuggest from '../CDOAutoSuggest';

const useCDOSeasonFilter = () => checkFlag('flags.cdo_season_filter');

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSeasons: true,
    };
  }

  onSortChange = q => {
    const orderingObject = { ordering: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  };

  onFilterChange = q => {
    const orderingObject = { hasHandshake: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  };

  onSeasonChange = seasons => {
    const hasSeasons = !!seasons.length;
    if (hasSeasons !== this.state.hasSeasons) {
      this.setState({ hasSeasons });
    }
  };

  updateQueryLimit = q => {
    this.props.queryParamUpdate({ limit: q.target.value });
  };

  render() {
    const { viewType, changeViewType, defaultHandshake,
      defaultOrdering, pageSize } = this.props;
    const { hasSeasons } = this.state;
    const pageSizes = CLIENTS_PAGE_SIZES.options;

    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents bid-cycle-picker-container" style={{ float: 'left' }}>
            <div className="label">Proxy CDO View:</div>
            <CDOAutoSuggest />
          </div>
          {useCDOSeasonFilter() &&
          <div className="portfolio-sort-container-contents small-screen-stack">
            <SelectForm
              id="num-clients"
              label="Display Clients:"
              options={pageSizes}
              defaultSort={pageSize}
              onSelectOption={this.updateQueryLimit}
            />
            <BidCyclePicker setSeasonsCb={this.onSeasonChange} />
            {
              <PreferenceWrapper
                onSelect={this.onFilterChange}
                keyRef={BID_PORTFOLIO_FILTERS_TYPE}
              >
                <SelectForm
                  id="porfolio-filter"
                  options={BID_PORTFOLIO_FILTERS.options}
                  label="Filter By:"
                  defaultSort={defaultHandshake}
                  disabled={!hasSeasons}
                />
              </PreferenceWrapper>
            }
            <PreferenceWrapper
              onSelect={this.onSortChange}
              keyRef={BID_PORTFOLIO_SORTS_TYPE}
            >
              <SelectForm
                id="porfolio-sort"
                options={BID_PORTFOLIO_SORTS.options}
                label="Sort By:"
                defaultSort={defaultOrdering}
              />
            </PreferenceWrapper>
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
  defaultHandshake: PropTypes.string.isRequired,
  defaultOrdering: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
};

BidControls.defaultProps = {
  pageSize: 0,
};

export default BidControls;
