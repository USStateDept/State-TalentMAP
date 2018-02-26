import React from 'react';
import PropTypes from 'prop-types';

const OBCUrl = ({ id, type }) => {
  let url;
  // define the URL according to the type
  switch (type) {
    case 'country':
      url = `/obc/country/${id}`;
      break;
    default:
    case 'post':
      url = `/obc/post/${id}`;
  }
  return (
    // This is not an internal react route. It references a route that
    // should be defined on the same server that is serving the react application.
    // We open it in a new tab.
    <a href={url} rel="noopener noreferrer" target="_blank">Post details</a>
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
