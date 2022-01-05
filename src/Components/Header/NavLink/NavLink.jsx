import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTER_LOCATION_OBJECT } from '../../../Constants/PropTypes';
import { isCurrentPath } from '../../ProfileMenu/navigation';

export const NavLink = ({ title, link, location, navLinkClass, routeToRight }) => {
  const isActive = isCurrentPath(location.pathname, link);
  const toRightIsActive = isCurrentPath(location.pathname, routeToRight);
  return (
    <div
      className={`header-nav-link-container ${isActive ? 'is-highlighted' : 'is-not-active'} ${toRightIsActive ? 'link-right-active' : ''}`}
    >
      <div className="header-nav-link">
        <div className={`header-nav-link-text ${navLinkClass}`}>
          <Link to={link}>
            <span>{title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

NavLink.propTypes = {
  title: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
  navLinkClass: PropTypes.string,
  routeToRight: PropTypes.string,
};

NavLink.defaultProps = {
  navLinkClass: '',
  routeToRight: '!!!',
};

export default withRouter(NavLink);
