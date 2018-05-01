import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Alert from '../../Components/Alert/Alert';

import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { initialState } from '../reducer';

/* eslint-disable react/prop-types */
// If defaultProp is set for handleSubmit, the form gets submitted because handleSubmit
// isn't injected by reduxForm -> seriously?
export const LoginForm = (props) => {
  const {
      handleSubmit, // remember, Redux Form injects this into our props
      onSubmit,
      login: {
        requesting,
        messages,
        errors,
      },
    } = props;

  return (
    <div className="usa-grid-full login-container content-container padded-main-content">
      <div className="usa-grid-full login">
        <form className="usa-form" onSubmit={handleSubmit(onSubmit)}>
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
        </form>
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
};
/* eslint-enable react/prop-types */

// Pass the correct proptypes in for validation
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }).isRequired,
};

LoginForm.defaultProps = {
  onSubmit: EMPTY_FUNCTION,
  login: initialState,
};

// Set sample username and password for the general public to use - currently set to admin/admin
// Export our well formed login component with default credentials set to the field
export default reduxForm({
  form: 'LoginForm',
  initialValues: {
    // Set initial values
    username: 'admin',
    password: 'admin',
  },
})(LoginForm);
