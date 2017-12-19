import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER_LOCATION_OBJECT } from '../../../Constants/PropTypes';
import { isCurrentPath } from '../../ProfileMenu/navigation';

export const NavLink = ({ title, link, location, navLinkClass }) => {
  const isActive = isCurrentPath(location.pathname, link);
  return (
    <div className={`header-nav-link-container ${isActive ? 'is-active' : 'is-not-active'}`}>
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

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
  navLinkClass: PropTypes.string,
};

NavLink.defaultProps = {
  navLinkClass: '',
};

export default withRouter(NavLink);
