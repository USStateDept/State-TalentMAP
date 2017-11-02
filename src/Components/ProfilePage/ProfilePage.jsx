import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileNavigation from '../ProfileNavigation';
import ProfileLanding from '../ProfileLanding';
import BidListContainer from '../../Containers/BidList/BidList';
import FavoritePositionsContainer from '../../Containers/Favorites/Favorites';
import SavedSearchesContainer from '../../Containers/SavedSearches/SavedSearches';
import { USER_PROFILE } from '../../Constants/PropTypes';

const ProfilePage = ({ user }) => (
  <div className="usa-grid-full">
    <h1>
      {
        `Hello, ${user.user.username}!`
      }
    </h1>
    <div className="usa-width-one-fourth">
      <ProfileNavigation />
    </div>
    <div className="usa-grid-full usa-width-three-fourths profile-subroute-container">
      <Switch>
        <Route path="/profile" exact component={ProfileLanding} />
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
};

export default ProfilePage;
