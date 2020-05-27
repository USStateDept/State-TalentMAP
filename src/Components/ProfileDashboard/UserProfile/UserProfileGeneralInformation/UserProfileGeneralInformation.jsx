import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { NO_GRADE } from 'Constants/SystemMessages';
import { USER_PROFILE } from 'Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import EditProfile from '../EditProfile';
import Avatar from '../../../Avatar';
import StaticDevContent from '../../../StaticDevContent';
import SkillCodeList from '../../../SkillCodeList';

const UserProfileGeneralInformation = ({ userProfile, showEditLink, useGroup,
  colorProp, useColor }) => {
  const avatar = {
    firstName: get(userProfile, 'user.first_name'),
    lastName: get(userProfile, 'user.last_name'),
    initials: userProfile.initials,
    displayName: userProfile.display_name,
    externalSource: get(userProfile, 'avatar'),
    externalSourceToUse: 'm',
  };
  avatar.colorString = useColor ? avatar[colorProp] : undefined;
  const userGrade = get(userProfile, 'employee_info.grade') || NO_GRADE;
  const userSkills = get(userProfile, 'employee_info.skills');
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
            get(userProfile, 'employee_profile_url') &&
              <InformationDataPoint
                content={<a href={userProfile.employee_profile_url}>Employee Profile</a>}
              />
          }
          <InformationDataPoint
            content={`Grade: ${userGrade}`}
            className="skill-code-data-point-container skill-code-data-point-container-gen-spec"
          />
          {
            !useGroup &&
              <InformationDataPoint
                content={<SkillCodeList skillCodes={userSkills} />}
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
  useColor: PropTypes.bool,
  colorProp: PropTypes.string,
};

UserProfileGeneralInformation.defaultProps = {
  showEditLink: true,
  useGroup: false,
  useColor: false,
  colorProp: 'displayName',
};

export default UserProfileGeneralInformation;
