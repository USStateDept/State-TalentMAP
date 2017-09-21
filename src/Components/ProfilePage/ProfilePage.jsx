import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritePositions from '../FavoritePositions';

const Topic2 = () => (
  <div>
    <h2>Select an area to navigate to above.</h2>
  </div>
);

const ProfilePage = ({ user, favoritePositions }) => (
  <div className="usa-grid-full">
    <h1>
      {
        user.user && user.user.username &&
        `Hello, ${user.user.username}!`
      }
    </h1>
    <Link to="/profile/favorites">
      Favorites
    </Link>
    <br />
    <Link to="/profile/searches">
      Saved Searches
    </Link>
    <div className="usa-grid-full profile-subroute-container">
      <Route
        path="/profile/favorites"
        component={() => <FavoritePositions favorites={favoritePositions} />}
      />
      <Route path="/profile" exact component={Topic2} />
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  favoritePositions: PropTypes.arrayOf().isRequired,
};

ProfilePage.defaultProps = {
  favoritePositions: [],
};

export default ProfilePage;
