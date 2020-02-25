// reference react-picky for prop types

import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../../../CheckBox';
import InteractiveElement from '../../../../InteractiveElement';

const ListItem = ({ item, selectValue, getIsSelected, queryProp }) => {
  const item$ = queryProp ? item[queryProp] : item;
  const isSelected = getIsSelected(item);
  const onClick = () => {
    selectValue(item);
  };
  return (
    <InteractiveElement
      type="li"
      key={item$}
      onClick={onClick}
      data-selected={isSelected ? 'selected' : ''}
      aria-selected={isSelected}
    >
      <CheckBox
        small
        id={item$}
        label={item$}
        value={isSelected}
        overrideLifecycle
        checkboxProps={{ readOnly: true, tabIndex: '-1' }}
      />
    </InteractiveElement>
  );
};

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
  selectValue: PropTypes.func.isRequired,
  getIsSelected: PropTypes.func.isRequired,
  queryProp: PropTypes.string,
};

ListItem.defaultProps = {
  queryProp: '',
};

export default ListItem;
