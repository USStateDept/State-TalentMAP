import React from 'react';
import PropTypes from 'prop-types';
import InformationDataPoint from '../../InformationDataPoint';
import { getTimeDistanceInWords } from '../../../../utilities';

const NotificationItem = ({ content, notificationTime }) => {
  const timeDistanceInWords = getTimeDistanceInWords(notificationTime);
  return (
    <div className="usa-grid-full notification-card">
      <InformationDataPoint content={content} title={timeDistanceInWords} titleOnBottom />
    </div>
  );
};

NotificationItem.propTypes = {
  content: PropTypes.node.isRequired,
  notificationTime: PropTypes.string.isRequired,
};

export default NotificationItem;
