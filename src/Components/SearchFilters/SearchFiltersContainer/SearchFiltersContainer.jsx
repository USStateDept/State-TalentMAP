import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

const shortid = require('shortid');

class SearchFiltersContainer extends Component { // eslint-disable-line
  render() {
    const onBooleanFilterClick = (isChecked, code, selectionRef) => {
      const object = Object.assign({});
      object[selectionRef] = isChecked ? code : '';
      this.props.queryParamUpdate(object);
    };

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

    const multiSelectFilterList = multiSelectFilters.map((item, i) => ( // eslint-disable-line
      { content:
        (<MultiSelectFilter
          key={shortid.generate()}
          item={item}
          queryParamToggle={(v, p, r) => { this.props.queryParamToggle(v, p, r); }}
        />),
        title: item.item.title,
        id: `accordion-${item.item.title}`,
        expanded: item.item.title === this.props.selectedAccordion,
      }
    )).sort((a, b) => { // sort our pills by description
      const A = a.title.toLowerCase();
      const B = b.title.toLowerCase();
      if (A < B) { // sort string ascending
        return -1;
      }
      if (A > B) { return 1; }
      return 0; // default return value (no sorting)
    });

    return (
      <div>
        <MultiSelectFilterContainer
          setAccordion={a => this.props.setAccordion(a)}
          multiSelectFilterList={multiSelectFilterList}
        />
        <div>
          <BooleanFilterContainer
            filters={booleanFilters}
            onBooleanFilterClick={(e, code, ref, iterator, value) => {
              booleanFilters[iterator].data[0].isSelected = !value;
              onBooleanFilterClick(e, code, ref);
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
