import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Topic = () => (
  <div>
    <h3>some child</h3>
  </div>
);

const Topic2 = () => (
  <div>
    <h3>some other child</h3>
  </div>
);

const ProfilePage = ({ user }) => (
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
    <Route path="/profile/favorites" component={Topic} />
    <Route path="/profile/searches" component={Topic2} />
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default ProfilePage;
