import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import Inbox from '../Inbox';
import Notifications from '../Notifications';
import GlossaryIcon from '../GlossaryIcon';
import NavLink from '../NavLink';
import AccountDropdown from '../../AccountDropdown/AccountDropdown';
import InteractiveElement from '../../InteractiveElement';

const DesktopNav = ({
  isLoggedIn,
  shouldShowSearchBar,
  userProfile,
  logout,
  toggleSearchVisibility,
}) => (
  <div className="navigation-container">
    <div className="nav-link-container header-nav-desktop desktop-nav-only">
      {
        isLoggedIn &&
        <div className={`header-nav-link-container ${shouldShowSearchBar ? 'is-highlighted' : 'is-not-highlighted'}`}>
          <div className="header-nav-link">
            <div className="header-nav-link-text search-text">
              <InteractiveElement
                type="span"
                onClick={toggleSearchVisibility}
              >
                <FontAwesome name="search" /> Search
              </InteractiveElement>
            </div>
          </div>
        </div>
      }
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
                <Inbox />
                <Notifications />
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
  shouldShowSearchBar: PropTypes.bool.isRequired,
  userProfile: USER_PROFILE,
  logout: PropTypes.func.isRequired,
  toggleSearchVisibility: PropTypes.func.isRequired,
};

DesktopNav.defaultProps = {
  userProfile: {},
};

export default DesktopNav;
