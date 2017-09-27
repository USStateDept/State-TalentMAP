import React from 'react';
import PropTypes from 'prop-types';

const ProfileSectionTitle = ({ title }) => (
  <div className="usa-grid-full">
    {title}
  </div>
);

ProfileSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProfileSectionTitle;
