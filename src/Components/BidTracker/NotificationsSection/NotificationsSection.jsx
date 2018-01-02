import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_LIST } from '../../../Constants/PropTypes';
import Dismiss from '../../Dismiss';
import AlertAlt from '../../Alert/AlertAlt';

class NotificationsSection extends Component {
  constructor(props) {
    super(props);
    // when the notification is closed, update state so that notification immediately disappears
    this.state = {
      markedAsRead: { value: false },
    };
  }

  markNotification(id) {
    const { markedAsRead } = this.state;
    markedAsRead.value = true;
    this.setState({ markedAsRead });
    this.props.markBidTrackerNotification(id);
  }

  render() {
    const { notifications, notificationsIsLoading } = this.props;
    const { markedAsRead } = this.state;
    // Even if there's notifications, we only want unread ones.
    // We also ensure that the notification is unread and has the bidding tag.
    // We assume the notifications are returned in chronological order, newest first.
    // We keep this logic here instead of at the container level in case we want to implement
    // something like "View more notifications" or
    // "3 other bidding notifications", etc in the future.
    const filteredNotifications = notifications.results.slice().filter(n => n.is_read === false && n.tags.includes('bidding'));
    let notification;
    // we're also only going to show the first
    if (filteredNotifications.length) { notification = filteredNotifications[0]; }
    // if loading is complete and there is a notification, we can display it
    const shouldShowNotification = !notificationsIsLoading && notification && !markedAsRead.value;
    // Determine what type of notification to display.
    // Default to "success" unless "declined" is one of the tags.
    let notificationType = 'success';
    if (notification && notification.tags.includes('declined')) {
      notificationType = 'warning';
    }
    return (
      <div>
        {
          shouldShowNotification &&
          <div className="usa-grid-full bid-tracker-notifications">
            <Dismiss
              onDismiss={() => this.markNotification(notification.id)}
              className="dismiss-alt"
            >
              <AlertAlt
                type={notificationType}
                title="Notification"
                message={notification.message}
              />
            </Dismiss>
          </div>
        }
      </div>
    );
  }
}

NotificationsSection.propTypes = {
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  markBidTrackerNotification: PropTypes.func.isRequired,
};

export default NotificationsSection;
