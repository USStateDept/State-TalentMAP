import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import { formQueryString } from 'utilities';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { Column, Row } from '../../Layout';
import NotificationItem from '../../ProfileDashboard/Notifications/NotificationItem';
import LinkButton from '../../LinkButton';
import CheckBox from '../../CheckBox';

export const NotificationRow = ({ id, message, tags, deleteOne, date, isRead, onCheck, checked,
  meta, onNavigateTo }) => {
  let link;
  let buttonTitle;
  let buttonTitle2;
  let icon = 'globe';
  const tags$ = new Set(tags);
  if (tags$.has('bidding')) {
    link = '/profile/bidtracker';
    buttonTitle = 'Go to Bid Tracker';
    icon = 'clipboard';
  }
  if (tags$.has('saved_search')) {
    link = '/profile/searches';
    buttonTitle = 'Go to Saved Searches';
    icon = 'clock-o';
    if (meta.count && meta.search && meta.search.endpoint !== '/api/v1/fsbid/projected_vacancies/' && meta.search.endpoint !== '/api/v1/fsbid/projected_vacancies/tandem/') {
      buttonTitle2 = 'View New Results';
    }
  }
  if (tags$.has('bureau_bidding')) {
    const bureauPositionId = get(meta, 'id');
    if (bureauPositionId) {
      link = `/profile/bureau/positionmanager/available/${bureauPositionId}`;
      buttonTitle = 'Go to Position Details';
    }
    icon = 'clipboard';
  }
  const title = (
    <div>
      <div><FA name={icon} /> {message}</div>
    </div>
  );
  const renderButton = () => !!link && !!title && <LinkButton toLink={link} className="usa-button">{buttonTitle}</LinkButton>;

  const goToSavedSearch = () => {
    const q = { ...meta.search.filters, ordering: '-posted_date', count: meta.count };
    const stringifiedQuery = formQueryString(q);
    onNavigateTo(`/results?${stringifiedQuery}`);
  };

  return (
    <Row className={`usa-grid-full notification-row ${isRead ? 'notification-row--read' : ''}`}>
      <Column columns={8} style={{ display: 'flex' }}>
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
      <Column columns={4} className="notification-button">
        {buttonTitle2 && <button className="usa-button" onClick={goToSavedSearch}>{buttonTitle2}</button>}
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
  meta: PropTypes.shape({
    count: PropTypes.number,
    search: PropTypes.shape({ endpoint: PropTypes.string, filters: PropTypes.shape({}) }),
  }),
  onNavigateTo: PropTypes.func,
};

NotificationRow.defaultProps = {
  tags: [],
  deleteOne: EMPTY_FUNCTION,
  date: '',
  isRead: false,
  onCheck: EMPTY_FUNCTION,
  checked: false,
  meta: {},
  onNavigateTo: EMPTY_FUNCTION,
};

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(null, mapDispatchToProps)(withRouter(NotificationRow));
