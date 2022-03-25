import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { usePrevious } from 'hooks';

const TextInput = props => {
  const [input, setInput] = useState(props.value || '');

  const changeText = e => {
    setInput(get(e, 'target.value'));
  };

  const prevInput = usePrevious(input);

  useEffect(() => {
    const shouldUpdate = (input || prevInput) && input !== prevInput;
    if (shouldUpdate) {
      props.changeText(input);
    }
  }, [input]);

  useEffect(() => {
    const shouldUpdate = props.value !== input;
    if (shouldUpdate) {
      changeText({ target: { value: props.value } });
    }
  }, [props.value]);

  const { id, labelSrOnly, type, label, labelMessage, placeholder, inputProps,
    containerProps, customContainerClass } = props;
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
    <div className={`usa-grid-full ${parentClass} ${customContainerClass}`} {...containerProps}>
      <label htmlFor={id} className={labelSrOnly ? 'usa-sr-only' : ''}>{label}</label>
      <input
        id={id}
        name="input-type-text"
        type="text"
        value={input}
        onChange={changeText}
        className={inputClass}
        placeholder={placeholder}
        {...inputProps}
      />
      {message}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  labelSrOnly: PropTypes.bool,
  changeText: PropTypes.func,
  type: PropTypes.oneOf(['success', 'error', 'focus']),
  label: PropTypes.string,
  labelMessage: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  inputProps: PropTypes.shape({}),
  containerProps: PropTypes.shape({}),
  customContainerClass: PropTypes.string,
};

TextInput.defaultProps = {
  labelSrOnly: false,
  changeText: () => {},
  type: undefined,
  label: '',
  labelMessage: '',
  value: null,
  placeholder: '',
  inputProps: {},
  containerProps: {},
  customContainerClass: '',
};

export default TextInput;
