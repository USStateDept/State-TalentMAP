import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const ExportButton = ({ onClick, text, className, isLoading }) => (
  <button className={`usa-button-secondary ${className}`} onClick={onClick}>
    {isLoading && <span className="ds-c-spinner spinner-blue" />}<span>{text}</span>
  </button>
);

ExportButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

ExportButton.defaultProps = {
  onClick: EMPTY_FUNCTION,
  text: 'Export',
  className: '',
  isLoading: false,
};

export default ExportButton;
