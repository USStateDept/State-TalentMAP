import React from 'react';
import Alert from '../../Components/Alert';

const Logout = () => (
  <div className="usa-grid-full login-container content-container padded-main-content">
    <div className="usa-grid-full login">
      <div className="auth-messages">
        <Alert type="info" title="Logging out..." />
      </div>
    </div>
  </div>
);

export default Logout;
