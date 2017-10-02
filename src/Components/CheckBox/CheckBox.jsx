import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

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
    this.setState({ checked },
      this.props.onCheckBoxClick(checked.value, { ...this.props }),
    );
  }

  render() {
    const { id, label, title, name } = this.props;
    const { checked } = this.state;
    return (
      <div className="usa-grid-full tm-checkbox">
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
      </div>
    );
  }
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onCheckBoxClick: PropTypes.func,
};

CheckBox.defaultProps = {
  onCheckBoxClick: EMPTY_FUNCTION,
};

export default CheckBox;
