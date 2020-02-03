import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { USER_PROFILE, ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';
import ExternalUserStatus from '../ExternalUserStatus';
import PositionInformation from '../PositionInformation';

const UserProfile = ({ userProfile, showEditLink, showGeneralInformation,
showContactInformation, useGroup, assignment }) => {
  const cdo = get(userProfile, 'cdo', {});
  return (
    <div className="usa-grid-full current-user">
      {
        showGeneralInformation &&
        <UserProfileGeneralInformation
          userProfile={userProfile}
          showEditLink={showEditLink}
          useGroup={useGroup}
        />
      }
      {
        showContactInformation &&
        <div className="current-user-bottom">
          {
            cdo.name &&
            <div className="current-user-section-border cdo-section">
              <ExternalUserStatus
                type="cdo"
                initials={cdo.initials}
                firstName={cdo.name}
                email={cdo.email}
                showMail
                small
              />
            </div>
          }
          <div className="current-user-section-border">
            <PositionInformation assignment={assignment} />
          </div>
          <UserProfileContactInformation userProfile={userProfile} />
        </div>
      }
    </div>
  );
};

UserProfile.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  showGeneralInformation: PropTypes.bool,
  showContactInformation: PropTypes.bool,
  useGroup: PropTypes.bool,
  assignment: ASSIGNMENT_OBJECT.isRequired,
};

UserProfile.defaultProps = {
  showEditLink: true,
  showGeneralInformation: true,
  showContactInformation: true,
  useGroup: false,
};

export default UserProfile;
