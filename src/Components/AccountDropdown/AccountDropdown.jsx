import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { EMPTY_FUNCTION, USER_PROFILE } from '../../Constants/PropTypes';

export class AccountDropdown extends Component {

  logout() {
    this.props.logoutRequest();
  }

  render() {
    const userName = this.props.userProfile.user ? this.props.userProfile.user.username : '...';
    return (
      <Dropdown className="account-dropdown">
        <DropdownTrigger href="/#">
          <img
            alt="avatar"
            className="account-dropdown--avatar"
            src="/assets/img/avatar.png"
          />
          <span className="account-dropdown--name" id="account-username">{userName}</span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="account-dropdown--identity account-dropdown--segment">
            Signed in as <strong>{userName}</strong>
          </div>
          <div className="account-dropdown--identity account-dropdown--segment">
            <Link to="/">Profile</Link>
          </div>
          <div className="account-dropdown--identity account-dropdown--segment">
            <Link to="login" onClick={() => this.logout()}>Logout</Link>
          </div>
        </DropdownContent>
      </Dropdown>
    );
  }
}

AccountDropdown.propTypes = {
  logoutRequest: PropTypes.func,
  userProfile: USER_PROFILE,
};

AccountDropdown.defaultProps = {
  logoutRequest: EMPTY_FUNCTION,
  userProfile: {},
};

export default AccountDropdown;
