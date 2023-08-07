import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { NO_GRADE } from 'Constants/SystemMessages';
import { USER_PROFILE } from 'Constants/PropTypes';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import Avatar from '../../../Avatar';
import SkillCodeList from '../../../SkillCodeList';
import EmployeeProfileLink from './EmployeeProfileLinkLoadable';

class UserProfileGeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hasErrored: false,
      data: null,
    };
  }

  render() {
    const { userProfile, colorProp, isPublic, showEmployeeProfileLinks } = this.props;
    const avatar = {
      firstName: get(userProfile, 'user.first_name'),
      lastName: get(userProfile, 'user.last_name'),
      initials: userProfile.initials,
      displayName: userProfile.display_name,
      externalSource: get(userProfile, 'avatar'),
      externalSourceToUse: 'm',
    };
    avatar.colorString = isPublic ? avatar[colorProp] : undefined;
    const userGrade = get(userProfile, 'employee_info.grade') || NO_GRADE;
    const userSkills = get(userProfile, 'employee_info.skills');
    const userID = get(userProfile, 'employee_id');

    return (
      <div className="current-user-top current-user-section-border current-user-section-container">
        <div className="section-padded-inner-container">
          <div className="avatar-group">
            <Avatar
              className="dashboard-user-profile-picture"
              {...avatar}
            />
          </div>
          <div className="name-group">
            <SectionTitle small title={`${userProfile.user.last_name ? `${userProfile.user.last_name}, ` : ''}${userProfile.user.first_name}`} className="current-user-name" />
            <EmployeeProfileLink
              userProfile={userProfile}
              showEmployeeProfileLinks={showEmployeeProfileLinks}
            />
            { isPublic &&
              <InformationDataPoint
                content={`Employee ID: ${userID}`}
                className="skill-code-data-point-container skill-code-data-point-container-gen-spec"
              />
            }
            <InformationDataPoint
              content={`Grade: ${userGrade}`}
              className="skill-code-data-point-container skill-code-data-point-container-gen-spec"
            />
            <InformationDataPoint
              content={<SkillCodeList skillCodes={userSkills} />}
              className="skill-code-data-point-container skill-code-data-point-container-skill"
            />
          </div>
        </div>
      </div>
    );
  }
}

UserProfileGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEmployeeProfileLinks: PropTypes.bool.isRequired,
  colorProp: PropTypes.string,
  isPublic: PropTypes.bool,
};

UserProfileGeneralInformation.defaultProps = {
  colorProp: 'displayName',
  isPublic: false,
};

export const mapDispatchToProps = () => ({
});

export default connect(null, mapDispatchToProps)(UserProfileGeneralInformation);
