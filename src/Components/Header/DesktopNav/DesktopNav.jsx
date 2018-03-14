import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import GlossaryIcon from '../GlossaryIcon';
import NavLink from '../NavLink';
import AccountDropdown from '../../AccountDropdown/AccountDropdown';
import InteractiveElement from '../../InteractiveElement';

const DesktopNav = ({ isLoggedIn, shouldShowSearchBar,
userProfile, logout, toggleSearchVisibility }) => (
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
      <div className="header-nav-link-container">
        <div className="header-nav-link">
          <div className="header-nav-link-text about-text">
            <a href="https://github.com/18F/State-TalentMAP">About</a>
          </div>
        </div>
      </div>
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
