import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const IconAlert = ({ type, number, link, limit, useLimit, alt, title, disabled, className }) => {
  let numberText = number; // the text we'll display
  if (useLimit && limit <= number) {
    numberText = `${limit}+`;
  }
  const shouldShowNumber = number > 0;

  const content = (
    <div>
      <div className="alert-icon" />
      <span className="usa-sr-only">{alt}</span>
      <FontAwesome name={type} />
      {
        shouldShowNumber ?
          <span className="alert-icon-badge">
            {numberText}
          </span>
          :
          null
      }
    </div>
  );
  return (
    <div className={`icon-alert-container ${disabled ? 'icon-alert-disabled' : ''} ${className}`}>
      {
        link ?
          <Link to={link} role="button" title={title}>
            {content}
          </Link>
          : content
      }
    </div>
  );
};

IconAlert.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number,
  link: PropTypes.string,
  limit: PropTypes.number,
  useLimit: PropTypes.bool,
  alt: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

IconAlert.defaultProps = {
  number: 0,
  link: '',
  limit: 5,
  useLimit: true,
  alt: '',
  disabled: false,
  className: '',
};

export default IconAlert;
