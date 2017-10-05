import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileNavigation from '../ProfileNavigation';
import FavoritePositions from '../FavoritePositions';
import SavedSearches from '../SavedSearches';
import ProfileLanding from '../ProfileLanding';
import * as PROP_TYPES from '../../Constants/PropTypes';

const ProfilePage = ({ user, favoritePositions, toggleFavorite, favoritePositionsIsLoading,
favoritePositionsHasErrored, toggleFavoritePositionIsLoading,
toggleFavoritePositionHasErrored, savedSearches, goToSavedSearch,
savedSearchesHasErrored, savedSearchesIsLoading, deleteSearch,
deleteSavedSearchIsLoading, deleteSavedSearchHasErrored, deleteSavedSearchSuccess,
cloneSavedSearch, cloneSavedSearchIsLoading, cloneSavedSearchHasErrored,
cloneSavedSearchSuccess }) => (
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
      <Route path="/profile" exact component={ProfileLanding} />
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
      <Route
        path="/profile/searches"
        component={() =>
          (
            <SavedSearches
              savedSearches={savedSearches}
              savedSearchesHasErrored={savedSearchesHasErrored}
              savedSearchesIsLoading={savedSearchesIsLoading}
              goToSavedSearch={goToSavedSearch}
              deleteSearch={deleteSearch}
              deleteSavedSearchIsLoading={deleteSavedSearchIsLoading}
              deleteSavedSearchHasErrored={deleteSavedSearchHasErrored}
              deleteSavedSearchSuccess={deleteSavedSearchSuccess}
              cloneSavedSearch={cloneSavedSearch}
              cloneSavedSearchIsLoading={cloneSavedSearchIsLoading}
              cloneSavedSearchHasErrored={cloneSavedSearchHasErrored}
              cloneSavedSearchSuccess={cloneSavedSearchSuccess}
            />
          )
        }
      />
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: PROP_TYPES.USER_PROFILE.isRequired,
  favoritePositions: PROP_TYPES.POSITION_SEARCH_RESULTS,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  toggleFavoritePositionIsLoading: PropTypes.bool,
  toggleFavoritePositionHasErrored: PropTypes.bool,
  savedSearches: PROP_TYPES.SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: PROP_TYPES.DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: PROP_TYPES.DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: PROP_TYPES.CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: PROP_TYPES.CLONE_SAVED_SEARCH_SUCCESS.isRequired,
};

ProfilePage.defaultProps = {
  favoritePositions: {},
  toggleFavoritePositionIsLoading: false,
  toggleFavoritePositionHasErrored: false,
};

export default ProfilePage;
