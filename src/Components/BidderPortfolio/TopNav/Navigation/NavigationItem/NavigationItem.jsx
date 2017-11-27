import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER_LOCATION_OBJECT } from '../../../../../Constants/PropTypes';
import { isCurrentParam } from '../../../../ProfileMenu/navigation';

export const NavigationItem = ({ title, numerator, denominator, link, location }) => {
  const isUnderlined = isCurrentParam(link, location.search, 'type');
  return (
    <div className={`usa-grid-full bidder-portfolio-navigation-item ${isUnderlined ? 'is-underlined' : 'is-not-underlined'}`}>
      <Link to={link}>
        {title} <span className="navigation-item-fraction">({numerator}/{denominator})</span>
      </Link>
    </div>
  );
};

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
};

export default withRouter(NavigationItem);
