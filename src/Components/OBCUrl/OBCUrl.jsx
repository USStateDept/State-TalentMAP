import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton';

const OBCUrl = ({ type, label, isButton, altStyle, url }) => {
  let text; // link text value

  // define the URL according to the type
  switch (type) {
    case 'country':
      text = 'Country';
      break;

    case 'post-data':
      text = 'Post';
      break;

    default:
    case 'post':
      text = 'Post';
  }

  text = label || `${text} details`;

  return (
    // This is not an internal react route. It references a route that
    // should be defined on the same server that is serving the react application.
    // We open it in a new tab.
    isButton ?
      <LinkButton isExternal className={`post-data-button ${altStyle ? 'usa-button-secondary' : ''}`} toLink={url} >{text}</LinkButton>
      :
      // This always directs to an internal resource, so there is no security risk.
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={url} rel="noopener" target="_blank">{text}</a>
  );
};

OBCUrl.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['post', 'post-data', 'country']),
  label: PropTypes.node,
  isButton: PropTypes.bool,
  altStyle: PropTypes.bool,
};

OBCUrl.defaultProps = {
  type: 'post',
  label: null,
  isButton: false,
  altStyle: false,
};

export default OBCUrl;
