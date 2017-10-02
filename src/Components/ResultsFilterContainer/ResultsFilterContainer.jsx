import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT } from '../../Constants/PropTypes';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import SearchFiltersContainer from '../SearchFilters/SearchFiltersContainer/SearchFiltersContainer';
import ResetFilters from '../ResetFilters/ResetFilters';

class ResultsFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.onQueryParamToggle = this.onQueryParamToggle.bind(this);
  }

  onQueryParamUpdate(e) {
    this.props.onQueryParamUpdate(e);
    this.props.onChildToggle();
  }

  onQueryParamToggle(param, value, remove) {
    this.props.onQueryParamToggle(param, value, remove);
    this.props.onChildToggle();
  }

  render() {
    const { filters, resetFilters, setAccordion, selectedAccordion } = this.props;
    return (
      <div className="filter-container">
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
              queryParamUpdate={this.onQueryParamUpdate}
              queryParamToggle={this.onQueryParamToggle}
              selectedAccordion={selectedAccordion}
              setAccordion={setAccordion}
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
