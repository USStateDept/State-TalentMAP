import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';
import { EMPTY_FUNCTION } from '../Constants/PropTypes';

import { loginRequest } from './actions';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loopActive: false,
      shuffleActive: false,
      emptyFields: false,
    };
  }

  render() {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;

    // Remember, Redux Form passes the form values to our handler
    // In this case it will be an object with `email` and `password`
    const submit = (values) => {
      this.props.loginRequest(values);
    };

    return (
      <div className="usa-grid-full">
        <div className="login">
          <form className="usa-form" onSubmit={handleSubmit(submit)}>
            <fieldset>
              <legend className="usa-drop_text">Sign in</legend>
              <label htmlFor="email">Username or Email</label>
              {/*
                Our Redux Form Field components that bind email and password
                to our Redux state's form -> login piece of state.
              */}
              <Field
                name="email"
                type="text"
                id="email"
                className="email"
                component="input"
              />
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                id="password"
                className="password"
                component="input"
              />
              <input type="submit" value="Sign in" />
            </fieldset>
          </form>
          <div className="auth-messages">
            {/* As in the signup, we're just using the message and error helpers */}
            {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
            {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
            {requesting && <div>Logging in...</div>}
            {!requesting && !successful}
          </div>
        </div>
      </div>
    );
  }
}

// Pass the correct proptypes in for validation
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

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login,
});

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { loginRequest })(Login);

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'login',
})(connected);

// Export our well formed login component
export default formed;
