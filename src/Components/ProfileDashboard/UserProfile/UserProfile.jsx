import PropTypes from 'prop-types';
import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';
import ExternalUserStatus from '../ExternalUserStatus';
import PositionInformation from '../PositionInformation';

const UserProfile = ({ userProfile, showGeneralInformation,
  showContactInformation, useGroup, isPublic }) => {
  const cdo = get(userProfile, 'cdo', {});
  return (
    <div className="usa-grid-full current-user">
      {
        showGeneralInformation &&
        <UserProfileGeneralInformation
          userProfile={userProfile}
          useGroup={useGroup}
          isPublic={isPublic}
          colorProp="firstName"
          useColor={isPublic}
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
          {
            <div className="current-user-section-border">
              <PositionInformation assignment={get(userProfile, 'current_assignment')} />
            </div>
          }
          <UserProfileContactInformation userProfile={userProfile} />
        </div>
      }
    </div>
  );
};

UserProfile.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showGeneralInformation: PropTypes.bool,
  showContactInformation: PropTypes.bool,
  useGroup: PropTypes.bool,
  isPublic: PropTypes.bool,
};

UserProfile.defaultProps = {
  showGeneralInformation: true,
  showContactInformation: true,
  useGroup: false,
  isPublic: false,
};

export default UserProfile;
