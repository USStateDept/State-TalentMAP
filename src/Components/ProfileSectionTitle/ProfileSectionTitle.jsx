import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const ProfileSectionTitle = ({ title, icon, className }) => (
  <h2 className={`usa-grid-full hello-greeting ${className}`}>
    {icon && <FontAwesome size="lg" name={icon} />}
    {title}
  </h2>
);

ProfileSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
};

ProfileSectionTitle.defaultProps = {
  icon: '',
  className: '',
};

export default ProfileSectionTitle;
