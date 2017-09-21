import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritePositions from '../FavoritePositions';

const Topic2 = () => (
  <div>
    <h2>Select an area to navigate to.</h2>
  </div>
);

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
      <Link to="/profile">
        Profile home
      </Link>
      <br />
      <Link to="/profile/favorites">
        Favorites
      </Link>
      <br />
      <Link to="/profile/searches">
        Saved Searches
      </Link>
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
      <Route path="/profile" exact component={Topic2} />
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  favoritePositions: PropTypes.arrayOf().isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositionsIsLoading: PropTypes.bool,
  favoritePositionsHasErrored: PropTypes.bool,
  toggleFavoritePositionIsLoading: PropTypes.bool,
  toggleFavoritePositionHasErrored: PropTypes.bool,
};

ProfilePage.defaultProps = {
  favoritePositions: [],
  favoritesListIsLoading: false,
  favoritesListHasErrored: false,
};

export default ProfilePage;
