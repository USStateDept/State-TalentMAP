import React from 'react';
import PropTypes from 'prop-types';

const OBCUrl = ({ id, type, label }) => {
  let url;
  let text; // link text value

  // define the URL according to the type
  switch (type) {
    case 'country':
      url = `/obc/country/${id}`;
      text = 'Country';
      break;

    default:
    case 'post':
      url = `/obc/post/${id}`;
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
