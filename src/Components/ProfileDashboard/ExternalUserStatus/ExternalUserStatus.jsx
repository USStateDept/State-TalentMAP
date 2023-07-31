import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import USER_TYPES from '../../../Constants/UserTypes';
import MailToButton from '../../MailToButton';

const ExternalUserStatus = ({ firstName, lastName, type, showMail, email }) => (
  <div className="usa-grid-full cdo-container">
    <div className="usa-grid-full cdo-container-inner section-padded-inner-container">
      <div className="profile-picture-container">
        <FA name="street-view" className="fa-2x" />
      </div>
      <div className="cdo-text-container">
        <div className="usa-grid-full">
          <div className="usa-width-one-whole cdo-header">
            {USER_TYPES[type]}
          </div>
          <div className="usa-width-one-whole cdo-name">
            <span className="cdo-name-text">{`${firstName} ${lastName}`}</span>
            { showMail ? <MailToButton email={email} /> : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ExternalUserStatus.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  type: PropTypes.oneOf(['cdo', 'ao', 'hr']).isRequired,
  showMail: PropTypes.bool,
  email: PropTypes.string,
};

ExternalUserStatus.defaultProps = {
  firstName: '',
  lastName: '',
  showMail: false,
  email: '',
};

export default ExternalUserStatus;
