import React from 'react';
import PropTypes from 'prop-types';

// use role="tablist" for use with aria-multiselectable
// https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable
const Accordion = ({ children, isMultiselectable, className }) => (
  <ul role="tablist" className={`usa-accordion ${className}`} aria-multiselectable={isMultiselectable}>
    {children}
  </ul>
);

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  isMultiselectable: PropTypes.bool,
  className: PropTypes.string,
};

Accordion.defaultProps = {
  isMultiselectable: false,
  className: '',
};

export default Accordion;
