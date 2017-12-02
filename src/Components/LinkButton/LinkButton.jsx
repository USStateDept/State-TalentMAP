import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, className, toLink, useDefaultClass }) => (
  <span className="link-button-wrapper">
    <Link
      className={`${useDefaultClass ? 'link-button' : ''} ${className}`}
      type="submit"
      role="button"
      to={toLink}
    >
      {children}
    </Link>
  </span>
);

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  toLink: PropTypes.string.isRequired,
  useDefaultClass: PropTypes.bool,
};

LinkButton.defaultProps = {
  className: '',
  useDefaultClass: true,
};

export default LinkButton;
