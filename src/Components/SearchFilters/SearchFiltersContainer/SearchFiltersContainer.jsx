import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';
import Accordion from '../../Accordion/Accordion';
import FieldSet from '../../FieldSet/FieldSet';

const shortid = require('shortid');

class SearchFiltersContainer extends Component { // eslint-disable-line
  render() {
    const booleanFilters = this.props.filters.filter(searchFilter => searchFilter.item.bool);

    const multiSelectFilters = this.props.filters.filter(
      searchFilter =>
        (
          searchFilter.item.description === 'skill' ||
          searchFilter.item.description === 'grade' ||
          searchFilter.item.description === 'tod' ||
          searchFilter.item.description === 'region'
        ),
    );

    const onBooleanFilterClick = (isChecked, code, selectionRef) => {
      const object = Object.assign({});
      object[selectionRef] = isChecked ? code : '';
      this.props.queryParamUpdate(object);
    };

    const multiSelectFilterList = multiSelectFilters.map((item, i) => ( // eslint-disable-line
      { content:
  <FieldSet key={shortid.generate()} legend={item.item.title}>
    {
                  item.data.map((itemData, ii) => ( // eslint-disable-line
                    <CheckBox
                      id={`checkbox-${itemData.long_description || itemData.description || itemData.code}`}
                      key={shortid.generate()}
                      label={itemData.long_description || itemData.description || itemData.code}
                      title={itemData.long_description || itemData.description || itemData.code}
                      name={itemData.long_description || itemData.description || itemData.code}
                      value={itemData.isSelected}
                      code={itemData.code}
                      selectionRef={item.item.selectionRef}
                      onCheckBoxClick={
                          (value, props) => {
                            this.props.queryParamToggle(
                              props.selectionRef,
                              props.code,
                              !value,
                            );
                          }
                        }
                    />
                  ))
                }
  </FieldSet>,
        title: item.item.title,
        id: `accordion-${item.item.title}`,
        expanded: item.item.title === this.props.selectedAccordion,
      }
    )).sort((a, b) => { // sort our pills by description
      const descA = a.title.toLowerCase();
      const descB = b.title.toLowerCase();
      if (descA < descB) { // sort string ascending
        return -1;
      }
      if (descA > descB) { return 1; }
      return 0; // default return value (no sorting)
    });
    return (
      <div>
        {<Accordion
          items={multiSelectFilterList}
          setAccordion={a => this.props.setAccordion(a)}
        />}
        <div>
          {
            booleanFilters
              .map((item, i) =>
                (
                  <FieldSet key={shortid.generate()} legend={item.item.title}>
                    <CheckBox
                      id={`checkbox-${item.item.title}`}
                      label="Yes"
                      title={item.item.title}
                      name={item.item.title}
                      value={item.data[0].isSelected}
                      selectionRef={item.item.selectionRef}
                      onCheckBoxClick={
                      (e) => {
                        booleanFilters[i].data[0].isSelected = !item.data[0].isSelected;
                        onBooleanFilterClick(e, item.data[0].code, item.item.selectionRef);
                      }
                    }
                    />
                  </FieldSet>
              ),
              )
          }
        </div>
      </div>
    );
  }
}

SearchFiltersContainer.propTypes = {
  filters: PropTypes.object, // eslint-disable-line
  queryParamUpdate: PropTypes.func.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  selectedAccordion: PropTypes.string.isRequired,
  setAccordion: PropTypes.func.isRequired,
};

export default SearchFiltersContainer;
