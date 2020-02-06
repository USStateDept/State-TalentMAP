import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { userHasPermissions } from '../../../../utilities';
import DELEGATE_ROLES from '../../../../Constants/DelegateRoles';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.updatePermission = this.updatePermission.bind(this);
    // this.checkPermission = this.checkPermission.bind(this);
  }

  checkPermission(permission) {
    const isEmpty = !this.props.permissionGroups.length;
    if (isEmpty) return false;

    const hasPermission = userHasPermissions(permission, this.props.permissionGroups || []);

    return hasPermission;
  }

  updatePermission(addPerm) {
    // for now i just want to capture the click event. later connect to action that will
    // update user permissions via endpoint
    console.log(addPerm);
    console.log(this.props.permissionGroups);
  }

  render() {
    const {
                username, name,
            } = this.props;

    return (
      <tr>
        <td>{username}</td>
        <td>{name}</td>
        {DELEGATE_ROLES.map(role => (
          <td key={role} className={'delegateRoleCell'}>
            <FA
              onClick={this.updatePermission(role)}
              name={this.checkPermission([role]) ? 'check-square-o' : 'square-o'}
            />
          </td>
        ))}
      </tr>
    );
  }
}

UserRow.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  permissionGroups: PropTypes.arrayOf(PropTypes.string),
};

UserRow.defaultProps = {
  username: '',
  name: '',
  permissionGroups: [],
  onClick: EMPTY_FUNCTION,
  isSelected: false,
};

export default UserRow;
