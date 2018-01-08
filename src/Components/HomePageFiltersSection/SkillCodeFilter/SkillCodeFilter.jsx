import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FILTERS } from '../../../Constants/PropTypes';
import { propSort } from '../../../utilities';

class SkillCodeFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: { value: '' },
    };
  }
  handleChange(selectedOption) {
    // set state with new values
    this.setState({ selectedOption: { value: selectedOption } });
    // pass to onFilterSelect prop function
    this.props.onFilterSelect(selectedOption);
  }
  render() {
    const { filters, isLoading } = this.props;
    const options = filters.slice().map((f) => {
      const newObj = { ...f };
      // add value and label props for Select to use
      newObj.value = f.code;
      newObj.label = f.custom_description;
      return newObj;
    });
    const sortedOptions = options.sort(propSort('custom_description'));
    const { selectedOption } = this.state;
    const value = selectedOption.value;
    return (
      <Select
        multi
        value={value}
        searchable={false}
        options={sortedOptions}
        onChange={this.handleChange}
        closeOnSelect={false}
        placeholder="Select one or multiple Skill Codes"
        isLoading={isLoading}
      />
    );
  }
}

SkillCodeFilter.propTypes = {
  filters: FILTERS.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

SkillCodeFilter.defaultProps = {
  isLoading: false,
};

export default SkillCodeFilter;
