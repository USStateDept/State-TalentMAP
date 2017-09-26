import React from 'react';
import PropTypes from 'prop-types';

const FieldSet = ({ legend, children, legendSrOnly, className }) => (
  <fieldset className={className}>
    <legend className={legendSrOnly ? 'usa-sr-only' : null}>{legend}</legend>
    {children}
  </fieldset>
  );

FieldSet.propTypes = {
  legend: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // should be valid field set child
  legendSrOnly: PropTypes.bool,
  className: PropTypes.string,
};

FieldSet.defaultProps = {
  legendSrOnly: false,
  className: '',
};

export default FieldSet;
