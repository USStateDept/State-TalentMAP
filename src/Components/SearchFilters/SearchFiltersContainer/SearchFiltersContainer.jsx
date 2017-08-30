import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';

const shortid = require('shortid');

class SearchFiltersContainer extends Component { // eslint-disable-line
  render() {
    const booleanFilters = this.props.filters.filter(searchFilter => searchFilter.item.bool);
    const onBooleanFilterClick = (isChecked, code, selectionRef) => {
      const object = Object.assign({});
      object[selectionRef] = isChecked ? code : '';
      this.props.queryParamUpdate(object);
    };
    return (
      <div>
        {
          booleanFilters
            .map((item, i) =>
              (<CheckBox
                key={shortid.generate()}
                id={`checkbox-${item.item.title}`}
                label="Yes"
                title={item.item.title}
                name={item.item.title}
                value={item.data[0].isSelected}
                selectionRef={item.item.selectionRef}
                legend={item.item.title}
                onCheckBoxClick={
                  (e) => {
                    booleanFilters[i].data[0].isSelected = !item.data[0].isSelected;
                    onBooleanFilterClick(e, item.data[0].code, item.item.selectionRef);
                  }
                }
              />),
            )
        }
      </div>
    );
  }
}

SearchFiltersContainer.propTypes = {
  filters: PropTypes.object, // eslint-disable-line
  queryParamUpdate: PropTypes.func.isRequired,
};

export default SearchFiltersContainer;
