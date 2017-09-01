import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import LanguageFilter from '../LanguageFilter/LanguageFilter';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT } from '../../../Constants/PropTypes';
import { titleSort, descriptionSort } from './descriptionSort';

class SearchFiltersContainer extends Component {
  onBooleanFilterClick(isChecked, code, selectionRef) {
    const object = Object.assign({});
    object[selectionRef] = isChecked ? code : '';
    this.props.queryParamUpdate(object);
  }
  render() {
    // get our boolean filters
    const booleanFilters = this.props.filters.filter(searchFilter => searchFilter.item.bool);

    // get our normal multi-select filters
    const multiSelectFilters = this.props.filters.filter(
      searchFilter =>
        (
          searchFilter.item.description === 'skill' ||
          searchFilter.item.description === 'grade' ||
          searchFilter.item.description === 'tod' ||
          searchFilter.item.description === 'region'
        ),
    );

    multiSelectFilters.forEach((filters, i) => {
      if (filters.item.description === 'skill') {
        multiSelectFilters[i].data = multiSelectFilters[i].data.sort(descriptionSort);
      }
    });

    // get our language filter, which we'll render differently
    const languageFilters = this.props.filters.filter(
      searchFilter =>
        (
          searchFilter.item.description === 'language'
        ),
    );

    // make sure we have an object to use in case there were no languages passed down
    const languageFilter = languageFilters.length ? languageFilters[0] : { item: {} };

    // languageFilters should only have one object, so we simply call languageFilters[0]
    const languageFilterObject =
      { content:
        (<LanguageFilter
          key={languageFilter.item.title}
          item={languageFilter}
          selectedAccordion={this.props.selectedAccordion}
          queryParamUpdate={(l) => {
            this.props.queryParamUpdate({ [languageFilter.item.selectionRef]: l });
          }}
          setAccordion={a => this.props.setAccordion({ main: 'Language', sub: a })}
        />),
        title: languageFilter.item.title,
        id: `accordion-${languageFilter.item.title}`,
        expanded: languageFilter.item.title === this.props.selectedAccordion.main,
      };

    const multiSelectFilterList = multiSelectFilters.map(item => (
      { content:
        (<MultiSelectFilter
          key={item.item.title}
          item={item}
          queryParamToggle={(v, p, r) => { this.props.queryParamToggle(v, p, r); }}
        />),
        title: item.item.title,
        id: `accordion-${item.item.title}`,
        expanded: item.item.title === this.props.selectedAccordion.main,
      }
    ));

    const sortedFilters = multiSelectFilterList.sort(titleSort);
    sortedFilters.push(languageFilterObject);

    return (
      <div>
        <MultiSelectFilterContainer
          setAccordion={(a, b) => this.props.setAccordion({ main: a, sub: b })}
          multiSelectFilterList={sortedFilters}
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
  selectedAccordion: ACCORDION_SELECTION_OBJECT.isRequired,
  setAccordion: PropTypes.func.isRequired,
};

export default SearchFiltersContainer;
