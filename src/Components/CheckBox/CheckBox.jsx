import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: { value: this.props.value },
    };
  }

  onCheck() {
    const { checked } = this.state;
    checked.value = !checked.value;
    this.setState({ checked });
    this.props.onCheckBoxClick(checked.value);
  }

  render() {
    const { id, label, title, name, legend } = this.props;
    const { checked } = this.state;
    return (
      <fieldset>
        <legend>{legend}</legend>
        <input
          type="checkbox"
          id={id}
          title={title}
          name={name}
          value={checked.value}
          onChange={() => this.onCheck()}
          checked={checked.value}
        />
        <label htmlFor={id}>{label}</label>
      </fieldset>
    );
  }
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
};

export default CheckBox;
