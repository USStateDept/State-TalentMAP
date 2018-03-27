import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { ifEnter } from '../../utilities';

// TODO - apply this component to other elements that rely on "eslint-disable" to avoid
// CodeClimate errors.
const InteractiveElement = ({ children, type, className, ...rest }) => {
  let Node = type;
  const onClick = rest.onClick;
  // default props that we pass to div or span
  const defaultProps = {
    tabIndex: '0',
  };
  // Props passed down. If onClick exists, we allow it to be called via "enter" keydown as well.
  // Anything here can override defaultProps.
  const props = {
    children,
    onKeyDown: onClick ? (e) => { if (ifEnter(e)) { onClick(); } } : EMPTY_FUNCTION,
    className: (`interactive-element ${className}`).trim(),
    ...rest,
  };

  switch (type) {
    case 'submit':
      Node = 'button';
      props.type = 'submit';
      break;

    case 'button':
      break;

    default:
      // Set where type != (button|input)
      defaultProps.role = 'button';
  }

  return (
    // At the time of writing, CodeClimate's version of eslint-a11y-plugin
    // did not take role="button" into account with the following error:
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Node {...defaultProps}{...props}>
      {children}
    </Node>
    // eslint-enable-next-line jsx-a11y/no-static-element-interactions
  );
};

InteractiveElement.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

InteractiveElement.defaultProps = {
  className: '',
  type: 'div',
};

export default InteractiveElement;
