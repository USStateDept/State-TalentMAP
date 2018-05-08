import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import Status from '../Status';
import EditProfile from '../EditProfile';
import Avatar from '../../../Avatar';
import StaticDevContent from '../../../StaticDevContent';
import SkillCodeList from '../../../SkillCodeList';

const UserProfileGeneralInformation = ({ userProfile, showEditLink, useGroup }) => (
  <div className="current-user-top current-user-section-container">
    <div className="section-padded-inner-container">
      <div className="avatar-group">
        <Status />
        <Avatar
          className="dashboard-user-profile-picture"
          initials={userProfile.initials}
          display_name={userProfile.display_name}
          firstName={userProfile.user.first_name}
          lastName={userProfile.user.last_name}
        />
      </div>
      { showEditLink && <EditProfile /> }
      <div className="name-group">
        <SectionTitle small title={`${userProfile.user.last_name}, ${userProfile.user.first_name}`} className="current-user-name" />
        {
          useGroup ?
            <StaticDevContent>
              <InformationDataPoint
                content="Generalist • F2"
                className="skill-code-data-point-container skill-code-data-point-container-gen-spec"
              />
            </StaticDevContent>
            :
            <InformationDataPoint
              content={<SkillCodeList skillCodes={userProfile.skills} />}
              className="skill-code-data-point-container skill-code-data-point-container-skill"
            />
        }
      </div>
    </div>
  </div>
);

UserProfileGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  useGroup: PropTypes.bool,
};

UserProfileGeneralInformation.defaultProps = {
  showEditLink: true,
  useGroup: false,
};

export default UserProfileGeneralInformation;
