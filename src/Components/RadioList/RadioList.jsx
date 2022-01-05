import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class RadioList extends Component {
  constructor(props) {
    super(props);
    const value = get(props, 'options[0].value') || get(props, 'options[0].id');
    this.state = {
      value: props.value || value || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  updateValue = e => {
    const { onChange } = this.props;
    const value = get(e, 'target.value', null);
    if (value) {
      this.setState({ value }, () => {
        onChange(value);
      });
    }
  };

  render() {
    const { value: selectedValue } = this.state;
    const { options, ulProps, liProps, inputProps, labelProps } = this.props;
    return (
      <ul className="usa-unstyled-list" {...ulProps}>
        {
          options.map((o) => {
            const id = o.id;
            const name = o.name || id;
            const value = o.value || id;
            const label = o.label || id;
            const isChecked = selectedValue === value;
            return (
              <li key={id} {...liProps}>
                <input
                  onChange={this.updateValue}
                  id={id}
                  type="radio"
                  checked={isChecked}
                  name={name}
                  value={value}
                  {...inputProps}
                />
                <label htmlFor={id} {...labelProps}>{label}</label>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

RadioList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  ulProps: PropTypes.shape({}),
  liProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
  labelProps: PropTypes.shape({}),
};

RadioList.defaultProps = {
  value: '',
  onChange: EMPTY_FUNCTION,
  ulProps: {},
  liProps: {},
  inputProps: {},
  labelProps: {},
};

export default RadioList;
