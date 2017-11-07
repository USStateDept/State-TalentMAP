import React from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => (
  <div className="usa-grid-full edit-profile-link">
    <Link to="/profile/dashboard/">Edit Profile</Link>
  </div>
);

export default EditProfile;
