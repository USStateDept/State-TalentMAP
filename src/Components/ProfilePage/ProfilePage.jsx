import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileNavigation from '../ProfileNavigation';
import FavoritePositions from '../FavoritePositions';
import ProfileLanding from '../ProfileLanding';
import { POSITION_SEARCH_RESULTS, USER_PROFILE } from '../../Constants/PropTypes';

const ProfilePage = ({ user, favoritePositions, toggleFavorite, favoritePositionsIsLoading,
favoritePositionsHasErrored, toggleFavoritePositionIsLoading,
toggleFavoritePositionHasErrored }) => (
  <div className="usa-grid-full">
    <h1>
      {
        user.user && user.user.username &&
        `Hello, ${user.user.username}!`
      }
    </h1>
    <div className="usa-width-one-fourth">
      <ProfileNavigation />
    </div>
    <div className="usa-grid-full usa-width-three-fourths profile-subroute-container">
      <Route
        path="/profile/favorites"
        component={() =>
          (
            <FavoritePositions
              toggleFavorite={toggleFavorite}
              favorites={favoritePositions}
              favoritePositionsIsLoading={favoritePositionsIsLoading}
              favoritePositionsHasErrored={favoritePositionsHasErrored}
              toggleFavoritePositionIsLoading={toggleFavoritePositionIsLoading}
              toggleFavoritePositionHasErrored={toggleFavoritePositionHasErrored}
            />
          )
        }
      />
      <Route path="/profile" exact component={ProfileLanding} />
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: USER_PROFILE.isRequired,
  favoritePositions: POSITION_SEARCH_RESULTS,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  toggleFavoritePositionIsLoading: PropTypes.bool,
  toggleFavoritePositionHasErrored: PropTypes.bool,
};

ProfilePage.defaultProps = {
  favoritePositions: {},
  toggleFavoritePositionIsLoading: false,
  toggleFavoritePositionHasErrored: false,
};

export default ProfilePage;
