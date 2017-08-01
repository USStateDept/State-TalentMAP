import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { logoutRequest } from '../../login/actions';

export class AccountDropdown extends Component {

  logout() {
    this.props.logoutRequest();
  }

  render() {
    return (
      <Dropdown className="account-dropdown">
        <DropdownTrigger href="/#">
          <img
            alt="avatar"
            className="account-dropdown--avatar"
            src="/assets/img/avatar.png"
          />
          <span className="account-dropdown--name">User</span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="account-dropdown--identity account-dropdown--segment">
            Signed in as <strong>User</strong>
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
};

AccountDropdown.defaultProps = {
  logoutRequest: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  login: state.login,
});

const connected = connect(mapStateToProps, { logoutRequest })(AccountDropdown);

export default connected;
