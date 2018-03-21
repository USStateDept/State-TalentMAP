import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ children, className, toLink, useDefaultClass, isExternal }) => (
  <span className="link-button-wrapper">
    {
    isExternal ?
      <a
        className={`${useDefaultClass ? 'link-button' : ''} ${className}`}
        type="submit"
        role="button"
        href={toLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
      :
      <Link
        className={`${useDefaultClass ? 'link-button' : ''} ${className}`}
        type="submit"
        role="button"
        to={toLink}
      >
        {children}
      </Link>
    }
  </span>
);

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  toLink: PropTypes.string.isRequired,
  useDefaultClass: PropTypes.bool,
  isExternal: PropTypes.bool,
};

LinkButton.defaultProps = {
  className: '',
  useDefaultClass: true,
  isExternal: false,
};

export default LinkButton;
