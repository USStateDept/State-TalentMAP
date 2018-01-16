import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthorizedWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: { value: false },
    };
  }
  componentWillMount() {
    this.setAuthorization();
  }
  componentWillReceiveProps() {
    this.setAuthorization();
  }
  setAuthorization() {
    const isAuthorized = { value: this.props.isAuthorized() };
    this.setState({ isAuthorized });
  }
  render() {
    const { isAuthorized } = this.state;
    return (
      <div className="authorized-wrapper">
        { isAuthorized.value && this.props.children }
      </div>
    );
  }
}

AuthorizedWrapper.propTypes = {
  isAuthorized: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthorizedWrapper;
