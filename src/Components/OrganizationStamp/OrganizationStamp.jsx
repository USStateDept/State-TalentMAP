import React from 'react';
import PropTypes from 'prop-types';
import MailToButton from '../MailToButton';

const OrganizationStamp = ({ name, abbreviation, showMail }) => (
  <div className="usa-grid-full organization-stamp">
    <div className="usa-grid-full organization-stamp-container section-padded-inner-container">
      <div className="usa-width-one-sixth abbreviation-stamp-container">
        <div className="abbreviation-stamp">
          {abbreviation}
        </div>
      </div>
      <div className="usa-width-five-sixths organization-name-container">
        <div className="organization-stamp-name">
          <span className="organization-stamp-name-text">{name}</span>
          {showMail ? <MailToButton /> : null}
        </div>
      </div>
    </div>
  </div>
);

OrganizationStamp.propTypes = {
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired,
  showMail: PropTypes.bool,
};

OrganizationStamp.defaultProps = {
  showMail: false,
};

export default OrganizationStamp;
