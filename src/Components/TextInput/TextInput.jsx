import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
    this.state = {
      input: { value: '' },
    };
  }
  changeText(e) {
    const { input } = this.state;
    input.value = e.target.value;
    this.setState({ input }, this.props.changeText(e.target.value));
  }
  render() {
    const { id, labelSrOnly, type, label, labelMessage } = this.props;
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
        />
        {message}
      </div>
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  labelSrOnly: PropTypes.bool,
  changeText: PropTypes.func,
  type: PropTypes.oneOf(['success', 'error', 'focus']),
  label: PropTypes.string,
  labelMessage: PropTypes.string,
};

TextInput.defaultProps = {
  labelSrOnly: false,
  changeText: EMPTY_FUNCTION,
  type: undefined,
  label: '',
  labelMessage: '',
};

export default TextInput;
