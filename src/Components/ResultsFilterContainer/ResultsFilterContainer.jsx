import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import SearchBar from '../SearchBar/SearchBar';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer/SearchFiltersContainer';
import ResetFilters from '../ResetFilters/ResetFilters';

class ResultsFilterContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div className="filter-container">
        <div className="usa-grid-full filter-container-top">
          Keywords
        </div>
        <div className="usa-grid-full filter-container-search">
          <SearchBar
            id="searchbar-filter-container"
            type="small"
            submitText="search"
            placeholder="Position, Region, Posts"
          />
        </div>
        <div className="filter-container-bottom">
          <div className="filter-control-container">
            <div className="filter-control-left">Select Filter</div>
            <div className="filter-control-right">
              <ResetFilters resetFilters={this.props.resetFilters} />
            </div>
          </div>
          <br />
          <div className="usa-grid-full search-filters-container">
            <SearchFiltersContainer
              filters={this.props.filters}
              queryParamUpdate={(e) => {
                this.props.onQueryParamUpdate(e); this.props.onChildToggle();
              }}
              queryParamToggle={(p, v, r) => {
                this.props.onQueryParamToggle(p, v, r); this.props.onChildToggle();
              }}
              selectedAccordion={this.props.selectedAccordion}
              setAccordion={this.props.setAccordion}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResultsFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onQueryParamUpdate: PropTypes.func.isRequired,
  onChildToggle: PropTypes.func.isRequired,
  onQueryParamToggle: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  setAccordion: PropTypes.func.isRequired,
  selectedAccordion: ACCORDION_SELECTION_OBJECT,
};

ResultsFilterContainer.defaultProps = {
  selectedAccordion: ACCORDION_SELECTION,
};

export default ResultsFilterContainer;
