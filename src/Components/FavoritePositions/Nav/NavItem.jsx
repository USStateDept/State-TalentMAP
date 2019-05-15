import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

export const NavItem = ({ title, value, numerator, denominator, isActive, onClick }) => {
  // numerator can be a zero, but not null or undefined
  const numeratorIsNotUndefinedOrNull = numerator !== null && numerator !== undefined;
  const showFraction = numeratorIsNotUndefinedOrNull && denominator;
  return (
    <div className={`usa-grid-full bidder-portfolio-navigation-item ${isActive ? 'is-underlined' : 'is-not-underlined'}`}>
      <button className="unstyled-button" onClick={() => onClick(value)}>
        {title} { showFraction ? <span className="navigation-item-fraction">({numerator}/{denominator})</span> : null }
      </button>
    </div>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  numerator: PropTypes.number,
  denominator: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  numerator: undefined,
  denominator: undefined,
  isActive: false,
  onClick: EMPTY_FUNCTION,
};

export default NavItem;
