import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooleanFilter from '../BooleanFilter/BooleanFilter';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

class BooleanFilterContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        {
        this.props.filters
          .map((item, i) =>
            (
              <BooleanFilter
                key={item.item.title}
                item={item}
                onBooleanFilterClick={
                (e, code, ref, isSelected) => {
                  this.props.onBooleanFilterClick(
                    e, code, ref, i, isSelected,
                  );
                }
              }
              />
          ),
          )
      }
      </div>
    );
  }
}

BooleanFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default BooleanFilterContainer;
