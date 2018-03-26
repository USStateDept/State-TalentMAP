import React from 'react';
import PropTypes from 'prop-types';
import {
  USER_PROFILE,
  FAVORITE_POSITIONS_ARRAY,
} from '../../Constants/PropTypes';
import UserProfile from './UserProfile';
import Spinner from '../Spinner';
import BidListComingSoon from './BidListComingSoon';
import Favorites from './Favorites';
import SavedSearches from './SavedSearches/SavedSearchesWrapper';

const ProfileDashboard = ({
  userProfile,
  isLoading,
  favoritePositions,
  favoritePositionsIsLoading,
}) => (
  <div className="usa-grid-full user-dashboard user-dashboard-main profile-content-inner-container">
    {isLoading || favoritePositionsIsLoading ? (
      <Spinner type="homepage-position-results" size="big" />
    ) : (
      <div className="usa-grid-full">
        <div className="hello-greeting">
          <h2 className="sr-only">Dashboard</h2>
          {`Hello, ${userProfile.display_name}`}
        </div>
        <div className="usa-grid-full">
          <div
            className={`usa-width-five-twelfths user-dashboard-section-container
                        user-dashboard-column-1`}
          >
            <div className="usa-width-one-whole user-dashboard-section current-user-section">
              <UserProfile userProfile={userProfile} />
            </div>
            <div className="usa-width-one-whole user-dashboard-section">
              <BidListComingSoon />
            </div>
          </div>
          <div
            className={`usa-width-seven-twelfths user-dashboard-section-container
                        user-dashboard-column-2`}
          >
            <div className="usa-width-one-whole user-dashboard-section favorites-section">
              <SavedSearches />
            </div>
            <div className="usa-width-one-whole user-dashboard-section favorites-section">
              <Favorites favorites={favoritePositions} />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

ProfileDashboard.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  isLoading: PropTypes.bool.isRequired,
  favoritePositions: FAVORITE_POSITIONS_ARRAY,
  favoritePositionsIsLoading: PropTypes.bool,
};

ProfileDashboard.defaultProps = {
  favoritePositions: [],
  favoritePositionsIsLoading: false,
  filtersIsLoading: false,
};

export default ProfileDashboard;
