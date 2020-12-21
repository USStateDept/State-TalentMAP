import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const ExportButton = ({ onClick, text, className, isLoading, primaryClass, ...rest }) => (
  <button className={`${primaryClass} ${className}`} onClick={onClick} {...rest}>
    {isLoading && <span className="ds-c-spinner spinner-blue" />}<span>{text}</span>
  </button>
);

ExportButton.propTypes = {
  primaryClass: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

ExportButton.defaultProps = {
  primaryClass: 'usa-button-secondary',
  onClick: EMPTY_FUNCTION,
  text: 'Export',
  className: '',
  isLoading: false,
};

export default ExportButton;
