import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SORT_BY_ARRAY } from '../../Constants/PropTypes';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.defaultSort || '',
    };
  }

  selectOption(e) {
    const selection = e.target.value;
    this.setState({ selection });
    this.props.onSelectOption(e);
  }
  render() {
    const { id, label, options } = this.props;
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
      <form className="usa-form">
        <label htmlFor={id}>{label}</label>
        <select
          name={id}
          id={id}
          onChange={e => this.selectOption(e)}
          value={this.state.selection}
        >
          {
            optionList
          }
        </select>
      </form>
    );
  }
}

SelectForm.propTypes = {
  id: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  defaultSort: PropTypes.node,
  options: SORT_BY_ARRAY.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

SelectForm.defaultProps = {
  languages: [],
  defaultSort: '',
};

export default SelectForm;
