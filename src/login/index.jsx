import React from 'react';
import { connect } from 'react-redux';
import { keys, merge, pick } from 'lodash';
import LoginForm, { LoginForm as _LoginForm } from './Components/LoginForm';
import TokenValidation from './Components/TokenValidation';
import { login, tokenValidationRequest } from './actions';

// set login method, default to username + password
const loginMode = process.env.LOGIN_MODE || 'password';
const isSAML = (loginMode !== 'password');

// Get functional component prop-type config
const props$ = {
  types: merge({}, _LoginForm.propTypes, TokenValidation.propTypes),
  defaults: merge({}, _LoginForm.defaultProps, TokenValidation.defaultProps),
};

props$.keys = keys(props$.types);

const Login = (props) => {
  const Element = !isSAML ? LoginForm : TokenValidation;
  // Just to be safe we don't too much automated injecting that we'll just take the ones that
  // are configured on the components
  const options = pick(props, props$.keys);
  return (
    <Element {...options} />
  );
};

Login.propTypes = props$.types;
Login.defaultProps = props$.defaults;

const mapStateToProps = state => ({
  login: state.login,
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (form) => {
    console.log(form);
    return dispatch(login(form.username, form.password));
  },
  tokenValidationRequest: token => dispatch(tokenValidationRequest(token)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connected;
