import React from 'react';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import ProfilePicture from '../../../ProfilePicture';

const UserProfileGeneralInformation = ({ userProfile }) => (
  <div className="current-user-top current-user-section-container">
    <div className="section-padded-inner-container">
      <ProfilePicture />
      <SectionTitle small title={`${userProfile.user.first_name} ${userProfile.user.last_name}`} className="current-user-name" />
    </div>
  </div>
);

UserProfileGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

UserProfileGeneralInformation.defaultProps = {
  useGroup: false,
};

export default UserProfileGeneralInformation;
