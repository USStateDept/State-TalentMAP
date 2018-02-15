import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';
import { FILTER_ITEM } from '../../../Constants/PropTypes';

const BooleanFilter = ({ item, onBooleanFilterClick }) => (
  <CheckBox
    id={`checkbox-${item.item.title}`}
    label={item.item.title}
    title={item.item.title}
    name={item.item.title}
    value={item.data[0].isSelected || false}
    selectionRef={item.item.selectionRef}
    onCheckBoxClick={
        (e) => {
          onBooleanFilterClick(
            e, item.data[0].code, item.item.selectionRef, item.data[0].isSelected,
          );
        }
      }
  />
);

BooleanFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default BooleanFilter;
