import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSet from '../../FieldSet/FieldSet';
import CheckBox from '../../CheckBox/CheckBox';
import { FILTER_ITEM } from '../../../Constants/PropTypes';

class MultiSelectFilter extends Component { // eslint-disable-line
  render() {
    const { item } = this.props;
    return (
      <FieldSet key={item.item.title} legend={item.item.title}>
        {
          item.data.map(itemData => (
            <CheckBox
              id={`checkbox${itemData.long_description || itemData.description || itemData.code}`}
              key={`${item.item.selectionRef}-${itemData.code}`}
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
      </FieldSet>
    );
  }
}

MultiSelectFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
};

export default MultiSelectFilter;
