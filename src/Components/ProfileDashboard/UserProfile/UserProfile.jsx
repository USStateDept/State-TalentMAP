import React from 'react';
import PropTypes from 'prop-types';
import { Flag } from 'flag';
import { USER_PROFILE, ASSIGNMENT_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';
import ExternalUserStatus from '../ExternalUserStatus';
import StaticDevContent from '../../StaticDevContent';
import PositionInformation from '../PositionInformation';

const UserProfile = ({ userProfile, showEditLink, showGeneralInformation,
showContactInformation, useGroup, assignment }) => (
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
        <Flag
          name="flags.static_content"
          render={() => (
            <div className="current-user-section-border cdo-section">
              <StaticDevContent>
                <ExternalUserStatus type="cdo" initials="LS" firstName="Leah" lastName="Shadtrach" small />
              </StaticDevContent>
            </div>
          )}
        />
        <div className="current-user-section-border">
          <PositionInformation assignment={assignment} />
        </div>
        <UserProfileContactInformation userProfile={userProfile} />
      </div>
    }
  </div>
);

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
