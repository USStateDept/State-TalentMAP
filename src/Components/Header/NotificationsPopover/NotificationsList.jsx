import { get } from 'lodash';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { getTimeDistanceInWords } from 'utilities';

const NotificationsPopover = ({ notifications, hasErrored, isLoading }) => {
  let notifications$ = get(notifications, 'results', []);
  notifications$ = notifications$.slice(0, 5);
  return (
    <div>
      {
        !isLoading && !hasErrored &&
          <div className="notifications-list">
            {
              notifications$.map((n) => {
                const timeDistanceInWords = getTimeDistanceInWords(n.date_created);
                return (
                  <div
                    key={n.id}
                    className={`account-dropdown--identity account-dropdown--segment ${n.is_read ? '' : 'unread'}`}
                  >
                    {n.message}
                    <div className="notification-time">
                      {timeDistanceInWords}
                    </div>
                  </div>
                );
              })
            }
          </div>
      }
      {
        isLoading && !hasErrored &&
          <div className="notifications-alert">
            <FA name="spinner" spin />
          </div>
      }
      {
        !isLoading && hasErrored &&
          <div className="notifications-alert notifications-error">
            <FA name="exclamation-circle" /> Error loading notifications.
          </div>
      }
      {
        !isLoading && !hasErrored && !notifications$.length &&
          <div className="notifications-alert notifications-error">
            You do not have any notifications.
          </div>
      }
    </div>
  );
};

NotificationsPopover.propTypes = {
  notifications: PropTypes.shape({}).isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
};

NotificationsPopover.defaultProps = {
  hasErrored: false,
  isLoading: false,
};

export default NotificationsPopover;
