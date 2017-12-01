import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import { NO_USER_SKILL_CODE } from '../../../../Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import Status from '../Status';
import EditProfile from '../EditProfile';
import ProfilePicture from '../../../ProfilePicture';

const CurrentUserGeneralInformation = ({ userProfile, showEditLink, useGroup }) => (
  <div className="current-user-top current-user-section-container">
    <div className="section-padded-inner-container">
      <Status />
      <ProfilePicture />
      { showEditLink && <EditProfile /> }
      <SectionTitle small title={`${userProfile.user.last_name}, ${userProfile.user.first_name}`} className="current-user-name" />
      {
        useGroup ?
          <InformationDataPoint
            content="Generalist • F2"
            className="skill-code-data-point-container skill-code-data-point-container-gen-spec"
          />
          :
          <InformationDataPoint
            content={userProfile.skill_code || NO_USER_SKILL_CODE}
            className="skill-code-data-point-container skill-code-data-point-container-skill"
          />
      }
    </div>
  </div>
);

CurrentUserGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  useGroup: PropTypes.bool,
};

CurrentUserGeneralInformation.defaultProps = {
  showEditLink: true,
  useGroup: false,
};

export default CurrentUserGeneralInformation;
