import React from 'react';
import PropTypes from 'prop-types';
import StatusCircle from '../../../StatusCircle';

const Status = ({ hideText }) => (
  <div className="status-container">
    <StatusCircle /> {!hideText ? 'Status: On-Post' : ''}
  </div>
);

Status.propTypes = {
  hideText: PropTypes.bool,
};

Status.defaultProps = {
  hideText: false,
};

export default Status;
