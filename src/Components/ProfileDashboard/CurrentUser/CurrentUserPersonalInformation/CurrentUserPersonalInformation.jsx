import React from 'react';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import { NO_USER_SKILL_CODE, NO_BIRTHDAY } from '../../../../Constants/SystemMessages';
import InformationDataPoint from '../../InformationDataPoint';

const CurrentUserPersonalInformation = ({ userProfile }) => (
  <div className="usa-grid-full current-user-section-container current-user-personal-information">
    <div className="section-padded-inner-container">
      <InformationDataPoint
        title="Skill Code"
        content={userProfile.skill_code || NO_USER_SKILL_CODE}
        className="skill-code-data-point-container skill-code-data-point-container-one"
      />
      <InformationDataPoint
        title="Birthdate"
        content={userProfile.date_of_birth || NO_BIRTHDAY}
        className="skill-code-data-point-container skill-code-data-point-container-two"
      />
    </div>
  </div>
);

CurrentUserPersonalInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

export default CurrentUserPersonalInformation;
