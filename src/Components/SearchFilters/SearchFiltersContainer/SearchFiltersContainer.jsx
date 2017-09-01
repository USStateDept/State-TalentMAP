import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';
import descriptionSort from './descriptionSort';

class SearchFiltersContainer extends Component { // eslint-disable-line
  onBooleanFilterClick(isChecked, code, selectionRef) {
    const object = Object.assign({});
    object[selectionRef] = isChecked ? code : '';
    this.props.queryParamUpdate(object);
  }
  render() {
    const booleanFilters = this.props.filters.filter(searchFilter => searchFilter.item.bool);

    const multiSelectFilters = this.props.filters.filter(
      searchFilter =>
        (
          searchFilter.item.description === 'skill' ||
          searchFilter.item.description === 'grade' ||
          searchFilter.item.description === 'tod' ||
          searchFilter.item.description === 'region' ||
          searchFilter.item.description === 'language'
        ),
    );

    const sortedFilters = multiSelectFilters.sort(descriptionSort);

    const multiSelectFilterList = sortedFilters.map(item => (
      { content:
        (<MultiSelectFilter
          key={item.item.title}
          item={item}
          queryParamToggle={(v, p, r) => { this.props.queryParamToggle(v, p, r); }}
        />),
        title: item.item.title,
        id: `accordion-${item.item.title}`,
        expanded: item.item.title === this.props.selectedAccordion,
      }
    ));

    return (
      <div>
        <MultiSelectFilterContainer
          setAccordion={a => this.props.setAccordion(a)}
          multiSelectFilterList={multiSelectFilterList}
        />
        <div className="boolean-filter-container">
          <BooleanFilterContainer
            filters={booleanFilters}
            onBooleanFilterClick={(e, code, ref, iterator, value) => {
              booleanFilters[iterator].data[0].isSelected = !value;
              this.onBooleanFilterClick(e, code, ref);
            }
            }
          />
        </div>
      </div>
    );
  }
}

SearchFiltersContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  selectedAccordion: PropTypes.string.isRequired,
  setAccordion: PropTypes.func.isRequired,
};

export default SearchFiltersContainer;
