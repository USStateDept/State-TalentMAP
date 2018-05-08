import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const propTypes = {
  initials: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  initials: '',
  firstName: '',
  lastName: '',
  className: '',
  small: false,
  onClick: EMPTY_FUNCTION,
};

const Avatar = ({ initials, firstName, lastName, className, small, onClick }) => (
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  <div className={`tm-avatar ${small ? 'tm-avatar--small' : ''} ${className}`} onClick={onClick} role="img" aria-label={`${firstName} ${lastName}`}>
    {initials}
  </div>
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-enable jsx-a11y/no-static-element-interactions */
);


Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
