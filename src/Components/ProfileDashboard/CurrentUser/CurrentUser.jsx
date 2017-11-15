import React from 'react';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import { NO_EMAIL, NO_USER_SKILL_CODE } from '../../../Constants/SystemMessages';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';
import Status from './Status';
import EditProfile from './EditProfile';
import ProfilePicture from '../../ProfilePicture';
import StaticDevContent from '../../StaticDevContent/StaticDevContent';

const CurrentUser = ({ userProfile }) => (
  <div className="usa-grid-full current-user">
    <div className="current-user-top">
      <div className="section-padded-inner-container">
        <StaticDevContent>
          <Status />
        </StaticDevContent>
        <ProfilePicture />
        <StaticDevContent>
          <EditProfile />
        </StaticDevContent>
        <SectionTitle small title={`${userProfile.user.first_name} ${userProfile.user.last_name}`} className="current-user-name" />
        <InformationDataPoint
          content={userProfile.skill_code || NO_USER_SKILL_CODE}
        />
      </div>
    </div>
    <div className="current-user-bottom">
      <div className="section-padded-inner-container">
        <SectionTitle small title="Contact Information" />
        <InformationDataPoint title="Email Address" content={userProfile.user.email || NO_EMAIL} />
        <StaticDevContent>
          <InformationDataPoint title="Office Number" content="+301-779-0379 ext. 3" />
        </StaticDevContent>
        <StaticDevContent>
          <InformationDataPoint title="Personal Contact Number" content="+240-331-7189" />
        </StaticDevContent>
        <StaticDevContent>
          <InformationDataPoint
            title="Post/Office Address"
            content="1234 Washington St. NW, Washington, DC 20009"
          />
        </StaticDevContent>
      </div>
    </div>
  </div>
);

CurrentUser.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

export default CurrentUser;
