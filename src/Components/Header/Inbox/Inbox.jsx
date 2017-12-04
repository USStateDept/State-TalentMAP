import React from 'react';
import PropTypes from 'prop-types';
import IconAlert from '../../IconAlert';

const Inbox = ({ number }) => (
  <IconAlert
    alt="Inbox"
    type="comments-o"
    number={number}
    link="/profile/dashboard/"
    disabled
  />
);

Inbox.propTypes = {
  number: PropTypes.number,
};

Inbox.defaultProps = {
  number: 0,
};

export default Inbox;
