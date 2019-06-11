import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { Column, Row } from '../../Layout';
import NotificationItem from '../../ProfileDashboard/Notifications/NotificationItem';
import LinkButton from '../../LinkButton';
import CheckBox from '../../CheckBox';

const NotificationRow = ({ id, message, tags, deleteOne, date, isRead, onCheck, checked }) => {
  let link;
  let buttonTitle;
  let icon = 'globe';
  const tags$ = new Set(tags);
  if (tags$.has('bidding')) {
    link = '/profile/bidtracker';
    buttonTitle = 'Go to Bid Tracker';
    icon = 'clipboard';
  }
  if (tags$.has('saved_search')) {
    link = '/profile/searches';
    buttonTitle = 'Go to Saved Search';
    icon = 'clock-o';
  }
  const title = (
    <div>
      <div><FA name={icon} /> {message}</div>
    </div>
  );
  const renderButton = () => !!link && !!title && <LinkButton toLink={link} className="usa-button">{buttonTitle}</LinkButton>;
  return (
    <Row className={`usa-grid-full notification-row ${isRead ? 'notification-row--read' : ''}`}>
      <Column columns={9} style={{ display: 'flex' }}>
        <CheckBox
          _id={id}
          id={`notification-checkbox-${id}`}
          label="Mark notification"
          value={checked}
          labelSrOnly
          onCheckBoxClick={onCheck}
        />
        <NotificationItem content={title} notificationTime={date} />
      </Column>
      <Column columns={3} className="notification-button">
        {renderButton()}
        <button id="delete-notification-button" title="Delete this notification" onClick={() => deleteOne(id)} className="usa-button-secondary delete-button"><FA name="trash-o" /></button>
      </Column>
    </Row>
  );
};

NotificationRow.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  deleteOne: PropTypes.func,
  date: PropTypes.string,
  isRead: PropTypes.bool,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
};

NotificationRow.defaultProps = {
  tags: [],
  deleteOne: EMPTY_FUNCTION,
  date: '',
  isRead: false,
  onCheck: EMPTY_FUNCTION,
  checked: false,
};

export default NotificationRow;
