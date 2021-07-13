import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { handshakeNotificationsFetchData, notificationsCountFetchData, notificationsFetchData } from '../../../actions/notifications';
import IconAlert from '../../IconAlert';

class Notifications extends Component {
  UNSAFE_componentWillMount() {
    const { fetchNotificationsCount, history } = this.props;

    // If the user is on the login page, don't try to pull notifications.
    //
    // Define the login route
    const loginRoute = process.env.PUBLIC_ROOT;

    fetchNotificationsCount();

    // Listen for a route change to refresh notifications,
    // unless the login page is the current route.
    history.listen((newLocation) => {
      if (newLocation.pathname !== loginRoute) {
        fetchNotificationsCount();
      }
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // don't fetch notifications if already on the Notifications page
    const path = get(nextProps, 'history.location.pathname');
    if (nextProps.notificationsCount !== this.props.notificationsCount && path !== '/profile/notifications') {
      // only fetch notifications if the count has changed
      this.props.fetchNotifications();
      this.props.fetchHandshakeNotifications();
    }
  }
  render() {
    const { notificationsCount, ...rest } = this.props;
    return (
      <IconAlert
        type="globe"
        number={notificationsCount}
        title="View your notifications"
        {...rest}
      />
    );
  }
}

Notifications.propTypes = {
  notificationsCount: PropTypes.number.isRequired,
  fetchNotificationsCount: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  fetchHandshakeNotifications: PropTypes.func.isRequired,
  history: HISTORY_OBJECT.isRequired,
};

Notifications.defaultProps = {
  notificationsCount: 0,
};

const mapStateToProps = state => ({
  notificationsCount: state.notificationsCount,
});

export const mapDispatchToProps = dispatch => ({
  fetchNotificationsCount: () => dispatch(notificationsCountFetchData()),
  fetchNotifications: () => dispatch(notificationsFetchData()),
  fetchHandshakeNotifications: () => dispatch(handshakeNotificationsFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notifications));
