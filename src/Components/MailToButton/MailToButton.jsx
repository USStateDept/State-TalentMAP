import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const MailToButton = ({ email, textBefore, textAfter }) => (
  <span className="mail-to-button">
    <a href={`mailto:${email}`}>
      {textBefore} <FontAwesome name="envelope-o" /> {textAfter}
    </a>
  </span>
);

// This is unrequired because we don't have emails for orgs/bureaus yet
MailToButton.propTypes = {
  email: PropTypes.string,
  textBefore: PropTypes.string,
  textAfter: PropTypes.string,
};

MailToButton.defaultProps = {
  email: '',
  textBefore: '',
  textAfter: '',
};

export default MailToButton;
