// reference react-picky for prop types

import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../../../CheckBox';
import InteractiveElement from '../../../../InteractiveElement';

export const stopProp = e => e.stopPropagation();

const ListItem = ({ item, selectValue, getIsSelected }) => {
  const isSelected = getIsSelected(item);
  return (
    <InteractiveElement
      type="li"
      key={item}
      onClick={() => selectValue(item)}
      data-selected={isSelected ? 'selected' : ''}
      aria-selected={isSelected}
    >
      <CheckBox
        small
        id={item}
        label={item}
        onClick={stopProp}
        value={getIsSelected(item)}
        checkboxProps={{ readOnly: true, tabIndex: '-1' }}
      />
    </InteractiveElement>
  );
};

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
  selectValue: PropTypes.func.isRequired,
  getIsSelected: PropTypes.func.isRequired,
};

export default ListItem;
