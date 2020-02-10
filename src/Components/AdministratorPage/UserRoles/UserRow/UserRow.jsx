import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      // isSelected: { value: 'Bonjour' },
    };
    // this.updatePermission = this.updatePermission.bind(this);
    // this.checkPermission = this.checkPermission.bind(this);
  }

  checkPermission(permission) {
    const isEmpty = !this.props.permissionGroups.length;
    if (isEmpty) return false;

    const hasPermission = userHasPermissions(permission, this.props.permissionGroups || []);

    return hasPermission;
  }

  updatePermission(addRole, groupID) {
    console.log('--updatePermission--');
    console.log(addRole, groupID);
    console.log(this.props.userID);
    modifyPermission(addRole, groupID, this.props.userID)
        .then(() => {
          this.setState({ permAddRemoveSuccess: true });
          console.log(this.checkPermission(groupID));
        })
        .catch(() => {
          this.setState({ permAddRemoveSuccess: false });
        });
  }

  render() {
    const {
                username, name, userID,
            } = this.props;

    return (
      <tr>
        <td>{username}</td>
        <td>{name}</td>
        {Object.keys(DELEGATE_ROLES).map(role => (
          <td key={DELEGATE_ROLES[role].group_id} className="delegateRoleCell">
            <CheckBox
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
  username: PropTypes.string,
  userID: PropTypes.number.isRequired,
  name: PropTypes.string,
  permissionGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  // isSelected: this.state.isSelected,
};

UserRow.defaultProps = {
  username: '',
  name: '',
  onClick: EMPTY_FUNCTION,
  isSelected: false,
};

export default UserRow;
