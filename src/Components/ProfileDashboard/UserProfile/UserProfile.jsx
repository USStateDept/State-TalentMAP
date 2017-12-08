import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';

const UserProfile = ({ userProfile, showEditLink, showGeneralInformation,
showContactInformation, useGroup }) => (
  <div className="usa-grid-full current-user">
    {
      showGeneralInformation &&
      <UserProfileGeneralInformation
        userProfile={userProfile}
        showEditLink={showEditLink}
        useGroup={useGroup}
      />
    }
    {
      showContactInformation &&
      <UserProfileContactInformation userProfile={userProfile} />
    }
  </div>
);

UserProfile.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  showGeneralInformation: PropTypes.bool,
  showContactInformation: PropTypes.bool,
  useGroup: PropTypes.bool,
};

UserProfile.defaultProps = {
  showEditLink: true,
  showGeneralInformation: true,
  showContactInformation: true,
  useGroup: false,
};

export default UserProfile;
