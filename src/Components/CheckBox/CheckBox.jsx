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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ checked: { value: nextProps.value } });
    }
  }

  onCheck() {
    const { checked } = this.state;
    checked.value = !checked.value;
    this.setState({ checked },
      this.props.onCheckBoxClick(checked.value, { ...this.props }),
    );
  }

  render() {
    const { id, label, title, name, labelSrOnly, small, className } = this.props;
    const { checked } = this.state;
    return (
      <div className={`usa-grid-full ${className} tm-checkbox ${small ? 'tm-checkbox-small' : ''}`}>
        <input
          type="checkbox"
          id={id}
          title={title}
          name={name}
          value={checked.value}
          onChange={() => this.onCheck()}
          checked={checked.value}
        />
        <label htmlFor={id}><span className={`${labelSrOnly ? 'usa-sr-only' : ''}`}>{label}</span></label>
      </div>
    );
  }
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onCheckBoxClick: PropTypes.func,
  labelSrOnly: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
};

CheckBox.defaultProps = {
  title: '',
  name: '',
  onCheckBoxClick: EMPTY_FUNCTION,
  labelSrOnly: false,
  small: false,
  className: '',
};

export default CheckBox;
