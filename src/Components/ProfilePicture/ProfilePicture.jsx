import React from 'react';
import PropTypes from 'prop-types';
import { getAssetPath } from '../../utilities';

const picture = getAssetPath('/assets/img/avatar.png');

const ProfilePicture = ({ alt, source, className }) => (
  <img
    alt={alt}
    className={`dashboard-user-profile-picture ${className}`}
    src={source}
  />
);

ProfilePicture.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  source: PropTypes.string,
};

ProfilePicture.defaultProps = {
  alt: 'avatar',
  className: '',
  source: picture,
};

export default ProfilePicture;
