import React from 'react';
import PropTypes from 'prop-types';

const NavLinksContainer = ({ children }) => (
  <ul>
    {children}
  </ul>
);

NavLinksContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavLinksContainer;
