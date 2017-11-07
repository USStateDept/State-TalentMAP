import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileLanding from '../ProfileLanding';
import BidListContainer from '../../Containers/BidList/BidList';
import FavoritePositionsContainer from '../../Containers/Favorites/Favorites';
import SavedSearchesContainer from '../../Containers/SavedSearches/SavedSearches';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import ProfileMenu from '../ProfileMenu';
import { USER_PROFILE } from '../../Constants/PropTypes';

const ProfilePage = ({ user, currentPath }) => (
  <div className="profile-page">
    <ProfileMenu currentPath={currentPath} />
    <div className="usa-grid-full profile-content-container">
      <div className="hello-greeting">
        {
          `Hello, ${user.user.username}`
        }
      </div>
      <Switch>
        <Route path="/profile" exact component={ProfileLanding} />
        <Route path="/profile/dashboard" component={Dashboard} />
        <Route
          path="/profile/favorites"
          component={FavoritePositionsContainer}
        />
        <Route
          path="/profile/searches"
          component={SavedSearchesContainer}
        />
        <Route
          path="/profile/bidlist"
          component={BidListContainer}
        />
      </Switch>
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: USER_PROFILE.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default ProfilePage;
