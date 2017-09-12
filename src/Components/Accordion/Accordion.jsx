import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ children }) => (
  <ul className="usa-accordion">
    {children}
  </ul>
);

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Accordion;
