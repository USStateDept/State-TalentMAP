import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flag } from 'flag';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import BidderPortfolio from '../../Containers/BidderPortfolio';
import BidCycles from '../../Containers/BidCycles';
import FavoritePositionsContainer from '../../Containers/Favorites/Favorites';
import GlossaryEditor from '../../Containers/GlossaryEditor';
import BidTracker from '../../Containers/BidTracker';
import BidStatistics from '../../Containers/BidStatistics';
import SavedSearchesWrapper from '../../Components/SavedSearches/SavedSearchesWrapper';
import ProfilePublic from '../../Containers/ProfilePublic';
import Notifications from './Notifications';
import Administrator from '../../Containers/Administrator';
import Bureau from '../../Containers/Bureau';
import GLOSSARY_EDITOR_PERM from '../../Constants/Permissions';
import { USER_PROFILE } from '../../Constants/PropTypes';
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
          <Route path="/profile/bidderportfolio" component={BidderPortfolio} />
          <Route path="/profile/cycles" component={BidCycles} />
          <Route path="/profile/favorites" component={FavoritePositionsContainer} />
          <Route path="/profile/searches" component={SavedSearchesWrapper} />
          <Route
            path="/profile/bidtracker/public/:id/:bid?"
            render={props => <BidTracker {...props} isPublic />}
          />
          <Route path="/profile/bidtracker/:bid?" component={BidTracker} />
          <Route path="/profile/statistics" component={BidStatistics} />
          <Route path="/profile/glossaryeditor" component={GlossaryEditor} />
          <Route path="/profile/public/:id" component={ProfilePublic} />
          <Route path="/profile/notifications" component={Notifications} />
          <Route path="/profile/administrator" component={Administrator} />
          <Route path="/profile/bureau" component={Bureau} />
          <Flag
            name="flags.bidding"
            render={() => (
              <Route path="/profile/bidtracker" component={BidTracker} />
            )}
          />
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
