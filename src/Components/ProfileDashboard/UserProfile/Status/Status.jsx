import React from 'react';
import PropTypes from 'prop-types';
import StatusCircle from '../../../StatusCircle';
import StaticDevContent from '../../../StaticDevContent';

const Status = ({ hideText }) => (
  <div className="status-container">
    <StaticDevContent>
      <StatusCircle /> {!hideText ? 'Status: On-Post' : ''}
    </StaticDevContent>
  </div>
);

Status.propTypes = {
  hideText: PropTypes.bool,
};

Status.defaultProps = {
  hideText: false,
};

export default Status;
