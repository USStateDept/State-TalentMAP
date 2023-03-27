import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Settings from 'Components/Settings';
import Dashboard from 'Containers/Dashboard/Dashboard';
import FavoritePositionsContainer from 'Containers/Favorites/Favorites';
import GlossaryEditor from 'Containers/GlossaryEditor';
import BidTracker from 'Containers/BidTracker';
import BidStatistics from 'Containers/BidStatistics';
import SavedSearchesWrapper from 'Components/SavedSearches/SavedSearchesWrapper';
import ProfilePublic from 'Containers/ProfilePublic';
import Administrator from 'Containers/Administrator';
import Bureau from 'Containers/Bureau';
import Cdo from 'Containers/Cdo';
import Post from 'Containers/Post';
import GLOSSARY_EDITOR_PERM from 'Constants/Permissions';
import { USER_PROFILE } from 'Constants/PropTypes';
import Notifications from './Notifications';
import { userHasPermissions } from '../../utilities';
import ProfileMenu from '../ProfileMenu';
import Spinner from '../Spinner/Spinner';

const ProfilePage = ({ user, isLoading }) => (
  <div className="profile-page">
    <ProfileMenu
      roles={user.permission_groups}
      isGlossaryEditor={userHasPermissions([GLOSSARY_EDITOR_PERM], user.permission_groups)}
    />
    <div className="usa-grid-full profile-content-container">
      {isLoading ?
        <Spinner size="small" type="homepage-positions-results" />
        :
        <Switch>
          <Route path="/profile/dashboard" component={Dashboard} />
          <Route path="/profile/favorites" component={FavoritePositionsContainer} />
          <Route path="/profile/searches" component={SavedSearchesWrapper} />
          <Route path="/profile/settings" component={Settings} />
          <Route
            path="/profile/bidtracker/public/:id/:bid?"
            render={props => <BidTracker {...props} isPublic />}
          />
          <Route path="/profile/bidtracker/:bid?" component={BidTracker} />
          <Route path="/profile/statistics" component={BidStatistics} />
          <Route path="/profile/glossaryeditor" component={GlossaryEditor} />
          <Route path="/profile/public/:id/:viewType?" component={ProfilePublic} />
          <Route path="/profile/notifications" component={Notifications} />
          <Route path="/profile/administrator" component={Administrator} />
          <Route path="/profile/bureau" component={Bureau} />
          <Route path="/profile/ao" component={Bureau} />
          <Route path="/profile/cdo" component={Cdo} />
          <Route path="/profile/post" component={Post} />
          <Route path="/profile/bidtracker" component={BidTracker} />
        </Switch>
      }
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: USER_PROFILE.isRequired,
  isLoading: PropTypes.bool,
};

ProfilePage.defaultProps = {
  isLoading: false,
};

export default ProfilePage;
