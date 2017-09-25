import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, className, toLink }) => (
  <span className="link-button-wrapper">
    <Link
      className={`link-button ${className}`}
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
};

LinkButton.defaultProps = {
  className: '',
};

export default LinkButton;
