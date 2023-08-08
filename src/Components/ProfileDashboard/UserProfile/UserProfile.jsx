import PropTypes from 'prop-types';
import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';
import ExternalUserStatus from '../ExternalUserStatus';

const UserProfile = ({ userProfile, isPublic, showEmployeeProfileLinks }) => {
  const cdo = get(userProfile, 'cdo', {});
  return (
    <div className="usa-grid-full current-user">
      <UserProfileGeneralInformation
        userProfile={userProfile}
        isPublic={isPublic}
        colorProp="firstName"
        showEmployeeProfileLinks={showEmployeeProfileLinks}
      />
      <div className="current-user-bottom">
        {
          cdo?.name &&
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
        <UserProfileContactInformation userProfile={userProfile} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEmployeeProfileLinks: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
};

UserProfile.defaultProps = {
  isPublic: false,
};

export default UserProfile;
