import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { isOnProxy } from 'utilities';
import LinkButton from '../LinkButton';

const OBCUrl = ({ type, label, isButton, altStyle, url }) => {
  let text; // link text value
  let url$ = get(url, 'internal');

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

  if (isOnProxy()) {
    url$ = get(url, 'external');
  }

  const el = isButton ?
    <LinkButton isExternal className={`post-data-button ${altStyle ? 'usa-button-secondary' : ''}`} toLink={url$} >{text}</LinkButton>
    :
    // This always directs to an internal resource, so there is no security risk.
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={url$} rel="noopener" target="_blank">{text}</a>;

  return (
    url$ ? el : null
  );
};

OBCUrl.propTypes = {
  url: PropTypes.shape({ internal: PropTypes.string, external: PropTypes.string }),
  type: PropTypes.oneOf(['post', 'post-data', 'country']),
  label: PropTypes.node,
  isButton: PropTypes.bool,
  altStyle: PropTypes.bool,
};

OBCUrl.defaultProps = {
  url: {},
  type: 'post',
  label: null,
  isButton: false,
  altStyle: false,
};

export default OBCUrl;
