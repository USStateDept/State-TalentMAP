import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import shortid from 'shortid';
import swal from '@sweetalert/with-react';

import { NO_GRADE } from 'Constants/SystemMessages';
import { EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { toastError, toastInfo, toastSuccess } from 'actions/toast';
import { downloadPdfStream, fetchJWT, getBrowser, isOnProxy } from 'utilities';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';
import EditProfile from '../EditProfile';
import Avatar from '../../../Avatar';
import StaticDevContent from '../../../StaticDevContent';
import SkillCodeList from '../../../SkillCodeList';
import EmployeeProfileModal from './EmployeeProfileModal';

class UserProfileGeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.getEmployeeProfile = this.getEmployeeProfile.bind(this);
    this.state = {
      isLoading: false,
      hasErrored: false,
      data: null,
    };
  }
  getEmployeeProfile = () => {
    const id = shortid.generate();
    const { onToastError, onToastInfo, onToastSuccess, userProfile } = this.props;
    let url$ = get(userProfile, 'employee_profile_url.internal');
    if (isOnProxy()) {
      url$ = get(userProfile, 'employee_profile_url.external');
    }
    onToastInfo(id);
    axios.get(url$, {
      withCredentials: true,
      headers: { JWTAuthorization: fetchJWT() },
      responseType: 'arraybuffer' },
    )
      .then(response => {
        downloadPdfStream(response.data);
        onToastSuccess(id);
      })
      .catch(() => {
        onToastError(id);
      });
  }
  render() {
    const { userProfile, showEditLink, useGroup,
      colorProp, useColor, isPublic } = this.props;
    const avatar = {
      firstName: get(userProfile, 'user.first_name'),
      lastName: get(userProfile, 'user.last_name'),
      initials: userProfile.initials,
      displayName: userProfile.display_name,
      externalSource: get(userProfile, 'avatar'),
      externalSourceToUse: 'm',
    };
    avatar.colorString = useColor ? avatar[colorProp] : undefined;
    const userGrade = get(userProfile, 'employee_info.grade') || NO_GRADE;
    const userSkills = get(userProfile, 'employee_info.skills');
    const userID = get(userProfile, 'employee_id');

    let url$ = get(userProfile, 'employee_profile_url.internal');
    if (isOnProxy()) {
      url$ = get(userProfile, 'employee_profile_url.external');
    }

    const openPdf = () => {
      const browser = getBrowser();
      if (browser.name === 'Internet Explorer' && browser.version.startsWith('11')) {
        this.getEmployeeProfile();
      } else {
        return swal({
          title: 'Employee Profile Report:',
          button: false,
          className: 'modal-1300',
          content: (
            <EmployeeProfileModal
              url={url$}
            />
          ),
        });
      }
      return null;
    };

    return (
      <div className="current-user-top current-user-section-border current-user-section-container">
        <div className="section-padded-inner-container">
          <div className="avatar-group">
            <Avatar
              className="dashboard-user-profile-picture"
              {...avatar}
            />
          </div>
          { showEditLink && <StaticDevContent><EditProfile /></StaticDevContent> }
          <div className="name-group">
            <SectionTitle small title={`${userProfile.user.last_name ? `${userProfile.user.last_name}, ` : ''}${userProfile.user.first_name}`} className="current-user-name" />
            {
              get(userProfile, 'employee_profile_url') &&
                <InformationDataPoint
                  content={
                    <InteractiveElement
                      onClick={openPdf}
                      type="a"
                      title="Download Employee Profile PDF"
                    >
                      Employee Profile
                    </InteractiveElement>
                  }
                />
            }
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
            {
              !useGroup &&
                <InformationDataPoint
                  content={<SkillCodeList skillCodes={userSkills} />}
                  className="skill-code-data-point-container skill-code-data-point-container-skill"
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

UserProfileGeneralInformation.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  showEditLink: PropTypes.bool,
  useGroup: PropTypes.bool,
  useColor: PropTypes.bool,
  colorProp: PropTypes.string,
  onToastError: PropTypes.func,
  onToastInfo: PropTypes.func,
  onToastSuccess: PropTypes.func,
  isPublic: PropTypes.bool,
};

UserProfileGeneralInformation.defaultProps = {
  showEditLink: true,
  useGroup: false,
  useColor: false,
  colorProp: 'displayName',
  onToastError: EMPTY_FUNCTION,
  onToastInfo: EMPTY_FUNCTION,
  onToastSuccess: EMPTY_FUNCTION,
  isPublic: false,
};

export const mapDispatchToProps = dispatch => ({
  onToastError: (id) => dispatch(toastError('We were unable to process your Employee Profile download. Please try again later.', 'An error has occurred', id, true)),
  onToastInfo: (id) => dispatch(toastInfo('Please wait while we process your request.', 'Loading...', id)),
  onToastSuccess: (id) => dispatch(toastSuccess('Employee profile succesfully downloaded.', 'Success', id, true)),
});

export default connect(null, mapDispatchToProps)(UserProfileGeneralInformation);
