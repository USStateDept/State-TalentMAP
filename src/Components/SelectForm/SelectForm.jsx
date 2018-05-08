import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SORT_BY_ARRAY, EMPTY_FUNCTION } from '../../Constants/PropTypes';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.defaultSort || '',
    };
  }

  componentWillReceiveProps(props) {
    this.setDefaultValue(props);
  }

  setDefaultValue(props) {
    const { selection } = this.state;
    const { includeFirstEmptyOption, defaultSort } = props;
    if (includeFirstEmptyOption && !selection.length && defaultSort) {
      this.selectOption({ target: { value: defaultSort } });
    }
  }

  selectOption(e) {
    const selection = e.target.value;
    this.setState({ selection });
    this.props.onSelectOption(e);
  }
  render() {
    const { id, label, options, includeFirstEmptyOption, emptyOptionText,
    disabled, className } = this.props;
    const optionList = options.map(option =>
      (
        <option
          key={option.value}
          disabled={option.disabled}
          value={option.value}
        >
          {option.text}
        </option>
      ),
    );
    return (
      <div className="usa-form">
        <label htmlFor={id}>{label}</label>
        <select
          name={id}
          id={id}
          onChange={e => this.selectOption(e)}
          value={this.state.selection}
          disabled={disabled}
          className={className}
        >
          {
            includeFirstEmptyOption &&
            <option
              key="empty-option"
              disabled="true"
              value=""
            >
              {emptyOptionText}
            </option>
          }
          {
            optionList
          }
        </select>
      </div>
    );
  }
}

SelectForm.propTypes = {
  id: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  defaultSort: PropTypes.node,
  options: SORT_BY_ARRAY.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  includeFirstEmptyOption: PropTypes.bool,
  emptyOptionText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SelectForm.defaultProps = {
  languages: [],
  defaultSort: '',
  onSelectOption: EMPTY_FUNCTION,
  includeFirstEmptyOption: false,
  emptyOptionText: '- Select -',
  disabled: false,
  className: 'select-offset select-black',
};

export default SelectForm;
