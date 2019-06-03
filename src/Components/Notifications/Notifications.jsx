import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { Column } from '../Layout';
import PaginationWrapper from '../PaginationWrapper';
import TotalResults from '../TotalResults';
import NotificationRow from './NotificationRow';

const Notifications = ({ notifications, isLoading, hasErrored, deleteOne, page, pageSize,
  onPageChange }) => {
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
          <div>No notifications</div>
      }
      {
        !isLoading && !hasErrored && !!results.length &&
        <div>
          <Column className="total-results-container">
            <TotalResults total={notifications.count} pageNumber={page} pageSize={pageSize} suffix="notifications" />
          </Column>
          <Column>
            {results.map(n => (
              <NotificationRow
                key={n.id}
                id={n.id}
                message={n.message}
                tags={n.tags}
                deleteOne={deleteOne}
                date={n.date_created}
              />
            ))}
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
  notifications: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  deleteOne: EMPTY_FUNCTION,
  notifications: {},
  isLoading: false,
  hasErrored: false,
  page: 1,
  pageSize: 10,
};

export default Notifications;
