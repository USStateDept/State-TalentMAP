import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { EMPTY_FUNCTION } from '../Constants/PropTypes';
import Alert from '../Components/Alert/Alert';
import Form from '../Components/Form';

import { loginRequest } from './actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
      loopActive: false,
      shuffleActive: false,
      emptyFields: false,
    };
  }

  // Remember, Redux Form passes the form values to our handler
  // In this case it will be an object with `username` and `password`
  submit({ username, password }) {
    this.props.loginRequest({ username, password });
  }

  render() {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        messages,
        errors,
      },
    } = this.props;

    return (
      <div className="usa-grid login-container content-container">
        <div className="usa-grid login">
          <Form className="usa-form" onSubmit={handleSubmit(this.submit)}>
            <fieldset>
              <legend className="usa-drop_text">Sign in</legend>
              <label htmlFor="username">Username</label>
              {/*
                Our Redux Form Field components that bind username and password
                to our Redux state's form -> login piece of state.
              */}
              <Field
                name="username"
                type="text"
                id="username"
                className="username"
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
          </Form>
          <div className="auth-messages">
            {
              !requesting && !!errors.length &&
              (<div className="usa-width-one-half">
                <Alert title="Failed to login due to:" messages={errors} type="error" />
              </div>)
            }
            {
              !requesting && !!messages.length &&
              (<div className="usa-width-one-half">
                <Alert title="Please see below" messages={messages} type="info" />
              </div>)
            }
            {
              requesting &&
              (<div className="usa-width-one-half">
                <Alert title="Logging in..." type="info" />
              </div>)
            }
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

// Set sample username and password for the general public to use
// Currently set to admin/admin
const formedWithDefaultCreds = connect(
  () => ({
    initialValues: { username: 'admin', password: 'admin' }, // set initial values
  }),
)(formed);

// Export our well formed login component with default credentials set to the field
export default formedWithDefaultCreds;
