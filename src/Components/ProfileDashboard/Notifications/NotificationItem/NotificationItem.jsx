import React from 'react';
import PropTypes from 'prop-types';
import InformationDataPoint from '../../InformationDataPoint';

const NotificationItem = ({ content, notificationTime }) => (
  <div className="usa-grid-full notification-card">
    <InformationDataPoint content={content} title={notificationTime} titleOnBottom />
  </div>
);

NotificationItem.propTypes = {
  content: PropTypes.node.isRequired,
  notificationTime: PropTypes.string.isRequired,
};

export default NotificationItem;
