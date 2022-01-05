import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { isNumber } from 'lodash';

const PositionInformation = ({ title, icon, small, className, len }) => (
  <div className={`dashboard-section-title ${className} ${small ? 'dashboard-section-title-small' : ''}`}>
    { !!icon.length && <FontAwesome name={icon} /> } <h2>{title}{isNumber(len) && ` (${len})`}</h2>
  </div>
);

PositionInformation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
  len: PropTypes.number,
};

PositionInformation.defaultProps = {
  icon: '',
  small: false, // add class "dashboard-section-title-small"
  className: '',
  len: undefined,
};

export default PositionInformation;
