import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ id, label, title, name, value, selectionRef, legend, onCheckBoxClick }) => (
  <fieldset>
    <legend>{legend}</legend>
    <input
      type="checkbox"
      id={id}
      title={title}
      name={name}
      value={value}
      selectionRef={selectionRef}
      onChange={() => onCheckBoxClick(selectionRef, value)}
    />
    <label htmlFor={id}>{label}</label>
  </fieldset>
);

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  selectionRef: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
};

export default CheckBox;
