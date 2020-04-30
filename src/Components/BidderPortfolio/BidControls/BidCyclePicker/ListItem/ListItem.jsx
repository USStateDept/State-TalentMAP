// reference react-picky for prop types

import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../../../CheckBox';
import InteractiveElement from '../../../../InteractiveElement';

const ListItem = ({ item, selectValue, getIsSelected, queryProp, customLabel }) => {
  const item$ = queryProp ? item[queryProp] : item;
  const label = customLabel || item$;
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
        label={label}
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
  customLabel: PropTypes.node,
};

ListItem.defaultProps = {
  queryProp: '',
  customLabel: '',
};

export default ListItem;
