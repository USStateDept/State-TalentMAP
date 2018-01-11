import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import LinkButton from '../../LinkButton';

const ContactCDOButton = ({ email }) => (
  <LinkButton
    className="bid-tracker-cdo-button"
    toLink={`mailto:${email}`}
    isExternal
  >
    <FontAwesome name="envelope-o" />
    Contact CDO
  </LinkButton>
);

ContactCDOButton.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ContactCDOButton;
