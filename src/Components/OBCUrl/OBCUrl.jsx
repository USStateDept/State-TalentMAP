import React from 'react';
import PropTypes from 'prop-types';

const OBCUrl = ({ id }) => (
  // This is not an internal react route. It references a route that
  // should be defined on the same server that is serving the react application.
  // We open it in a new tab.
  <a href={`/obc/post/${id}`} rel="noopener noreferrer" target="_blank">Post details</a>
);

OBCUrl.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OBCUrl;
