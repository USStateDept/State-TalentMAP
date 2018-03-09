import React from 'react';
import PropTypes from 'prop-types';
import { OBC_COUNTRY_URL_PREFIX, OBC_POST_URL_PREFIX } from '../../Constants/OBC';

const OBCUrl = ({ id, type }) => {
  let url;
  let label; // link text value
  // define the URL according to the type
  switch (type) {
    case 'country':
      url = `${OBC_COUNTRY_URL_PREFIX}${id}`;
      label = 'Country';
      break;
    default:
    case 'post':
      url = `${OBC_POST_URL_PREFIX}${id}`;
      label = 'Post';
  }
  return (
    // This is not an internal react route. It references a route that
    // should be defined on the same server that is serving the react application.
    // We open it in a new tab.
    <a href={url} rel="noopener noreferrer" target="_blank">{label} details</a>
  );
};

OBCUrl.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['post', 'country']),
};

OBCUrl.defaultProps = {
  type: 'post',
};

export default OBCUrl;
