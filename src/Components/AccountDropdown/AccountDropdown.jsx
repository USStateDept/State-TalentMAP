import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { EMPTY_FUNCTION, USER_PROFILE } from '../../Constants/PropTypes';
import { getAssetPath } from '../../utilities';

export class AccountDropdown extends Component {

  constructor(props) {
    super(props);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutRequest();
  }

  hideDropdown() {
    // Explicitly hide the dropdown using the built-in hide() function from react-simple-dropdown
    this.dropdown.hide();
  }

  render() {
    const { shouldDisplayName, userProfile } = this.props;
    const firstName = userProfile.user ? userProfile.user.first_name : '...';
    const avatar = getAssetPath('/assets/img/avatar.png');
    return (
      <Dropdown
        className="account-dropdown"
        ref={(dropdown) => { this.dropdown = dropdown; }}
        removeElement
      >
        <DropdownTrigger href="/#">
          <img
            alt="avatar"
            className="account-dropdown--avatar"
            src={avatar}
          />
          {
            shouldDisplayName &&
              <span className="account-dropdown--name" id="account-username">{firstName}</span>
          }
        </DropdownTrigger>
        <DropdownContent>
          <div className="account-dropdown--identity account-dropdown--segment">
            <div>Signed in as</div>
            <strong>{firstName}</strong>
          </div>
          <div
            className="account-dropdown--identity account-dropdown--segment account-dropdown-link"
          >
            <Link to="/profile/dashboard" onClick={this.hideDropdown}>Profile</Link>
          </div>
          <div
            className="account-dropdown--identity account-dropdown--segment account-dropdown-link"
          >
            <Link to="/login" onClick={this.logout}>Logout</Link>
          </div>
        </DropdownContent>
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
