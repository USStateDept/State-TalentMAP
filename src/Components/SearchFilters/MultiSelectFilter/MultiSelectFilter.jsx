import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldSet from '../../FieldSet/FieldSet';
import CheckBox from '../../CheckBox/CheckBox';

const shortid = require('shortid');

class MultiSelectFilter extends Component { // eslint-disable-line
  render() {
    const { item } = this.props;
    return (
      <FieldSet key={shortid.generate()} legend={item.item.title}>
        {
          item.data.map(itemData => (
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
      </FieldSet>
    );
  }
}

MultiSelectFilter.propTypes = {
  item: PropTypes.object, // eslint-disable-line
  filters: PropTypes.object, // eslint-disable-line
  queryParamUpdate: PropTypes.func.isRequired, // eslint-disable-line
  queryParamToggle: PropTypes.func.isRequired,// eslint-disable-line
  setAccordion: PropTypes.func.isRequired, // eslint-disable-line
  booleanToggle: PropTypes.func.isRequired, // eslint-disable-line
};

MultiSelectFilter.defaultProps = {
  booleanToggle: () => {},
  setAccordion: () => {},
  queryParamUpdate: () => {},
  queryParamToggle: () => {},
};

export default MultiSelectFilter;
