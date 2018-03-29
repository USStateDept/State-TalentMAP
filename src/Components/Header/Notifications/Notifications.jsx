import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { notificationsCountFetchData } from '../../../actions/notifications';
import IconAlert from '../../IconAlert';
import isCurrentPath from '../../ProfileMenu/navigation';
import { LOGIN_REDIRECT } from '../../../login/routes';

class Notifications extends Component {
  componentWillMount() {
    const { fetchNotificationsCount, history, location } = this.props;

    // If the user is on the login page, don't try to pull notifications.
    //
    // Define the login route
    const loginRoute = LOGIN_REDIRECT;

    // Check if the user is on the login route
    const isOnLoginPage = isCurrentPath(loginRoute, location.pathname);

    // If the user is not on the login route, fetch notifications
    if (!isOnLoginPage) {
      fetchNotificationsCount();
    }

    // Listen for a route change to refresh notifications,
    // unless the login page is the current route.
    history.listen((newLocation) => {
      if (newLocation.pathname !== loginRoute) {
        fetchNotificationsCount();
      }
    });
  }
  render() {
    const { notificationsCount } = this.props;
    return (
      <IconAlert
        type="globe"
        number={notificationsCount}
        link="/profile/dashboard/"
        alt="Notifications"
        title="View your notifications"
      />
    );
  }
}

Notifications.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
  fetchNotificationsCount: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

Notifications.defaultProps = {
  notificationsCount: 0,
};

const mapStateToProps = state => ({
  notificationsCount: state.notificationsCount,
});

export const mapDispatchToProps = dispatch => ({
  fetchNotificationsCount: () => dispatch(notificationsCountFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notifications));
