import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FavoritePositionsContainer from '../../Containers/Favorites/Favorites';
import SavedSearchesContainer from '../../Containers/SavedSearches/SavedSearches';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import GlossaryEditor from '../../Containers/GlossaryEditor';
import ProfileMenu from '../ProfileMenu';
import { USER_PROFILE } from '../../Constants/PropTypes';
import { userHasPermissions } from '../../utilities';
import GLOSSARY_EDITOR_PERM from '../../Constants/Permissions';

const ProfilePage = ({ user }) => (
  <div className="profile-page">
    <ProfileMenu
      isCDO={user.is_cdo}
      isGlossaryEditor={userHasPermissions([GLOSSARY_EDITOR_PERM], user.permission_groups)}
    />
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/dashboard" component={Dashboard} />
        <Route
          path="/profile/favorites"
          component={FavoritePositionsContainer}
        />
        <Route
          path="/profile/searches"
          component={SavedSearchesContainer}
        />
        <Route path="/profile/glossaryeditor" component={GlossaryEditor} />
      </Switch>
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: USER_PROFILE.isRequired,
};

export default ProfilePage;
