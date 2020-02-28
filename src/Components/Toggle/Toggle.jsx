import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.isSelected = this.isSelected.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      val: props.items[props.initialIndex].value,
    };
  }

  onSelect(e) {
    const { onChange } = this.props;
    const val = get(e, 'target.value');
    if (val) {
      this.setState({ val }, () => {
        onChange(this.state.val);
      });
    }
  }

  // used by consumer components as ref
  updateVal(val) {
    this.setState({ val });
  }

  isSelected(v) {
    const { val } = this.state;
    return v === val;
  }

  render() {
    const { items } = this.props;
    return (
      <div className="toggle-container">
        {items.map((m) => {
          const isSelected = this.isSelected(m.value);
          return (
            <button
              key={m.value}
              value={m.value}
              onClick={this.onSelect}
              className={`toggle-button ${isSelected ? 'toggle-button--selected' : ''}`}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    );
  }
}

Toggle.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  initialIndex: PropTypes.number,
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  initialIndex: 0,
  onChange: EMPTY_FUNCTION,
};

export default Toggle;
