import React from 'react';
import { Link } from 'react-router-dom';
import { NOTIFICATION_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import Notification from './Notification';

const Notifications = ({ notifications }) => {
  const notificationArray = [];
  // only show the first 3
  notifications.slice(0, 3).forEach(notification => (
    notificationArray.push(
      <Notification
        content={notification.message}
        notificationTime={notification.date_updated}
      />,
    )
  ));
  return (
    <div className="usa-grid-full">
      <div className="usa-grid-full section-padded-inner-container padded-container-no-bottom">
        <div className="usa-width-three-fourths">
          <SectionTitle title="Notifications" icon="globe" />
        </div>
        <div className="usa-width-one-fourth small-link-container small-link-container-settings">
          <Link to="/profile/dashboard/">Settings</Link>
        </div>
      </div>
      <BorderedList contentArray={notificationArray} />
      <div className="section-padded-inner-container small-link-container view-more-link-centered">
        <Link to="/profile/dashboard/">See all</Link>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  notifications: NOTIFICATION_RESULTS.isRequired,
};

Notifications.defaultProps = {
  notifications: [],
};

export default Notifications;
