import React from 'react';
import PropTypes from 'prop-types';

const PositionAdditionalDetails = ({ content }) => (
  <div className="usa-grid position-details-additional">
    <div className="usa-width-one-whole">
      <p className="position-details-additional-body">
        <span className="title">About</span>
        <br />
        { content }
      </p>
    </div>
  </div>
);

PositionAdditionalDetails.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PositionAdditionalDetails;
