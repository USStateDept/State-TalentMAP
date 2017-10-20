import React from 'react';
import { Link } from 'react-router-dom';

const ProfileNavigation = () => (
  <div className="usa-grid-full">
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
    <br />
    <Link to="/profile/bidlist">
      Bid List
    </Link>
  </div>
);

export default ProfileNavigation;
