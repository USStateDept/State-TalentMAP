import { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import PropTypes from 'prop-types';
import { compact, get, values } from 'lodash';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { getBrowserName } from 'utilities';
import Avatar from '../Avatar';
import DarkModeToggle from './DarkModeToggle';


const browserHandler = () => {
  switch (getBrowserName()) {
  // Dark mode breaks in IE11.
  // Attempt to disable dark mode if for some reason it is set to true.
  // Also set in src/Containers/DarkMode/DarkMode.jsx
    case 'Chrome':
    case 'Firefox':
    case 'Safari': {
      return <DarkModeToggle className="unstyled-button account-dropdown--identity account-dropdown--segment account-dropdown-link account-dropdown-link--button" />;
    }
    default: {
      return null;
    }
  }
};

export class AccountDropdown extends Component {
  logout = () => {
    this.props.logoutRequest();
  };

  hideDropdown = () => {
    // Explicitly hide the dropdown using the built-in hide() function from react-simple-dropdown
    this.dropdown.hide();
  };

  showDropdown = () => {
    // Explicitly show the dropdown using the built-in hide() function from react-simple-dropdown
    this.dropdown.show();
  };

  render() {
    const { shouldDisplayName, userProfile } = this.props;
    const displayName = userProfile ? userProfile.display_name : '...';
    const initials = userProfile ? userProfile.initials : '';
    const avatar = {
      firstName: get(userProfile, 'user.first_name'),
      lastName: get(userProfile, 'user.last_name'),
      initials,
      displayName,
      externalSource: get(userProfile, 'avatar'),
      externalSourceToUse: 's',
    };

    const isLoading = compact(values(avatar)).length > 0;

    return (
      isLoading &&
      <Dropdown
        className="account-dropdown"
        ref={(dropdown) => { this.dropdown = dropdown; }}
        removeElement
        onMouseEnter={this.showDropdown}
        onMouseLeave={this.hideDropdown}
      >
        <DropdownTrigger href="/#">
          <Avatar className="account-dropdown--avatar" {...avatar} />
          {
            shouldDisplayName &&
              <span className="account-dropdown--name" id="account-username">{displayName}</span>
          }
        </DropdownTrigger>
        <div className="dropdown-content-outer-container">
          <DropdownContent onMouseEnter={this.showDropdown}>
            <div className="account-dropdown--identity account-dropdown--segment">
              <div>Signed in as</div>
              <strong>{displayName}</strong>
            </div>
            <Link className="account-dropdown--identity account-dropdown--segment account-dropdown-link" to="/profile/dashboard" onClick={this.hideDropdown}>Dashboard</Link>
            {browserHandler()}
            <Link className="account-dropdown--identity account-dropdown--segment account-dropdown-link" to="/logout" onClick={this.logout}>Logout</Link>
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

AccountDropdown.propTypes = {
  logoutRequest: PropTypes.func,
  userProfile: USER_PROFILE,
  shouldDisplayName: PropTypes.bool,
};

AccountDropdown.defaultProps = {
  logoutRequest: EMPTY_FUNCTION,
  userProfile: {},
  shouldDisplayName: false,
};

export default AccountDropdown;
