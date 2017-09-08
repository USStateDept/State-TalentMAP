import React from 'react';
import PropTypes from 'prop-types';

const FieldSet = ({ legend, children }) => (
  <fieldset>
    <legend>{legend}</legend>
    {children}
  </fieldset>
  );

FieldSet.propTypes = {
  legend: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // should be valid field set child
};

export default FieldSet;
