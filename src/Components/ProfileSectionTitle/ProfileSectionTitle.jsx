import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const ProfileSectionTitle = ({ title, icon }) => (
  <h2 className="usa-grid-full hello-greeting">
    { icon && <FontAwesome size="lg" name={icon} /> }
    {title}
  </h2>
);

ProfileSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

ProfileSectionTitle.defaultProps = {
  icon: '',
};

export default ProfileSectionTitle;
