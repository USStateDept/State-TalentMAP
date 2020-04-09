import React from 'react';
import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import { NO_EMAIL } from 'Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import StaticDevContent from '../../../StaticDevContent';

const UserProfileContactInformation = ({ userProfile }) => (
  <div className="current-user-section-container">
    <div className="section-padded-inner-container">
      <SectionTitle small title="Contact Information" icon="list-alt" />
      <InformationDataPoint title="Email address" content={get(userProfile, 'user.email') || NO_EMAIL} />
      <StaticDevContent>
        <InformationDataPoint title="Office number" content="+301-779-0379 ext. 3" />
      </StaticDevContent>
      <StaticDevContent>
        <InformationDataPoint title="Personal contact number" content="+240-331-7189" />
      </StaticDevContent>
      <StaticDevContent>
        <InformationDataPoint
          title="Post/Office address"
          content="1234 Washington St. NW, Washington, DC 20009"
        />
      </StaticDevContent>
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
