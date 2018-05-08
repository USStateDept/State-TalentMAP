import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton';
import { OBC_COUNTRY_URL_PREFIX, OBC_POST_URL_PREFIX, OBC_POST_DATA_URL_PREFIX } from '../../Constants/OBC';
import { getAssetPath } from '../../utilities';

const OBCUrl = ({ id, type, label, isButton, altStyle }) => {
  let url;
  let text; // link text value

  // define the URL according to the type
  switch (type) {
    case 'country':
      url = getAssetPath(`${OBC_COUNTRY_URL_PREFIX}${id}`);
      text = 'Country';
      break;

    case 'post-data':
      url = getAssetPath(`${OBC_POST_DATA_URL_PREFIX}${id}`);
      text = 'Post';
      break;

    default:
    case 'post':
      url = getAssetPath(`${OBC_POST_URL_PREFIX}${id}`);
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
      <a href={url} rel="noopener noreferrer" target="_blank">{text}</a>
  );
};

OBCUrl.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
