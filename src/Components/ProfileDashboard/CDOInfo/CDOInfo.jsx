import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../../ProfilePicture';
import Status from '../UserProfile/Status';

const CDOInfo = ({ name }) => (
  <div className="usa-grid-full cdo-container">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-sixth">
        <ProfilePicture />
      </div>
      <div className="usa-width-five-sixths">
        <div className="cdo-header">Career Development Officer</div>
        <div className="cdo-name">
          <span className="cdo-name-text">{name}</span>
          <Status hideText />
        </div>
      </div>
    </div>
  </div>
);

CDOInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CDOInfo;
