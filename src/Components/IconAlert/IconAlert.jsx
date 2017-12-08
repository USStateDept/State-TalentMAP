import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const IconAlert = ({ type, number, link, limit, useLimit, alt, title, disabled }) => {
  let numberText = number; // the text we'll display
  if (useLimit && limit <= number) {
    numberText = `${limit}+`;
  }
  const shouldShowNumber = number > 0;
  return (
    <div className={`icon-alert-container ${disabled ? 'icon-alert-disabled' : ''}`}>
      <Link to={link} role="button" title={title}>
        <div className="alert-icon" />
        <span className="usa-sr-only">{alt}</span>
        <FontAwesome name={type} />
        {
          shouldShowNumber ?
            <span className="alert-icon-badge">
              {numberText}
            </span>
            :
            null
        }
      </Link>
    </div>
  );
};

IconAlert.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number,
  link: PropTypes.string.isRequired,
  limit: PropTypes.number,
  useLimit: PropTypes.bool,
  alt: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

IconAlert.defaultProps = {
  number: 0,
  limit: 5,
  useLimit: true,
  disabled: false,
};

export default IconAlert;
