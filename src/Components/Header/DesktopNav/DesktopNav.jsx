import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import Inbox from '../Inbox';
import Notifications from '../Notifications';
import NavLink from '../NavLink';
import AccountDropdown from '../../AccountDropdown/AccountDropdown';

const DesktopNav = ({ showAccountDropdown, isLoggedIn, shouldShowSearchBar,
userProfile, logout, toggleSearchVisibility }) => (
  <div className="navigation-container">
    <div className="nav-link-container header-nav-desktop desktop-nav-only">
      {
        isLoggedIn &&
        <div className={`header-nav-link-container ${shouldShowSearchBar ? 'is-highlighted' : 'is-not-highlighted'}`}>
          <div className="header-nav-link">
            <div className="header-nav-link-text search-text">
              {/* At the time of writing, CodeClimate's version of eslint-a11y-plugin
                  did not take role="button" into account with the following error: */ }
              <span // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                tabIndex="0"
                role="button"
                onClick={toggleSearchVisibility}
              >
                <FontAwesome name="search" /> Search
              </span>
            </div>
          </div>
        </div>
      }
      <NavLink link="/" title="Home" navLinkClass="home-text" />
      <div className="header-nav-link-container">
        <div className="header-nav-link">
          <div className="header-nav-link-text about-text">
            <a href="https://github.com/18F/State-TalentMAP">About</a>
          </div>
        </div>
      </div>
      <div className="header-nav-link-container">
        <div className="header-nav-link">
          <div className="header-nav-link-text feedback-text">
            <a href="https://github.com/18F/State-TalentMAP/issues">Feedback</a>
          </div>
        </div>
      </div>
    </div>
    <div className="header-nav-desktop desktop-nav-only account-notification-container">
      <div className="header-nav-link-container account-container">
        <div className="header-nav-link">
          {
            showAccountDropdown &&
            <AccountDropdown
              userProfile={userProfile}
              logoutRequest={logout}
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
              </span>
          }
        </div>
      </div>
    </div>
  </div>
);

DesktopNav.propTypes = {
  showAccountDropdown: PropTypes.bool.isRequired,
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
