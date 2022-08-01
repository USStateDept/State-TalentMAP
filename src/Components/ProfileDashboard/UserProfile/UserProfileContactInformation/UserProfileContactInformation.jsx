import { get } from 'lodash';
import { USER_PROFILE } from 'Constants/PropTypes';
import { NO_EMAIL, NO_OFFICE_ADDRESS, NO_OFFICE_PHONE } from 'Constants/SystemMessages';
import SectionTitle from '../../SectionTitle';
import InformationDataPoint from '../../InformationDataPoint';

const UserProfileContactInformation = ({ userProfile }) => (
  <div className="current-user-section-container">
    <div className="section-padded-inner-container">
      <SectionTitle small title="Contact Information" icon="list-alt" />
      <InformationDataPoint title="Email address" content={get(userProfile, 'user_info.email') ? <a href={`mailto:${get(userProfile, 'user_info.email')}`} rel="nofollow">{get(userProfile, 'user_info.email')}</a> : NO_EMAIL} />
      <InformationDataPoint title="Office number" content={get(userProfile, 'user_info.office_phone') ? <a href={`tel:${get(userProfile, 'user_info.office_phone')}`} rel="nofollow">{get(userProfile, 'user_info.office_phone')}</a> : NO_OFFICE_PHONE} />
      <InformationDataPoint
        title="Post/Office address"
        content={get(userProfile, 'user_info.office_address') || NO_OFFICE_ADDRESS}
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
