import React from 'react';
import PropTypes from 'prop-types';
import { OBC_COUNTRY_URL_PREFIX, OBC_POST_URL_PREFIX } from '../../Constants/OBC';

const OBCUrl = ({ id, type, label }) => {
  let url;
  let text; // link text value

  // define the URL according to the type
  switch (type) {
    case 'country':
      url = `${OBC_COUNTRY_URL_PREFIX}${id}`;
      text = 'Country';
      break;

    default:
    case 'post':
      url = `${OBC_POST_URL_PREFIX}${id}`;
      text = 'Post';
  }

  text = label || `${text} details`;

  return (
    // This is not an internal react route. It references a route that
    // should be defined on the same server that is serving the react application.
    // We open it in a new tab.
    <a href={url} rel="noopener noreferrer" target="_blank">{text}</a>
  );
};

OBCUrl.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['post', 'country']),
  label: PropTypes.string,
};

OBCUrl.defaultProps = {
  type: 'post',
  label: null,
};

export default OBCUrl;
