// reference react-picky for prop types

import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import CheckBox from 'Components/CheckBox';
import InteractiveElement from 'Components/InteractiveElement';


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
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  selectValue: PropTypes.func,
  getIsSelected: PropTypes.func.isRequired,
  queryProp: PropTypes.string,
  customLabel: PropTypes.node,
};

ListItem.defaultProps = {
  selectValue: EMPTY_FUNCTION,
  queryProp: '',
  customLabel: '',
};

export default ListItem;
