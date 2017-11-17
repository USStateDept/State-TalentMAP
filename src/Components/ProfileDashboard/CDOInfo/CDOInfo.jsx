import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../../ProfilePicture';
import StatusCircle from '../../StatusCircle';

const CDOInfo = ({ name }) => (
  <div className="usa-grid-full cdo-container">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-sixth">
        <ProfilePicture />
      </div>
      <div className="usa-width-five-sixths">
        <div className="cdo-header">Career Development Officer</div>
        <div className="cdo-name">{name} <StatusCircle /></div>
      </div>
    </div>
  </div>
);

CDOInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CDOInfo;
