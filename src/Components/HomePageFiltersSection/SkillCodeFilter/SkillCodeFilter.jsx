import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FILTERS, USER_SKILL_CODE_ARRAY } from '../../../Constants/PropTypes';
import { propSort, wrapForMultiSelect, returnObjectsWherePropMatches } from '../../../utilities';

const SKILL_CODE = 'code';
const SKILL_DESCRIPTION = 'custom_description';
export const wrapFilters = filters => wrapForMultiSelect(filters, SKILL_CODE, SKILL_DESCRIPTION);

class SkillCodeFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOptions: { value: [] },
    };
  }

  // We want to set the user's default skills in state.selectedOptions, but don't want to repeat
  // the process on every update. So if userSkills exist and we didn't already set them as defaults,
  // this will compare them against all skill codes and add the ones that are present in userSkills,
  // based on a matching 'code' prop found in both arrays.
  componentWillReceiveProps(props) {
    const { selectedOptions } = this.state;
    const { filters, userSkills } = props;
    if (props.userSkills.length && !selectedOptions.value.length) {
      const options = wrapFilters(filters);
      const defaultSkills = returnObjectsWherePropMatches(options, userSkills, 'code');
      selectedOptions.value = defaultSkills;
      this.handleChange(selectedOptions.value);
    }
  }

  // set local state with new selected options, and also return them via the prop function
  handleChange(selectedOptions) {
    // set state with new values
    this.setState({ selectedOptions: { value: selectedOptions } });
    // pass to onFilterSelect prop function
    this.props.onFilterSelect(selectedOptions);
  }

  render() {
    const { filters, isLoading } = this.props;
    const { selectedOptions } = this.state;
    const options = wrapFilters(filters);
    const sortedOptions = options.sort(propSort('custom_description'));
    return (
      <Select
        multi
        value={selectedOptions.value}
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
  userSkills: USER_SKILL_CODE_ARRAY,
};

SkillCodeFilter.defaultProps = {
  isLoading: false,
  userSkills: [],
};

export default SkillCodeFilter;
