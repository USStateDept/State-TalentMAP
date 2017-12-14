import React from 'react';
import PropTypes from 'prop-types';

const OrganizationStamp = ({ name, abbreviation }) => (
  <div className="usa-grid-full organization-stamp">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-sixth abbreviation-stamp-container">
        <div className="abbreviation-stamp">
          {abbreviation}
        </div>
      </div>
      <div className="usa-width-five-sixths organization-name-container">
        <div className="organization-stamp-name">
          {name}
        </div>
      </div>
    </div>
  </div>
);

OrganizationStamp.propTypes = {
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired,
};

export default OrganizationStamp;
