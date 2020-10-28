import { Component } from 'react';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import PreferenceWrapper from 'Containers/PreferenceWrapper';
import {
  BID_PORTFOLIO_SORTS, BID_PORTFOLIO_FILTERS, BID_PORTFOLIO_SORTS_TYPE,
  BID_PORTFOLIO_FILTERS_TYPE, CLIENTS_PAGE_SIZES } from 'Constants/Sort';
import { filter, findIndex, get, indexOf, isEqual } from 'lodash';
import { connect } from 'react-redux';
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
      proxyCdos: this.props.selection || [],
      bidSeasons: [],
      filterBy: {},
      pills: [],
    };
  }

  UNSAFE_componentWillMount() {
    if (!(this.props.selection.length === 1 && get(this.props, 'selection[0].isCurrentUser', false))) {
      this.setState({ proxyCdos: this.props.selection }, this.generatePills);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.selection, nextProps.selection)) {
      if (!(nextProps.selection.length === 1 && get(nextProps, 'selection[0].isCurrentUser', false))) {
        this.setState({ proxyCdos: nextProps.selection }, this.generatePills);
      }
    }
  }

  onSeasonChange = seasons => {
    const hasSeasons = !!seasons.length;
    if (!isEqual(hasSeasons, this.state.hasSeasons)) {
      this.setState({ hasSeasons });
    }
    if (!isEqual(seasons, this.state.bidSeasons)) {
      this.setState({ bidSeasons: seasons }, this.generatePills);
    }
  };

  onFilterChange = q => {
    this.setState({ filterBy: BID_PORTFOLIO_FILTERS.options[
      findIndex(BID_PORTFOLIO_FILTERS.options, (o) => o.value === q.target.value)] },
    this.generatePills);
    const orderingObject = { hasHandshake: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  };

  onSortChange = q => {
    const orderingObject = { ordering: q.target.value };
    this.props.queryParamUpdate(orderingObject);
  };

  updateQueryLimit = q => {
    this.props.queryParamUpdate({ limit: q.target.value });
  };

  generatePills = () => {
    const pills = [];
    this.state.proxyCdos.forEach(a => {
      pills.push({ description: a.name, selectionRef: 'proxyCdos', codeRef: a.hru_id });
    });
    this.state.bidSeasons.forEach(a => {
      pills.push({ description: a.description, selectionRef: 'bidSeasons', codeRef: a.id });
    });
    if (indexOf([''], get(this.state, 'filterBy.value', '')) === -1 && this.state.bidSeasons.length) {
      pills.push({
        description: this.state.filterBy.text,
        selectionRef: 'filterBy',
        codeRef: this.state.filterBy.value,
      });
    }
    this.setState({ pills });
  };

  resetAllFilters = () => {
    this.setState({ proxyCdos: [] });
    this.updateMultiSelect([]);
    this.onFilterChange({ target: { value: BID_PORTFOLIO_FILTERS.options[0].value } });
  };

  pillClick = (dropdownID, pillID) => {
    switch (dropdownID) {
      case 'proxyCdos':
        this.setState({ proxyCdos:
                filter(this.state.proxyCdos, (o) => o.id !== pillID) }, this.generatePills);
        break;
      case 'bidSeasons':
        this.updateMultiSelect(filter(this.state.bidSeasons, (o) => o.id !== pillID));
        break;
      case 'filterBy':
        this.onFilterChange({ target: { value: BID_PORTFOLIO_FILTERS.options[0].value } });
        break;
      default:
    }
  };

  render() {
    const { viewType, changeViewType, defaultHandshake,
      defaultOrdering, pageSize } = this.props;
    const { hasSeasons, pills, proxyCdos } = this.state;
    const pageSizes = CLIENTS_PAGE_SIZES.options;
    const displayCDOSeasonFilter = useCDOSeasonFilter();
    const showClear = !!pills.length;

    return (
      <div className="usa-grid-full portfolio-controls">
        <div className="usa-width-one-whole portfolio-sort-container results-dropdown">
          <div className="portfolio-sort-container-contents bid-cycle-picker-container" style={{ float: 'left' }}>
            <div className="label">Proxy CDO View:</div>
            <CDOAutoSuggest
              cdoPills={proxyCdos}
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
            <BidCyclePicker
              setSeasonsCb={this.onSeasonChange}
              setClick={(a) => { this.updateMultiSelect = a; }}
            />
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
        <div className="usa-width-one-whole portfolio-filter-pills-container">
          { showClear && <ResetFilters resetFilters={this.resetAllFilters} /> }
          <ResultsPillContainer
            items={pills}
            onPillClick={this.pillClick}
          />
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
  selection: PropTypes.arrayOf(PropTypes.shape({})),
};

BidControls.defaultProps = {
  pageSize: 0,
  selection: [],
};

const mapStateToProps = state => ({
  selection: state.bidderPortfolioSelectedCDOsToSearchBy,
});

export default connect(mapStateToProps)(BidControls);
