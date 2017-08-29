import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';

const shortid = require('shortid');

const BooleanFilterList = ({ items, onBooleanFilterClick }) => (
  <div>
    {
      items
        .map(item =>
          (<CheckBox
            key={shortid.generate()}
            id={item.id}
            label="Yes"
            title={item.title}
            name={item.name}
            value={item.value}
            selectionRef={item.selectionRef}
            legend={item.title}
            onCheckBoxClick={(p, v) => onBooleanFilterClick(p, v)}
          />),
        )
    }
  </div>
);

BooleanFilterList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      selectionRef: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default BooleanFilterList;
