import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { Column } from '../Layout';
import PaginationWrapper from '../PaginationWrapper';
import TotalResults from '../TotalResults';
import NotificationRow from './NotificationRow';
import SelectForm from '../SelectForm';
import NotificationCard from '../Assignments/NotificationCard/NotificationCard';

const Notifications = ({ notifications, isLoading, hasErrored, deleteOne, page, pageSize,
  onPageChange, onCheck, getCheckedValue, selectAll, markNotificationsByType }) => {
  const results = get(notifications, 'results', []);
  return (
    <div className={`usa-grid-full favorite-positions-container notifications-page profile-content-inner-container ${isLoading ? 'results-loading' : ''}`}>
      <div className="usa-grid-full favorites-top-section">
        <div className="favorites-title-container">
          <ProfileSectionTitle title="Notifications" icon="globe" />
        </div>
      </div>
      {
        isLoading && !hasErrored &&
        <Spinner type="homepage-position-results" size="big" />
      }
      {
        !isLoading && !results.length &&
        <div>
          {/* temporarily thrown into this feature for local demo purposes */}
          <NotificationCard />
        </div>
      }
      {
        !isLoading && !hasErrored && !!results.length &&
        <div>
          <Column className="total-results-container">
            <TotalResults total={notifications.count} pageNumber={page} pageSize={pageSize} suffix="notifications" />
          </Column>
          <Column className="total-results-container notifications-controls-container">
            <div><button onClick={selectAll}><FA name="check-square-o" />Select all</button></div>
            <div className="results-dropdown results-dropdown-sort">
              <SelectForm
                id="mark-notification-dropdown"
                label="Bulk Actions:"
                options={[
                  { disabled: true, value: '', text: 'Actions' },
                  { value: 'read', text: 'Mark as read' },
                  { value: 'unread', text: 'Mark as unread' },
                  { value: 'delete', text: 'Delete' },
                ]}
                onSelectOption={e => markNotificationsByType(e.target.value)}
              />
            </div>
          </Column>
          <Column>
            {results.map((n) => {
              const checked = getCheckedValue(n.id);
              return (
                <NotificationRow
                  key={n.id}
                  id={n.id}
                  message={n.message}
                  tags={n.tags}
                  deleteOne={deleteOne}
                  date={n.date_created}
                  isRead={n.is_read}
                  onCheck={onCheck}
                  checked={checked}
                  meta={n.meta}
                />
              );
            })}
          </Column>
          <Column>
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                pageSize={pageSize}
                forcePage={page}
                onPageChange={onPageChange}
                totalResults={notifications.count}
              />
            </div>
          </Column>
        </div>
      }
    </div>
  );
};

Notifications.propTypes = {
  deleteOne: PropTypes.func.isRequired,
  notifications: PropTypes.shape({ count: PropTypes.number }),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onCheck: PropTypes.func,
  getCheckedValue: PropTypes.func,
  selectAll: PropTypes.func,
  markNotificationsByType: PropTypes.func,
};

Notifications.defaultProps = {
  deleteOne: EMPTY_FUNCTION,
  notifications: {},
  isLoading: false,
  hasErrored: false,
  page: 1,
  pageSize: 10,
  onPageChange: EMPTY_FUNCTION,
  onCheck: EMPTY_FUNCTION,
  getCheckedValue: EMPTY_FUNCTION,
  selectAll: EMPTY_FUNCTION,
  markNotificationsByType: EMPTY_FUNCTION,
};

export default Notifications;
