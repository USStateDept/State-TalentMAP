import React from 'react';
import PropTypes from 'prop-types';
import InformationDataPoint from '../../InformationDataPoint';

const Notification = ({ content, notificationTime }) => (
  <div className="usa-grid-full">
    <InformationDataPoint content={content} title={notificationTime} titleOnBottom />
  </div>
);

Notification.propTypes = {
  content: PropTypes.node.isRequired,
  notificationTime: PropTypes.string.isRequired,
};

export default Notification;
