import React from 'react';
import { USER_PROFILE } from '../../../../Constants/PropTypes';
import { NO_EMAIL } from '../../../../Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';

const CurrentUserContactInformation = ({ userProfile }) => (
  <div className="current-user-bottom current-user-section-container">
    <div className="section-padded-inner-container">
      <SectionTitle small title="Contact Information" />
      <InformationDataPoint title="Email Address" content={userProfile.user.email || NO_EMAIL} />
      <InformationDataPoint title="Office Number" content="+301-779-0379 ext. 3" />
      <InformationDataPoint title="Personal Contact Number" content="+240-331-7189" />
      <InformationDataPoint
        title="Post/Office Address"
        content="1234 Washington St. NW, Washington, DC 20009"
      />
    </div>
  </div>
);

CurrentUserContactInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

CurrentUserContactInformation.defaultProps = {
  showEditLink: true,
};

export default CurrentUserContactInformation;
