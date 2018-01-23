import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
    this.state = {
      input: { value: this.props.value || '' },
    };
  }
  changeText(e) {
    const { input } = this.state;
    input.value = e.target.value;
    this.setState({ input }, this.props.changeText(e.target.value));
  }
  render() {
    const { id, labelSrOnly, type, label, labelMessage, placeholder } = this.props;
    const { input } = this.state;
    let labelClass;
    // set the input class based on "type" prop
    let inputClass;
    // set the parent div class based on "type" prop
    let parentClass;
    // check the "type" prop
    switch (type) {
      case 'error':
        labelClass = 'usa-input-error-message';
        inputClass = 'input-error';
        parentClass = 'usa-input-error';
        break;
      case 'success':
        inputClass = 'usa-input-success';
        break;
      case 'focus':
        inputClass = 'usa-input-focus';
        break;
      default:
        inputClass = '';
        parentClass = '';
    }
    // set an optional message
    const message = labelMessage.length ?
      (
        <span className={labelClass} id={`${id}-input-error-message`} role="alert">
          {labelMessage}
        </span>
      ) :
      null;
    return (
      <div className={`usa-grid-full ${parentClass}`}>
        <label htmlFor={id} className={labelSrOnly ? 'usa-sr-only' : ''}>{label}</label>
        <input
          id={id}
          name="input-type-text"
          type="text"
          value={input.value}
          onChange={this.changeText}
          className={inputClass}
          placeholder={placeholder}
        />
        {message}
      </div>
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  labelSrOnly: PropTypes.bool,
  changeText: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'focus']),
  label: PropTypes.string,
  labelMessage: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  labelSrOnly: false,
  type: undefined,
  label: '',
  labelMessage: '',
  value: null,
  placeholder: '',
};

export default TextInput;
