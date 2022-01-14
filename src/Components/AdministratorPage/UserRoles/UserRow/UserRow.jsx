import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userHasPermissions } from 'utilities';
import CheckBox from 'Components/CheckBox';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { modifyPermission } from 'actions/userRoles';
import Skeleton from 'react-loading-skeleton';

class UserRow extends Component {
  checkPermission(permission) {
    const isEmpty = !this.props.permissionGroups.length;
    if (isEmpty) return false;

    const userPerms = this.props.permissionGroups.map(permObj => permObj.name);

    return userHasPermissions(permission, userPerms || []);
  }

  updatePermission(addRole, groupID) {
    this.props.modifyPermission(addRole, this.props.userID, groupID);
  }

  render() {
    const {
      username, name, userID, delegateRoles, isLoading,
    } = this.props;

    const tdArray = [];
    Object.keys(this.props.delegateRoles).forEach(role => (
      tdArray.push(
        <td key={get(delegateRoles, `${role}.group_name`)} className="delegateRoleCell">
          <CheckBox
            label={`Toggle ${get(delegateRoles, `${role}.group_name`)} permission.`}
            id={`${userID}-${get(delegateRoles, `${role}.group_name`)}`}
            value={this.checkPermission([get(delegateRoles, `${role}.group_name`)])}
            onCheckBoxClick={e => this.updatePermission(e, get(delegateRoles, `${role}.group_id`))}
            labelSrOnly
          />
        </td>,
      )
    ));

    return (
      <>
        {
          isLoading ?
            (
              <tr>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
              </tr>
            ) :
            (
              <tr>
                <td>{username}</td>
                <td>{name}</td>
                {tdArray}
              </tr>
            )
        }
      </>
    );
  }
}

UserRow.propTypes = {
  userID: PropTypes.number.isRequired,
  username: PropTypes.string,
  name: PropTypes.string,
  permissionGroups: PropTypes.arrayOf(PropTypes.shape({})),
  delegateRoles: PropTypes.shape({}),
  modifyPermission: PropTypes.func,
  isLoading: PropTypes.bool,
};

UserRow.defaultProps = {
  username: '',
  name: '',
  permissionGroups: [],
  delegateRoles: {},
  modifyPermission: EMPTY_FUNCTION,
  onClick: EMPTY_FUNCTION,
  isLoading: false,
};

const mapStateToProps = state => ({
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
  modifyPermissionHasErrored: state.modifyPermissionHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  modifyPermission: (addRole, groupID, userID) => dispatch(modifyPermission(addRole,
    groupID, userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
