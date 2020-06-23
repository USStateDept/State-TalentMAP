import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isNil } from 'lodash';
import { Tooltip } from 'react-tippy';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.items[props.initialIndex].value,
    };
  }

  onSelect = e => {
    const { onChange } = this.props;
    const val = get(e, 'target.value');
    if (val) {
      this.setState({ val }, () => {
        onChange(this.state.val);
      });
    }
  };

  // used by consumer components as ref
  updateVal(val) {
    this.setState({ val });
  }

  isSelected = v => {
    const { val } = this.state;
    return v === val;
  };

  render() {
    const { items } = this.props;
    return (
      <div className="toggle-container">
        {items.map((m) => {
          const isSelected = this.isSelected(m.value);
          const addTooltip = !isNil(m.tooltip);
          let renderedContent;
          if (!addTooltip) {
            renderedContent = (<button
              key={m.value}
              value={m.value}
              onClick={this.onSelect}
              className={`toggle-button ${isSelected ? 'toggle-button--selected' : ''} ${m.toggleClass}`}
            >
              {m.label}
            </button>);
          } else {
            renderedContent = (
              <Tooltip
                title={m.tooltip}
                arrow
                offset={-50}
                tabIndex="0"
              >
                <button
                  key={m.value}
                  value={m.value}
                  onClick={this.onSelect}
                  className={`toggle-button ${isSelected ? 'toggle-button--selected' : ''} ${m.toggleClass}`}
                >{m.label}
                </button>
              </Tooltip>);
          }

          return renderedContent;
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
