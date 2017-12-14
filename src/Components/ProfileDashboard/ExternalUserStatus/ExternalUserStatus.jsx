import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../../ProfilePicture';
import Status from '../UserProfile/Status';
import USER_TYPES from '../../../Constants/UserTypes';

const ExternalUserStatus = ({ name, type }) => (
  <div className="usa-grid-full cdo-container">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-sixth profile-picture-container">
        <ProfilePicture />
      </div>
      <div className="usa-width-five-sixths cdo-text-container">
        <div className="cdo-header">
          {USER_TYPES[type]}
        </div>
        <div className="cdo-name">
          <span className="cdo-name-text">{name}</span>
          <Status hideText />
        </div>
      </div>
    </div>
  </div>
);

ExternalUserStatus.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cdo', 'ao']).isRequired,
};

export default ExternalUserStatus;
