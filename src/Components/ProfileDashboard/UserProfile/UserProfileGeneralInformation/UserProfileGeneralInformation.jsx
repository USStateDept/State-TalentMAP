import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import ProfilePicture from '../../../ProfilePicture';
import StaticDevContent from '../../../StaticDevContent';
import SkillCodeList from '../../../SkillCodeList';

const UserProfileGeneralInformation = ({ userProfile, useGroup }) => (
  <div className="current-user-top current-user-section-container">
    <div className="section-padded-inner-container">
      <ProfilePicture />
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
);

UserProfileGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  useGroup: PropTypes.bool,
};

UserProfileGeneralInformation.defaultProps = {
  useGroup: false,
};

export default UserProfileGeneralInformation;
