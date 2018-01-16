import React from 'react';
import PropTypes from 'prop-types';

const AuthorizedWrapper = ({ isAuthorized, children }) => {
  const hasAuthorization = isAuthorized();
  return (
    <div className="authorized-wrapper">
      { hasAuthorization && children }
    </div>
  );
};

AuthorizedWrapper.propTypes = {
  isAuthorized: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthorizedWrapper;
