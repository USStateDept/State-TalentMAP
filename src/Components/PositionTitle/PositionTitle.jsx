import React from 'react';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const PositionTitle = ({ details }) => (
  <div className="position-details-header" style={{ overflow: 'hidden', backgroundColor: '#F2F2F2' }}>
    <div className="usa-grid" style={{ overflow: 'hidden' }}>
      <div className="usa-width-one-half">
        <div className="position-details-header-back">
          Back to Search Results
        </div>
        <div className="position-details-header-title">
          <strong>Position Number: {details.position_number}</strong>
        </div>
        <p className="position-details-header-body">
          <strong>Description: </strong>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text
            ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make...
        </p>
        <div className="usa-width-one-half position-details-header-body">
          <strong>Post website:</strong> www.post.gov
        </div>
        <div className="usa-width-one-half position-details-header-body">
          <strong>Point of Contact:</strong> 222-222-2222
        </div>
      </div>
    </div>
    <img
      className="position-details-header-image"
      alt="department of state seal"
      src="/assets/img/dos-seal-bw.png"
    />
  </div>
);

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
};

PositionTitle.defaultProps = {
  details: null,
};

export default PositionTitle;
