import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';
import FieldSet from '../../FieldSet/FieldSet';
import { FILTER_ITEM } from '../../../Constants/PropTypes';

const shortid = require('shortid');

const BooleanFilter = ({ item, onBooleanFilterClick }) => (
  <div>
    <FieldSet key={shortid.generate()} legend={item.item.title}>
      <CheckBox
        id={`checkbox-${item.item.title}`}
        label="Yes"
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
    </FieldSet>
  </div>
);

BooleanFilter.propTypes = {
  item: FILTER_ITEM.isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default BooleanFilter;
