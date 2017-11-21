import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE } from '../../../Constants/PropTypes';
import CurrentUserGeneralInformation from './CurrentUserGeneralInformation';
import CurrentUserContactInformation from './CurrentUserContactInformation';

const CurrentUser = ({ userProfile, showEditLink, showGeneralInformation,
showContactInformation, useGroup }) => (
  <div className="usa-grid-full current-user">
    {
      showGeneralInformation &&
      <CurrentUserGeneralInformation
        userProfile={userProfile}
        showEditLink={showEditLink}
        useGroup={useGroup}
      />
    }
    {
      showContactInformation &&
      <CurrentUserContactInformation userProfile={userProfile} />
    }
  </div>
);

CurrentUser.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  showGeneralInformation: PropTypes.bool,
  showContactInformation: PropTypes.bool,
  useGroup: PropTypes.bool,
};

CurrentUser.defaultProps = {
  showEditLink: true,
  showGeneralInformation: true,
  showContactInformation: true,
  useGroup: false,
};

export default CurrentUser;
