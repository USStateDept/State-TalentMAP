import React, { Component } from 'react';
import { redirectToLogin } from '../../utilities';
import Alert from '../../Components/Alert';

// Used as an internal route so that we can push this route to history
// when the user is not logged in, as authentication redirects take a
// a moment to load and the route is partially rendered when using window.location.href
// opposed to an internal React route.
class LoginRedirect extends Component {
  componentDidMount() {
    redirectToLogin();
  }

  render() {
    return (
      <div className="usa-grid-full login-container content-container">
        <div className="usa-width-one-half">
          <Alert title="Redirecting you to organization login..." type="info" />
        </div>
      </div>
    );
  }
}

export default LoginRedirect;
