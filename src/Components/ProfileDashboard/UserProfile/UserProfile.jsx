import PropTypes from 'prop-types';
import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';
import UserProfileContactInformation from './UserProfileContactInformation';
import ExternalUserStatus from '../ExternalUserStatus';
import PositionInformation from '../PositionInformation';

const UserProfile = ({ userProfile, isPublic }) => {
  const cdo = get(userProfile, 'cdo', {});
  return (
    <div className="usa-grid-full current-user">
      <UserProfileGeneralInformation
        userProfile={userProfile}
        isPublic={isPublic}
        colorProp="firstName"
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
        {
          <div className="current-user-section-border">
            <PositionInformation assignment={get(userProfile, 'current_assignment')} />
          </div>
        }
        <UserProfileContactInformation userProfile={userProfile} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  isPublic: PropTypes.bool,
};

UserProfile.defaultProps = {
  isPublic: false,
};

export default UserProfile;
