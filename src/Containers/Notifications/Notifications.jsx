import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationsFetchData, markNotification } from '../../actions/notifications';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import Notifications from '../../Components/Notifications';
import { scrollToTop } from '../../utilities';

const PAGE_SIZE = 10;

class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    this.getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markNotificationIsLoading && !nextProps.markNotificationIsLoading
      && !nextProps.markNotificationHasErrored) {
      this.getNotifications();
    }
  }

  onPageChange({ page }) {
    this.setState({ page }, () => {
      scrollToTop({ delay: 0, duration: 400 });
      this.getNotifications();
    });
  }

  getNotifications(p) {
    const { page } = this.state;
    const page$ = p || page;
    this.props.fetchData(page$);
  }

  delete(id) {
    this.props.delete(id);
    this.onPageChange({ page: 1 });
  }

  render() {
    const {
      notifications,
      isLoading,
      hasErrored,
      markNotificationIsLoading,
    } = this.props;

    const { page } = this.state;

    const props = {
      notifications,
      isLoading: isLoading || markNotificationIsLoading,
      hasErrored,
      deleteOne: this.delete,
      page,
      pageSize: PAGE_SIZE,
      onPageChange: this.onPageChange,
    };
    return (
      <Notifications {...props} />
    );
  }
}

NotificationsContainer.propTypes = {
  fetchData: PropTypes.func,
  delete: PropTypes.func,
  notifications: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  markNotificationIsLoading: PropTypes.bool,
  markNotificationHasErrored: PropTypes.bool,
};

NotificationsContainer.defaultProps = {
  fetchData: EMPTY_FUNCTION,
  delete: EMPTY_FUNCTION,
  notifications: {},
  isLoading: false,
  hasErrored: false,
  markNotificationIsLoading: false,
  markNotificationHasErrored: false,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
  hasErrored: state.notificationsHasErrored,
  isLoading: state.notificationsIsLoading,
  markNotificationIsLoading: state.markNotificationIsLoading,
  markNotificationHasErrored: state.markNotificationHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: page => dispatch(notificationsFetchData(PAGE_SIZE, page)),
  delete: id => dispatch(markNotification(id, false, true, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
