import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import TokenValidation from './Components/TokenValidation';

import { tokenValidationRequest } from './actions';
import { auth } from './sagas';

const Login = (props) => {
  const isSignedIn = !!auth.get();

  return (!isSignedIn ?
    <TokenValidation {...props} /> :
    <Redirect to="/" />
  );
};

Login.propTypes = TokenValidation.propTypes;
Login.defaultProps = TokenValidation.defaultProps;

const mapStateToProps = state => ({
  login: state.login,
});

export const mapDispatchToProps = dispatch => ({
  tokenValidationRequest: token => dispatch(tokenValidationRequest(token)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connected;
