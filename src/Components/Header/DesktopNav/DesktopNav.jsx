import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Flag } from 'flag';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import Notifications from '../Notifications';
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
      <NavLink link="/results" title={<span><FontAwesome name="search" /> Search</span>} navLinkClass="home-text" />
      <NavLink link="/" title="Home" navLinkClass="home-text" />
      <NavLink link="/about" title="About" navLinkClass="about-text" />
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
                <Flag name="flags.notifications">
                  <Notifications />
                </Flag>
                <GlossaryIcon />
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
