import { Component } from 'react';
import PropTypes from 'prop-types';
import { isString } from 'lodash';
import { EMPTY_FUNCTION, SORT_BY_ARRAY } from '../../Constants/PropTypes';

class SelectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.defaultSort || '',
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setDefaultValue(props);
  }

  setDefaultValue(props) {
    const { selection } = this.state;
    const { includeFirstEmptyOption, defaultSort } = props;
    if (includeFirstEmptyOption && !selection.length && (defaultSort || isString(defaultSort))) {
      this.selectOption({ target: { value: defaultSort || '' } });
    } else if ((defaultSort || isString(defaultSort)) && defaultSort !== selection) {
      this.setState({ selection: defaultSort || '' });
    }
  }

  selectOption(e) {
    const { transformValue } = this.props;

    const selection = e.target.value;
    this.setState({ selection });
    this.props.onSelectOption({ target: { value: transformValue(selection) } });
  }
  render() {
    const { id, label, options, includeFirstEmptyOption, emptyOptionText,
      disabled, className, labelSrOnly } = this.props;

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
      <div className={`usa-form ${disabled ? 'results-loading' : ''}`}>
        <label className={labelSrOnly ? 'usa-sr-only' : ''} htmlFor={id}>{label}</label>
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
  onSelectOption: PropTypes.func,
  includeFirstEmptyOption: PropTypes.bool,
  emptyOptionText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  transformValue: PropTypes.func,
  labelSrOnly: PropTypes.bool,
};

SelectForm.defaultProps = {
  defaultSort: null,
  onSelectOption: EMPTY_FUNCTION,
  includeFirstEmptyOption: false,
  emptyOptionText: '- Select -',
  disabled: false,
  className: 'select-offset select-black',
  transformValue: n => n,
  labelSrOnly: false,
};

export default SelectForm;
