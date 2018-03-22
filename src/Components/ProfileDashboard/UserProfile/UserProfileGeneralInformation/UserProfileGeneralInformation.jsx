import React from 'react';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import Avatar from '../../../Avatar';

const UserProfileGeneralInformation = ({ userProfile }) => (
  <div className="current-user-top current-user-section-container">
    <div className="section-padded-inner-container">
      <Avatar
        className="dashboard-user-profile-picture"
        initials={userProfile.initials}
        display_name={userProfile.display_name}
        firstName={userProfile.user.first_name}
        lastName={userProfile.user.last_name}
      />
      <SectionTitle
        title={`${userProfile.user.first_name} ${userProfile.user.last_name}`}
        className="current-user-name"
        small
      />
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
