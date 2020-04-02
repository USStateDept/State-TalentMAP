import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

export const NavItem = ({ title, value, numerator, denominator, isActive, onClick }) => {
  // numerator can be a zero, but numerator and denominator cannot be null or undefined for fraction
  const showFraction = !isNil(numerator) && !isNil(denominator);
  const showNumerator = !isNil(numerator);
  return (
    <div className={`usa-grid-full bidder-portfolio-navigation-item ${isActive ? 'is-underlined' : 'is-not-underlined'}`}>
      <button className="unstyled-button" onClick={() => onClick(value)}>
        {title}
        { showFraction ? <span className="navigation-item-fraction">({numerator}/{denominator})</span> : null }
        { !showFraction && showNumerator ? <span className="navigation-item-fraction">({numerator})</span> : null}
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
