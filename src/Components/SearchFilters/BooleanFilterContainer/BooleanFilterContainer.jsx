import React from 'react';
import PropTypes from 'prop-types';
import BooleanFilter from '../BooleanFilter/BooleanFilter';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

const shortid = require('shortid');

const BooleanFilterContainer = ({ filters, onBooleanFilterClick }) => (
  <div>
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
  </div>
  );

BooleanFilterContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default BooleanFilterContainer;
