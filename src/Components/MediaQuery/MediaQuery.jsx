import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import breakpoints from './breakpoints';

const MediaQueryWrapper = ({ breakpoint, widthType, children }) => {
  const mediaProps = {};
  // set the right prop based on the widthType
  if (widthType === 'max') { mediaProps.maxWidth = breakpoints[breakpoint]; }
  if (widthType === 'min') { mediaProps.minWidth = breakpoints[breakpoint]; }
  return (
    <MediaQuery {...mediaProps}>
      {children}
    </MediaQuery>
  );
};

MediaQueryWrapper.propTypes = {
  breakpoint: PropTypes.oneOf(['screenSmMin', 'screenXsMax', 'screenMdMin', 'screenSmMax', 'screenLgMin', 'screenMdMax']).isRequired,
  widthType: PropTypes.oneOf(['max', 'min']).isRequired,
  children: PropTypes.node.isRequired,
};

export default MediaQueryWrapper;
