import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import HomePageFilters from './HomePageFilters';
import { FILTER_ITEMS_ARRAY, USER_SKILL_CODE_ARRAY } from '../../../Constants/PropTypes';
import { ENDPOINT_PARAMS } from '../../../Constants/EndpointParams';

class HomePageFiltersContainer extends Component {
  constructor(props) {
    super(props);
    this.onSkillSelect = this.onSkillSelect.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      filterValues: {},
    };
  }

  // Set all available filter arrays on mount
  componentWillMount() {
    const { filterValues } = this.state;
    filterValues[ENDPOINT_PARAMS.skill] = [];
  }

  // When a skill is selected, pull all the "codes" from the skill array and
  // set them to a new array and store in state.
  onSkillSelect(values) {
    const { filterValues } = this.state;
    const filterArray = [];
    values.forEach((value) => {
      filterArray.push(value.code);
    });
    filterValues[ENDPOINT_PARAMS.skill] = filterArray;
    this.setState({ filterValues });
  }

  // Submit the search by taking all the different filters' arrays and converting them strings,
  // then passing the parent object to queryString to stringify it.
  // Then pass that new string to a /results search.
  submitSearch(e) {
    // preventDefault() to prevent form submission side effects
    e.preventDefault();
    const { filterValues } = this.state;
    const stringifiedFilterValues = {};
    Object.keys(filterValues).forEach((key) => {
      stringifiedFilterValues[key] = filterValues[key].join();
      if (!stringifiedFilterValues[key].length) {
        delete stringifiedFilterValues[key];
      }
    });
    const qString = queryString.stringify(stringifiedFilterValues);
    this.props.onNavigateTo(`/results?${qString}`);
  }

  render() {
    const { filters, isLoading, userSkills } = this.props;
    return (
      <HomePageFilters
        filters={filters}
        onFilterSelect={this.onSkillSelect}
        submitSearch={this.submitSearch}
        isLoading={isLoading}
        userSkills={userSkills}
      />
    );
  }
}

HomePageFiltersContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  userSkills: USER_SKILL_CODE_ARRAY,
};

HomePageFiltersContainer.defaultProps = {
  isLoading: false,
  userSkills: [],
};

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(null, mapDispatchToProps)(HomePageFiltersContainer);
