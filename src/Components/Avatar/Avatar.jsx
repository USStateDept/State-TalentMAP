import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import ImageFallback from 'react-image-fallback';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const propTypes = {
  initials: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  fallback: PropTypes.node,
  externalSource: PropTypes.shape({
    s: PropTypes.string,
    m: PropTypes.string,
    l: PropTypes.string,
    compare: PropTypes.arrayOf(PropTypes.string),
  }),
  externalSourceToUse: PropTypes.oneOf(['s', 'm', 'l', null]),
};

const defaultProps = {
  initials: '',
  firstName: '',
  lastName: '',
  className: '',
  small: false,
  onClick: EMPTY_FUNCTION,
  fallback: <FA name="user-o" />,
  useExternalImg: false,
  externalSource: {},
  externalSourceToUse: null,
};

const Avatar = ({ initials, firstName, lastName, className, small, onClick, fallback,
  externalSource, externalSourceToUse }) => {
  const avatar = <span>{initials || fallback}</span>;
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const style = {
    borderRadius: 50,
  };
  if (small) { style.borderRadius = 30; }
  return (
    <div className={`tm-avatar ${small ? 'tm-avatar--small' : ''} ${className}`} onClick={onClick} role="img" aria-label={`${firstName} ${lastName}`}>
      {
        get(externalSource, externalSourceToUse) ?
          <ImageFallback
            src={externalSource[externalSourceToUse]}
            fallbackImage={avatar}
            initialImage={avatar}
            alt="avatar"
            style={style}
          />
          :
          avatar
      }
    </div>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
