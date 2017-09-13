import React from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import SearchBar from '../SearchBar/SearchBar';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer/SearchFiltersContainer';
import ResetFilters from '../ResetFilters/ResetFilters';

const ResultsFilterContainer = ({ filters, onQueryParamUpdate, onChildToggle,
  onQueryParamToggle, resetFilters, setAccordion, selectedAccordion }) => (
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
            <ResetFilters resetFilters={resetFilters} />
          </div>
        </div>
        <br />
        <div className="usa-grid-full search-filters-container">
          <SearchFiltersContainer
            filters={filters}
            queryParamUpdate={(e) => {
              onQueryParamUpdate(e);
              onChildToggle();
            }}
            queryParamToggle={(param, value, remove) => {
              onQueryParamToggle(param, value, remove);
              onChildToggle();
            }}
            selectedAccordion={selectedAccordion}
            setAccordion={setAccordion}
          />
        </div>
      </div>
    </div>
);

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
