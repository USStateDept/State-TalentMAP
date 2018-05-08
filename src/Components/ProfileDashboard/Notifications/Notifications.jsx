import React from 'react';
import { Link } from 'react-router-dom';
import { NOTIFICATION_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import NotificationItem from './NotificationItem';
import StaticDevContent from '../../StaticDevContent';

const Notifications = ({ notifications }) => {
  const notificationArray = [];
  notifications.slice().forEach(notification => (
    notificationArray.push(
      <NotificationItem
        content={notification.message}
        notificationTime={notification.date_updated}
      />,
    )
  ));
  return (
    <div className="usa-grid-full notifications-container">
      <div className="usa-grid-full section-padded-inner-container padded-container-no-bottom">
        <div className="usa-width-three-fourths">
          <SectionTitle title="Notifications" icon="globe" />
        </div>
        <div className="usa-width-one-fourth small-link-container small-link-container-settings">
          <StaticDevContent>
            <Link to="/profile/dashboard/">Settings</Link>
          </StaticDevContent>
        </div>
      </div>
      {
        notificationArray.length === 0 ?
          <div className="usa-grid-full section-padded-inner-container notifications-top" >
            You have no notifications at this time
          </div> :
          <BorderedList contentArray={notificationArray} />
      }
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
