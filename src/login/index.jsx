import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { keys, merge, pick } from 'lodash';

import LoginForm, { LoginForm as _LoginForm } from './Components/LoginForm';
import TokenValidation from './Components/TokenValidation';

import { authRequest, tokenValidationRequest } from './actions';
import { auth } from './sagas';

const isSAML = auth.isSAMLAuth();

// Get functional component prop-type config
const props$ = {
  types: merge({}, _LoginForm.propTypes, TokenValidation.propTypes),
  defaults: merge({}, _LoginForm.defaultProps, TokenValidation.defaultProps),
};

props$.keys = keys(props$.types);

const Login = (props) => {
  const Element = !isSAML ? LoginForm : TokenValidation;
  const isSignedIn = !!auth.get();

  // Just to be safe we don't too much automated injecting that we'll just take the ones that
  // are configured on the components
  const options = pick(props, props$.keys);
  return (!isSignedIn ?
    <Element {...options} /> :
    <Redirect to="/" />
  );
};

Login.propTypes = props$.types;
Login.defaultProps = props$.defaults;

const mapStateToProps = state => ({
  login: state.login,
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: ({ username, password }) => dispatch(authRequest(true, { username, password })),
  tokenValidationRequest: token => dispatch(tokenValidationRequest(token)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connected;
