import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import LanguageFilter from '../LanguageFilter/LanguageFilter';
import { FILTER_ITEMS_ARRAY, ACCORDION_SELECTION_OBJECT } from '../../../Constants/PropTypes';
import { propSort } from '../../../utilities';

class SearchFiltersContainer extends Component {

  constructor(props) {
    super(props);
    this.onSetAccordion = this.onSetAccordion.bind(this);
    this.onSetAccordionLanguage = this.onSetAccordionLanguage.bind(this);
  }

  onBooleanFilterClick(isChecked, code, selectionRef) {
    const object = Object.assign({});
    object[selectionRef] = isChecked ? code : '';
    this.props.queryParamUpdate(object);
  }

  onSetAccordion(a, b) {
    this.props.setAccordion({ main: a, sub: b });
  }

  onSetAccordionLanguage(a) {
    this.props.setAccordion({ main: 'Language', sub: a });
  }
  render() {
    // get our boolean filter names
    const sortedBooleanNames = ['Post Differential', 'Danger Pay', 'COLA', 'Domestic'];

    // store filters in Map
    const booleanFiltersMap = new Map();
    this.props.filters.forEach((searchFilter) => {
      if (searchFilter.item.bool) {
        booleanFiltersMap.set(searchFilter.item.title, searchFilter);
      }
    });

    // sort boolean filters by sortedBooleanNames
    // pull from Map
    const booleanFilters = [];
    sortedBooleanNames.forEach((b) => {
      const filter = booleanFiltersMap.get(b);
      if (filter) {
        booleanFilters.push(filter);
      }
    });

    // get our normal multi-select filters
    const multiSelectFilterNames = ['region', 'skill', 'grade', 'tod'];

    // create map
    const multiSelectFilterMap = new Map();

    // pull filters from props and add to Map
    this.props.filters.forEach((f) => {
      if (multiSelectFilterNames.indexOf(f.item.description) > -1) {
        // extra handling for skill
        if (f.item.description === 'skill') {
          f.data.sort(propSort('description'));
        }
        // add to Map
        multiSelectFilterMap.set(f.item.description, f);
      }
    });

    // get our language filter, which we'll render differently
    const languageFilters = this.props.filters.find(
      searchFilter =>
        (
          searchFilter.item.description === 'language'
        ),
    );

    // make sure we have an object to use in case there were no languages passed down
    const languageFilter = languageFilters || { item: {} };

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
          setAccordion={this.onSetAccordionLanguage}
        />),
        title: languageFilter.item.title,
        id: `accordion-${languageFilter.item.title}`,
        expanded: languageFilter.item.title === this.props.selectedAccordion.main,
      };

    // adding filters based on multiSelectFilterNames
    const sortedFilters = [];
    multiSelectFilterNames.forEach((n) => {
      const item = multiSelectFilterMap.get(n);
      if (item) {
        sortedFilters.push(
          { content:
            (<MultiSelectFilter
              key={item.item.title}
              item={item}
              queryParamToggle={this.props.queryParamToggle}
            />),
            title: item.item.title,
            id: `accordion-${item.item.title}`,
            expanded: item.item.title === this.props.selectedAccordion.main,
          },
        );
      }
    });
    // add language last
    sortedFilters.push(languageFilterObject);

    return (
      <div>
        <MultiSelectFilterContainer
          setAccordion={this.onSetAccordion}
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
