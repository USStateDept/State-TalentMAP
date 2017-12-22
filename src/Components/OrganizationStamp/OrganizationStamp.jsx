import React from 'react';
import PropTypes from 'prop-types';
import MailToButton from '../MailToButton';

const OrganizationStamp = ({ name, abbreviation, showMail }) => (
  <div className="usa-grid-full organization-stamp">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-sixth abbreviation-stamp-container">
        <div className="abbreviation-stamp">
          {abbreviation}
        </div>
      </div>
      <div className={`${showMail ? 'usa-width-one-half' : 'usa-width-two-thirds'} organization-name-container`}>
        <div className="organization-stamp-name">
          {name}
        </div>
      </div>
      {
        showMail ?
          <div className="usa-width-one-third">
            <div className="cdo-mail-container">
              <MailToButton />
            </div>
          </div>
          : null
      }
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
