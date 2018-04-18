import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EMPTY_FUNCTION } from '../Constants/PropTypes';

import LoginForm from './Components/LoginForm';
import TokenValidation from './Components/TokenValidation';

// set login method, default to username + password
const loginMode = process.env.LOGIN_MODE || 'password';

class Login extends Component {
  render() {
    let component = null;

    if (loginMode === 'password') {
      component = <LoginForm {...this.props} />;
    } else {
      component = <TokenValidation {...this.props} />;
    }
    return (
      { component }
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }).isRequired,
};

Login.defaultProps = {
  handleSubmit: EMPTY_FUNCTION,
  loginRequest: EMPTY_FUNCTION,
};

export default Login;
