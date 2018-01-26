import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { ifEnter } from '../../utilities';

// TODO - apply this component to other elements that rely on "eslint-disable" to avoid
// CodeClimate errors.
const InteractiveElement = ({ children, type, ...rest }) => {
  const onClick = rest.onClick;
  // default props that we pass to div or span
  const defaultProps = {
    role: 'button',
    tabIndex: '0',
  };
  // Props passed down. If onClick exists, we allow it to be called via "enter" keydown as well.
  // Anything here can override defaultProps.
  const props = {
    children,
    type,
    onKeyDown: onClick ? (e) => { if (ifEnter(e)) { onClick(); } } : EMPTY_FUNCTION,
    ...rest,
  };

  const CLASS_NAME = 'interactive-element';
  return (
  // At the time of writing, CodeClimate's version of eslint-a11y-plugin
  // did not take role="button" into account with the following error:
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  type === 'div' ?
    <div
      className={CLASS_NAME}
      {...defaultProps}
      {...props}
    >
      {children}
    </div> :
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className={CLASS_NAME}
      {...defaultProps}
      {...props}
    >
      {children}
    </span>
  );
};

InteractiveElement.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['div', 'span']),
};

InteractiveElement.defaultProps = {
  type: 'div',
};

export default InteractiveElement;
