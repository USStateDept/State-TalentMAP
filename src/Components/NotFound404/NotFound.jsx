import React from 'react';
import Alert from '../../Components/Alert';

const NotFound = () => (
  <div className="usa-grid-full login-container content-container padded-main-content">
    <div className="usa-grid-full login">
      <div className="auth-messages usa-width-one-half">
        <Alert type="error" title="Page Not Found" messages={[{ body: 'Make sure you entered the correct URL.' }]} />
      </div>
    </div>
  </div>
);

export default NotFound;
