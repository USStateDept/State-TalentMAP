import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { orderBy } from 'lodash';
import { FILTERS } from '../../../Constants/PropTypes';
import { returnObjectsWherePropMatches, wrapForMultiSelect } from '../../../utilities';

const SKILL_CODE = 'code';
const SKILL_DESCRIPTION = 'custom_description';
export const wrapFilters = filters => wrapForMultiSelect(filters, SKILL_CODE, SKILL_DESCRIPTION);

class SkillCodeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: { value: [], hasBeenUpdated: false },
    };
  }

  UNSAFE_componentWillMount() {
    this.setupValues(this.props);
  }

  // We want to set the user's default skills in state.selectedOptions, but don't want to repeat
  // the process on every update. So if userSkills exist and we didn't already set them as defaults,
  // this will compare them against all Skill codes and add the ones that are present in userSkills,
  // based on a matching 'code' prop found in both arrays.
  UNSAFE_componentWillReceiveProps(props) {
    this.setupValues(props);
  }

  setupValues(props) {
    const { selectedOptions } = this.state;
    const { filters, userSkills } = props;
    if (props.userSkills.length && !selectedOptions.hasBeenUpdated) {
      const options = wrapFilters(filters);
      const defaultSkills = returnObjectsWherePropMatches(options, userSkills, 'code');
      selectedOptions.value = defaultSkills;
      this.handleChange(selectedOptions.value, true);
    }
  }

  // Set local state with new selected options, and also return them via the prop function.
  // we also update the hasBeenUpdated property to true ao that we don't try to re-set userSkills.
  // We set bypass to true when inorganic/programatic calls to this function are made.
  handleChange = (selectedOptions, bypass = false) => {
    // set state with new values
    const { selectedOptions: selectedOptionsState } = this.state;
    this.setState({ selectedOptions: Object.assign(
      selectedOptionsState, { value: selectedOptions }) });
    // Pass to onFilterSelect prop function.
    // These are only used for "real" changes by the user, opposed to
    // programatic setup performed.
    if (!bypass) {
      this.setState({ selectedOptions: Object.assign(
        selectedOptionsState, { hasBeenUpdated: true }) });
      this.props.onFilterSelect(selectedOptions);
    }
  };

  render() {
    const { filters, isLoading, label, labelSrOnly } = this.props;
    const { selectedOptions } = this.state;
    const options = wrapFilters(filters);
    const sortedOptions = orderBy(options, 'custom_description');
    const labelClass = labelSrOnly ? 'usa-sr-only' : '';
    return (
      <div>
        <label htmlFor="skill-multi-select" className={labelClass}>{label}</label>
        <Select
          id="skill-multi-select"
          multi
          value={selectedOptions.value}
          searchable={false}
          options={sortedOptions}
          onChange={this.handleChange}
          closeOnSelect={false}
          placeholder="Select Skills"
          isLoading={isLoading}
          tabSelectsValue={false /* avoid focus trap */}
        />
      </div>
    );
  }
}

SkillCodeFilter.propTypes = {
  filters: FILTERS.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  labelSrOnly: PropTypes.bool,
};

SkillCodeFilter.defaultProps = {
  isLoading: false,
  userSkills: [],
  label: 'Terms',
  labelSrOnly: false,
};

export default SkillCodeFilter;
