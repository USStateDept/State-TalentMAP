import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSet from '../../FieldSet/FieldSet';
import CheckBox from '../../CheckBox/CheckBox';
import { FILTER_ITEM } from '../../../Constants/PropTypes';
import { getItemLabel } from '../../../utilities';

class MultiSelectFilter extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
  }

  onCheckBoxClick(value, props) {
    this.props.queryParamToggle(props.selectionRef, props[this.props.queryProperty], !value);
  }

  render() {
    const { item } = this.props;
    return (
      <FieldSet key={item.item.title} legend={item.item.title}>
        {
          item.data.map((itemData) => {
            const itemLabel = getItemLabel(itemData);
            return (<CheckBox
              _id={itemData.id} /* when we need the original id */
              id={`checkbox${itemLabel}`}
              key={`${item.item.selectionRef}-${itemData.code}`}
              label={itemLabel}
              title={itemLabel}
              name={itemLabel}
              value={itemData.isSelected}
              code={itemData.code}
              selectionRef={item.item.selectionRef}
              onCheckBoxClick={this.onCheckBoxClick}
            />);
          })
        }
      </FieldSet>
    );
  }
}

MultiSelectFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  queryProperty: PropTypes.string,
};

MultiSelectFilter.defaultProps = {
  queryProperty: 'code',
};

export default MultiSelectFilter;
