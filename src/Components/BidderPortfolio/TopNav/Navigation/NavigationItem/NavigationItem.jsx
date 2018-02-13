import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER_LOCATION_OBJECT } from '../../../../../Constants/PropTypes';
import { isCurrentParam } from '../../../../ProfileMenu/navigation';

export const NavigationItem = ({ title, numerator, denominator, link, location }) => {
  const isUnderlined = isCurrentParam(link, location.search, 'type');
  // numerator can be a zero, but not null or undefined
  const numeratorIsNotUndefinedOrNull = numerator !== null && numerator !== undefined;
  const showFraction = numeratorIsNotUndefinedOrNull && denominator;
  return (
    <div className={`usa-grid-full bidder-portfolio-navigation-item ${isUnderlined ? 'is-underlined' : 'is-not-underlined'}`}>
      <Link to={link}>
        {title} { showFraction ? <span className="navigation-item-fraction">({numerator}/{denominator})</span> : null }
      </Link>
    </div>
  );
};

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  numerator: PropTypes.number,
  denominator: PropTypes.number,
  link: PropTypes.string.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
};

NavigationItem.defaultProps = {
  numerator: undefined,
  denominator: undefined,
};

export default withRouter(NavigationItem);
