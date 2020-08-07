import React from 'react';
import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import { NO_EMAIL, NO_OFFICE_PHONE, NO_OFFICE_ADDRESS } from 'Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import StaticDevContent from '../../../StaticDevContent';

const UserProfileContactInformation = ({ userProfile }) => (
  <div className="current-user-section-container">
    <div className="section-padded-inner-container">
      <SectionTitle small title="Contact Information" icon="list-alt" />
      <InformationDataPoint title="Email address" content={get(userProfile, 'user.email') || NO_EMAIL} />
      <InformationDataPoint title="Office number" content={get(userProfile, 'user.office_phone') || NO_OFFICE_PHONE} />
      <StaticDevContent>
        <InformationDataPoint title="Personal contact number" content="+240-331-7189" />
      </StaticDevContent>
      <InformationDataPoint
        title="Post/Office address"
        content={get(userProfile, 'user.office_address') || NO_OFFICE_ADDRESS}
      />
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
