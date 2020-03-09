import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../InteractiveElement';

class ConfirmLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
  }

  onClick = () => {
    if (this.state.confirm) {
      this.props.onClick();
    } else {
      this.setState({ confirm: true });
    }
  };

  render() {
    const { confirm } = this.state;
    const { defaultText, className, role, type } = this.props;
    return (
      <InteractiveElement
        className={className}
        type={type}
        role={role}
        onClick={this.onClick}
      >
        { confirm ? 'Are you sure?' : defaultText }
      </InteractiveElement>);
  }
}

ConfirmLink.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  role: PropTypes.string,
  defaultText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
};

ConfirmLink.defaultProps = {
  className: '',
  type: 'div',
  role: 'link',
};

export default ConfirmLink;
