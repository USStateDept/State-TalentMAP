import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import { userHasPermissions, userHasSomePermissions } from '../../utilities';

export class PermissionsWrapper extends Component {
  componentWillMount() {
    if (this.checkPermissions()) {
      this.props.onMount();
    }
  }

  checkPermissions = () => {
    const { isLoading, minimum, permissions, userProfile } = this.props;
    if (!isLoading) {
      const isEmpty = !permissions.length;
      const permissions$ = typeof permissions === 'string' ? [permissions] : permissions;
      let doesUserHavePermissions = () =>
        isEmpty || userHasPermissions(permissions$, userProfile.permission_groups || []) ||
        userHasPermissions(permissions$, userProfile.permissions || []);
      if (minimum) {
        doesUserHavePermissions = () =>
          isEmpty || userHasSomePermissions(permissions$, userProfile.permission_groups || []) ||
        userHasSomePermissions(permissions$, userProfile.permissions || []);
      }
      if (!isLoading) {
        return doesUserHavePermissions();
      }
      return false;
    }
    return false;
  };

  render() {
    const { children, fallback } = this.props;
    const hasPermissions = this.checkPermissions();

    const renderProps = {
      hasPermissions,
    };

    const children$ = typeof children === 'function'
      ? children(renderProps)
      : children;

    const fallback$ = typeof fallback === 'function'
      ? fallback(renderProps)
      : fallback;

    return (
      hasPermissions ? children$ : fallback$
    );
  }
}

PermissionsWrapper.propTypes = {
  userProfile: USER_PROFILE,
  isLoading: PropTypes.bool,
  permissions: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.string), PropTypes.string],
  ), // permissions to check exist
  children: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number, PropTypes.element, PropTypes.func]).isRequired,
  fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  minimum: PropTypes.bool,
  onMount: PropTypes.func,
};

PermissionsWrapper.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  permissions: [],
  fallback: null,
  minimum: false,
  onMount: () => {},
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  isLoading: state.userProfileIsLoading,
});

export default connect(mapStateToProps)(PermissionsWrapper);
