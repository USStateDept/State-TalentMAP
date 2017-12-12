import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER_LOCATION_OBJECT } from '../../../Constants/PropTypes';
import { isCurrentPath } from '../../ProfileMenu/navigation';

export const NavigationItem = ({ title, link, location, forceClass, navLinkClass }) => {
  const isBold = isCurrentPath(location.pathname, link);
  return (
    <div className={`header-nav-link-container ${forceClass.length ? forceClass : ''} ${isBold && !forceClass.length ? 'is-bolded' : 'is-not-bolded'}`}>
      <div className="header-nav-link">
        <div className={`header-nav-link-text ${navLinkClass}`}>
          <Link to={link}>
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
  forceClass: PropTypes.oneOf(['', 'is-bolded', 'is-not-bolded']),
  navLinkClass: PropTypes.string,
};

NavigationItem.defaultProps = {
  forceClass: '',
  navLinkClass: '',
};

export default withRouter(NavigationItem);
