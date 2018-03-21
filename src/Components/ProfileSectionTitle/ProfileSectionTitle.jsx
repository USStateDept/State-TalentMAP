import React from 'react';
import PropTypes from 'prop-types';

const ProfileSectionTitle = ({ title }) => (
  <h2 className="usa-grid-full hello-greeting">
    {title}
  </h2>
);

ProfileSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProfileSectionTitle;
