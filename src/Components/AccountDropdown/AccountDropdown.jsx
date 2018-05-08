import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import PropTypes from 'prop-types';
import { get, compact, values } from 'lodash';
import Avatar from '../Avatar';
import { EMPTY_FUNCTION, USER_PROFILE } from '../../Constants/PropTypes';

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
    const displayName = userProfile ? userProfile.display_name : '...';
    const initials = userProfile ? userProfile.initials : '';
    const avatar = {
      firstName: get(userProfile, 'user.first_name'),
      lastName: get(userProfile, 'user.last_name'),
      initials,
      displayName,
    };

    const isLoading = compact(values(avatar)).length > 0;

    return (
      isLoading &&
      <Dropdown className="account-dropdown" ref={(dropdown) => { this.dropdown = dropdown; }} removeElement>
        <DropdownTrigger href="/#">
          <Avatar className="account-dropdown--avatar" {...avatar} />
          {
            shouldDisplayName &&
              <span className="account-dropdown--name" id="account-username">{displayName}</span>
          }
        </DropdownTrigger>
        <DropdownContent>
          <div className="account-dropdown--identity account-dropdown--segment">
            <div>Signed in as</div>
            <strong>{displayName}</strong>
          </div>
          <Link className="account-dropdown--identity account-dropdown--segment account-dropdown-link" to="/profile/dashboard" onClick={this.hideDropdown}>Profile</Link>
          <Link className="account-dropdown--identity account-dropdown--segment account-dropdown-link" to="/logout" onClick={this.logout}>Logout</Link>
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
