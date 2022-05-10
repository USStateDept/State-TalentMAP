import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import NotificationsPopover from '../NotificationsPopover';
import GlossaryIcon from '../GlossaryIcon';
import NavLink from '../NavLink';
import AccountDropdown from '../../AccountDropdown/AccountDropdown';

const DesktopNav = ({
  isLoggedIn,
  userProfile,
  logout,
}) => (
  <div className="navigation-container">
    <div className="nav-link-container header-nav-desktop desktop-nav-only">
      <NavLink link="/" title="Home" routeToRight="/results" />
      <NavLink link="/results" title="Search" />
    </div>
    <div className="header-nav-desktop desktop-nav-only account-notification-container">
      <div className="header-nav-link-container account-container">
        <div className="header-nav-link">
          {
            (isLoggedIn && userProfile.user) &&
            <AccountDropdown
              userProfile={userProfile}
              logoutRequest={logout}
              shouldDisplayName
            />
          }
        </div>
      </div>
    </div>
    <div className="header-nav-desktop desktop-nav-only account-notification-container">
      <div className="header-nav-link-container notifications-container">
        <div className="header-nav-link">
          {
            isLoggedIn &&
              <span>
                <NotificationsPopover />
                <div className="icon-alert-container glossary-link-container">
                  <GlossaryIcon />
                </div>
              </span>
          }
        </div>
      </div>
    </div>
  </div>
);

DesktopNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: USER_PROFILE,
  logout: PropTypes.func.isRequired,
};

DesktopNav.defaultProps = {
  userProfile: {},
};

export default DesktopNav;
