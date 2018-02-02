import React from 'react';
import PropTypes from 'prop-types';
import BooleanFilter from '../BooleanFilter/BooleanFilter';
import FieldSet from '../../FieldSet/FieldSet';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

const shortid = require('shortid');

const BooleanFilterContainer = ({ filters, onBooleanFilterClick, legendTitle }) => (
  <FieldSet legend={legendTitle} legendSrOnly>
    {
      filters
        .map((item, i) =>
          (
            <BooleanFilter
              key={shortid.generate()}
              item={item}
              onBooleanFilterClick={
              (e, code, ref, isSelected) => {
                onBooleanFilterClick(
                  e, code, ref, i, isSelected,
                );
              }
            }
            />
        ),
        )
    }
  </FieldSet>
  );

BooleanFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
  legendTitle: PropTypes.string.isRequired,
};

export default BooleanFilterContainer;
