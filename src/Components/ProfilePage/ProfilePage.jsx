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
    Hello, user {JSON.stringify(user)}
    </h1>
    <Link to="/profile/child">
      Example topic
    </Link>
    <br />
    <Link to="/profile/child2">
      Another topic
    </Link>
    <Route path="/profile/child" component={Topic} />
    <Route path="/profile/child2" component={Topic2} />
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default ProfilePage;
