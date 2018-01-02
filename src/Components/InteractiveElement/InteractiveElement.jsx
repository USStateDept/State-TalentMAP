import React from 'react';
import PropTypes from 'prop-types';

// TODO - apply this component to other elements that rely on "eslint-disable" to avoid
// CodeClimate errors.
const InteractiveElement = ({ children, type, ...rest }) => (
  // At the time of writing, CodeClimate's version of eslint-a11y-plugin
  // did not take role="button" into account with the following error:
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  type === 'div' ?
    <div
      {...rest}
    >
      {children}
    </div> :
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      {...rest}
    >
      {children}
    </span>
);

InteractiveElement.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['div', 'span']).isRequired,
};

export default InteractiveElement;
