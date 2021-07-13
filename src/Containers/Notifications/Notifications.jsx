import { Component, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { difference, get, intersection } from 'lodash';
import { markNotification, markNotifications, notificationsFetchData } from '../../actions/notifications';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { scrollToTop } from '../../utilities';

const PAGE_SIZE = 10;

class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      selectedNotifications: new Set(),
      hasCalled: false,
    };
  }

  UNSAFE_componentWillMount() {
    const { useCached } = this.props;
    if (!useCached) { this.getNotifications(); }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { hasCalled } = this.state;
    const { useCached, isLoading } = nextProps;
    // force at least one call, then rely on external refreshes of notifications
    if (useCached && !isLoading && !hasCalled) {
      this.setState({ hasCalled: true });
      this.getNotifications();
    }
  }

  onPageChange = ({ page }) => {
    this.setState({ page }, () => {
      scrollToTop({ delay: 0, duration: 400 });
      this.getNotifications();
    });
  };

  onCheck = (value, props) => {
    const { selectedNotifications } = this.state;
    const { _id } = props;
    const action = value ? 'add' : 'delete';
    selectedNotifications[action](_id);
    this.setState({ selectedNotifications });
  };

  getCheckedValueById = id => {
    const { selectedNotifications } = this.state;
    return selectedNotifications.has(id);
  };

  getNotifications(p) {
    const { page } = this.state;
    const page$ = p || page;
    this.props.fetchData(page$);
  }

  getCurrentResults() {
    return get(this.props.notifications, 'results', []);
  }

  getCallback() {
    return () => this.getNotifications();
  }

  selectAll = () => {
    const { selectedNotifications } = this.state;
    const results = this.getCurrentResults();
    // does it contain all from results page?
    if (difference(results.map(r => r.id), [...selectedNotifications]).length === 0) {
      // remove all from results page
      results.forEach(r => selectedNotifications.delete(r.id));
    } else {
      // add all from results page
      results.forEach(r => selectedNotifications.add(r.id));
    }
    this.setState({ selectedNotifications });
  };

  markNotificationsByType = type => {
    const { selectedNotifications } = this.state;

    const results = this.getCurrentResults();

    const ids = intersection(results.map(r => r.id), [...selectedNotifications]);

    const cb = this.getCallback();

    const config = { ids, markAsRead: false, shouldDelete: false, cb };

    if (type === 'delete') {
      this.onPageChange({ page: 1 });
      this.props.markNotifications({ ...config, shouldDelete: true });
    } else if (type === 'read') {
      this.props.markNotifications({ ...config, markAsRead: true });
    } else if (type === 'unread') {
      this.props.markNotifications({ ...config, markAsRead: false });
    }

    results.forEach(r => selectedNotifications.delete(r.id));
  };

  delete = id => {
    const cb = this.getCallback();
    this.props.delete(id, cb);
    this.onPageChange({ page: 1 });
  };

  selectionsExist = () => {
    const { selectedNotifications } = this.state;
    return !!selectedNotifications.size;
  };

  render() {
    const {
      notifications,
      isLoading,
      hasErrored,
      notificationsPopover,
      isLoadingPopover,
      hasErroredPopover,
      markNotificationIsLoading,
      markNotificationsIsLoading,
      children,
    } = this.props;

    const { page } = this.state;

    const selectionsExist = this.selectionsExist();

    const props = {
      notifications,
      isLoading: isLoading || markNotificationIsLoading || markNotificationsIsLoading,
      hasErrored,
      notificationsPopover,
      isLoadingPopover,
      hasErroredPopover,
      deleteOne: this.delete,
      page,
      pageSize: PAGE_SIZE,
      onPageChange: this.onPageChange,
      onCheck: this.onCheck,
      getCheckedValue: this.getCheckedValueById,
      selectAll: this.selectAll,
      markNotificationsByType: this.markNotificationsByType,
      selectionsExist,
    };
    let toReturn = null;
    if (isValidElement(children)) {
      toReturn = cloneElement(children, props);
    } else if (typeof children === 'function') {
      toReturn = this.props.children({
        props: this.props,
        state: this.state,
      });
    }
    return toReturn;
  }
}

NotificationsContainer.propTypes = {
  fetchData: PropTypes.func,
  delete: PropTypes.func,
  notifications: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  notificationsPopover: PropTypes.shape({}),
  isLoadingPopover: PropTypes.bool,
  hasErroredPopover: PropTypes.bool,
  markNotificationIsLoading: PropTypes.bool,
  markNotificationsIsLoading: PropTypes.bool,
  markNotifications: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  useCached: PropTypes.bool,
};

NotificationsContainer.defaultProps = {
  fetchData: EMPTY_FUNCTION,
  delete: EMPTY_FUNCTION,
  notifications: {},
  isLoading: false,
  hasErrored: false,
  notificationsPopover: {},
  isLoadingPopover: false,
  hasErroredPopover: false,
  markNotificationIsLoading: false,
  markNotificationsIsLoading: false,
  markNotifications: EMPTY_FUNCTION,
  useCached: false,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
  hasErrored: state.notificationsHasErrored,
  isLoading: state.notificationsIsLoading,
  notificationsPopover: state.notificationsPopover,
  hasErroredPopover: state.notificationsPopoverHasErrored,
  isLoadingPopover: state.notificationsPopoverIsLoading,
  markNotificationIsLoading: state.markNotificationIsLoading,
  markNotificationsIsLoading: state.markNotificationsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: page => dispatch(notificationsFetchData(PAGE_SIZE, page)),
  delete: (id, cb) => dispatch(markNotification(id, false, true, true, cb)),
  markNotifications: config => dispatch(markNotifications(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
