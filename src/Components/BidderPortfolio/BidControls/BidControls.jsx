import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import PreferenceWrapper from 'Containers/PreferenceWrapper';
import {
  BID_PORTFOLIO_SORTS, BID_PORTFOLIO_FILTERS, BID_PORTFOLIO_SORTS_TYPE,
  BID_PORTFOLIO_FILTERS_TYPE, CLIENTS_PAGE_SIZES } from 'Constants/Sort';
import { filter, findIndex, get, indexOf } from 'lodash';
import ResultsPillContainer from '../../ResultsPillContainer/ResultsPillContainer';
import SelectForm from '../../SelectForm';
import ResultsViewBy from '../../ResultsViewBy/ResultsViewBy';
import BidCyclePicker from './BidCyclePicker';
import CDOAutoSuggest from '../CDOAutoSuggest';
import ResetFilters from '../../ResetFilters/ResetFilters';

const useCDOSeasonFilter = () => checkFlag('flags.cdo_season_filter');

class BidControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSeasons: true,
      pillFilters: {
        proxyCdos: [],
        displayClients: {},
        bidSeason: [],
        filterBy: {},
        sortBy: {},
      },
      pills: [],
    };
  }

  // eslint-disable-next-line react/sort-comp
  cdosUpdated = q => {
    this.state.pillFilters.proxyCdos = q;
    this.generatePills();
  };

  updateQueryLimit = q => {
    this.state.pillFilters.displayClients = CLIENTS_PAGE_SIZES.options[
      findIndex(CLIENTS_PAGE_SIZES.options, (o) => o.value === parseInt(q.target.value, 10))];
    this.props.queryParamUpdate({ limit: q.target.value });
    this.generatePills();
  };

  onSeasonChange = seasons => {
    this.state.pillFilters.bidSeason = seasons;
    const hasSeasons = !!seasons.length;
    if (hasSeasons !== this.state.hasSeasons) {
      this.setState({ hasSeasons });
    }
    this.generatePills();
  };

  onFilterChange = q => {
    this.state.pillFilters.filterBy = BID_PORTFOLIO_FILTERS.options[
      findIndex(BID_PORTFOLIO_FILTERS.options, (o) => o.value === q.target.value)];
    const orderingObject = { hasHandshake: q.target.value };
    this.props.queryParamUpdate(orderingObject);
    this.generatePills();
  };

  onSortChange = q => {
    this.state.pillFilters.sortBy = BID_PORTFOLIO_SORTS.options[
      findIndex(BID_PORTFOLIO_SORTS.options, (o) => o.value === q.target.value)];
    const orderingObject = { ordering: q.target.value };
    this.props.queryParamUpdate(orderingObject);
    this.generatePills();
  };

  generatePills = (clearAll) => {
    const pills = [];
    if (!clearAll) {
      this.state.pillFilters.proxyCdos.forEach(a => {
        pills.push({ description: a.name, selectionRef: 'proxyCdos', codeRef: a.hru_id });
      });
      if (indexOf(['', 5], get(this.state.pillFilters, 'displayClients.value', '')) === -1) {
        pills.push({
          description: this.state.pillFilters.displayClients.text,
          selectionRef: 'displayClients' });
      }
      this.state.pillFilters.bidSeason.forEach(a => {
        pills.push({ description: a.description, selectionRef: 'bidSeason', codeRef: a.id });
      });
      if (indexOf([''], get(this.state.pillFilters, 'filterBy.value', '')) === -1) {
        pills.push({
          description: this.state.pillFilters.filterBy.text,
          selectionRef: 'filterBy',
          codeRef: this.state.pillFilters.filterBy.value,
        });
      }
      if (indexOf(['', 'client_last_name'], get(this.state.pillFilters, 'sortBy.value', '')) === -1) {
        pills.push({
          description: this.state.pillFilters.sortBy.text,
          selectionRef: 'sortBy',
          codeRef: this.state.pillFilters.sortBy.value,
        });
      }
    }

    this.state.pills = pills;
    // need a way to get the pills to regenerate.
  };

  resetAllFilters = () => {
    this.state.pillFilters = {
      proxyCdos: [],
      displayClients: '',
      bidSeason: [],
      filterBy: '',
      sortBy: '',
    };
    this.generatePills(true);
  };

  // eslint-disable-next-line no-unused-vars
  pillClick = (filterID, pillID, c) => {
    switch (filterID) {
      case 'proxyCdos':
        this.state.pillFilters.proxyCdos =
            filter(this.state.pillFilters.proxyCdos, (o) => o.id !== pillID);
        break;
      case 'displayClients':
        this.state.pillFilters.displayClients = '5';
        break;
      case 'bidSeason':
        // eslint-disable-next-line no-console
        // console.log(filterID, pillID, c);
        break;
      case 'filterBy':
        this.state.pillFilters.filterBy = this.props.defaultHandshake;
        break;
      case 'sortBy':
        this.state.pillFilters.sortBy = this.props.defaultOrdering;
        break;
      default:
    }
    this.generatePills();
  };

  render() {
    const { viewType, changeViewType, defaultHandshake,
      defaultOrdering, pageSize } = this.props;
    const { hasSeasons, pillFilters, pills } = this.state;
    const pageSizes = CLIENTS_PAGE_SIZES.options;

    const displayCDOSeasonFilter = useCDOSeasonFilter();
    const showClear = !!pillFilters.proxyCdos.length;

    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents bid-cycle-picker-container" style={{ float: 'left' }}>
            <div className="label">Proxy CDO View:</div>
            {/* CDOAutoSuggest doesn't automatically update when cdoPills updates. */}
            <CDOAutoSuggest
              updateCDOs={this.cdosUpdated}
              cdoPills={this.state.pillFilters.proxyCdos}
            />
          </div>
          {displayCDOSeasonFilter &&
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
        <ResultsPillContainer
          items={pills}
          onPillClick={this.pillClick}
        />
        <div className="filter-control-right">
          { showClear && <ResetFilters resetFilters={this.resetAllFilters} clearText="Deselect All" /> }
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
