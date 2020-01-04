import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import EditProfile from '../EditProfile';
import Avatar from '../../../Avatar';
import StaticDevContent from '../../../StaticDevContent';
import SkillCodeList from '../../../SkillCodeList';

const UserProfileGeneralInformation = ({ userProfile, showEditLink, useGroup }) => {
  const avatar = {
    firstName: get(userProfile, 'user.first_name'),
    lastName: get(userProfile, 'user.last_name'),
    initials: userProfile.initials,
    displayName: userProfile.display_name,
    externalSource: get(userProfile, 'avatar'),
    externalSourceToUse: 'm',
  };
  return (
    <div className="current-user-top current-user-section-border current-user-section-container">
      <div className="section-padded-inner-container">
        <div className="avatar-group">
          <Avatar
            className="dashboard-user-profile-picture"
            {...avatar}
          />
        </div>
        { showEditLink && <StaticDevContent><EditProfile /></StaticDevContent> }
        <div className="name-group">
          <SectionTitle small title={`${userProfile.user.last_name ? `${userProfile.user.last_name}, ` : ''}${userProfile.user.first_name}`} className="current-user-name" />
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
};

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
