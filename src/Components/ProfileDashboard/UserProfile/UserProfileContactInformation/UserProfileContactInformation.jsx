import React from 'react';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import { NO_EMAIL } from '../../../../Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';

const UserProfileContactInformation = ({ userProfile }) => (
  <div className="current-user-bottom current-user-section-container">
    <div className="section-padded-inner-container">
      <SectionTitle small title="Contact Information" />
      <InformationDataPoint title="Email Address" content={userProfile.user.email || NO_EMAIL} />
    </div>
  </div>
);

UserProfileContactInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

UserProfileContactInformation.defaultProps = {
  showEditLink: true,
};

export default UserProfileContactInformation;
