import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userHasPermissions } from '../../../../utilities';
import DELEGATE_ROLES from '../../../../Constants/DelegateRoles';
import CheckBox from '../../../CheckBox';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import { modifyPermission } from '../../../../actions/userRoles';

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permAddRemoveSuccess: false,
    };
  }

  checkPermission(permission) {
    const isEmpty = !this.props.permissionGroups.length;
    if (isEmpty) return false;

    const userPerms = [];

    this.props.permissionGroups.forEach((permObj) => {
      userPerms.push(permObj.name);
    });

    return userHasPermissions(permission, userPerms || []);
  }

  updatePermission(addRole, groupID) {
    console.log('updatePermission()');
    console.log('addRole: ', addRole, ' groupID: ', groupID, ' this.props.userID: ', this.props.userID);
    this.props.modifyPermission(addRole, this.props.userID, groupID);
  }

  render() {
    const {
      username, name, userID, modifyPermissionSuccess, modifyPermissionIsLoading,
      modifyPermissionHasErrored,
    } = this.props;

    const props = {
      modifyPermissionSuccess,
      modifyPermissionIsLoading,
      modifyPermissionHasErrored,
    };

    return (
      <tr>
        { props.modifyPermissionSuccess &&
        <td>{username}</td>
        }
        <td>{name}</td>
        {Object.keys(DELEGATE_ROLES).map(role => (
          <td key={DELEGATE_ROLES[role].group_name} className="delegateRoleCell">
            <CheckBox
              label=""
              id={`${userID}-${DELEGATE_ROLES[role].group_name}`}
              value={this.checkPermission([DELEGATE_ROLES[role].group_name])}
              onCheckBoxClick={e => this.updatePermission(e, DELEGATE_ROLES[role].group_id)}
            />
          </td>
        ))}
      </tr>
    );
  }
}

UserRow.propTypes = {
  userID: PropTypes.number.isRequired,
  username: PropTypes.string,
  name: PropTypes.string,
  permissionGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  modifyPermission: PropTypes.func.isRequired,
  modifyPermissionSuccess: PropTypes.string,
  modifyPermissionIsLoading: PropTypes.bool,
  modifyPermissionHasErrored: PropTypes.bool,
};

UserRow.defaultProps = {
  username: '',
  name: '',
  onClick: EMPTY_FUNCTION,
  modifyPermissionSuccess: '',
  modifyPermissionIsLoading: false,
  modifyPermissionHasErrored: false,
};

const mapStateToProps = state => ({
  modifyPermissionSuccess: state.modifyPermissionSuccess,
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
  modifyPermissionHasErrored: state.modifyPermissionHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  modifyPermission: (addRole, groupID, userID) => dispatch(modifyPermission(addRole,
      groupID, userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
