import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import InteractiveElement from '../InteractiveElement';

const propTypes = {
  initials: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  initials: '',
  firstName: '',
  lastName: '',
  className: '',
  onClick: EMPTY_FUNCTION,
};

const Avatar = ({ initials, firstName, lastName, className, onClick }) => (
  <InteractiveElement className={className} onClick={onClick} role="img" aria-label={`${firstName} ${lastName}`}>
    <div className="tm-avatar">{initials}</div>
  </InteractiveElement>
);

Avatar.propTypes = propTypes;

Avatar.defaultProps = defaultProps;

export default Avatar;
