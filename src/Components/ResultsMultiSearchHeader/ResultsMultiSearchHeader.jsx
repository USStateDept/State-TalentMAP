import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { orderBy } from 'lodash';
import { EMPTY_FUNCTION, FILTER_ITEMS_ARRAY, USER_PROFILE } from '../../Constants/PropTypes';
import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import SearchBar from '../SearchBar/SearchBar';
import SkillCodeFilter from '../HomePageFiltersSection/SkillCodeFilter';
import SelectForm from '../SelectForm';
import { sortGrades } from '../../utilities';

// Set our params as state names so we can easily
// use them as properties to query on.
const SKILL_PARAM = ENDPOINT_PARAMS.skill;
const BUREAU_PARAM = ENDPOINT_PARAMS.org;
const GRADE_PARAM = ENDPOINT_PARAMS.grade;

class ResultsMultiSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: this.props.defaultFilters.q || '',
      defaultGrade: null,
      defaultBureau: null,
      skillsWasUpdated: false,
      gradeWasUpdated: false,
      qWasUpdated: false,
      bureauWasUpdated: false,
    };
    this.state[SKILL_PARAM] = [];
    this.state[BUREAU_PARAM] = null;
    this.state[GRADE_PARAM] = null;
  }

  UNSAFE_componentWillMount() {
    this.setupDefaultValues(this.props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setupDefaultValues(props);
  }

  onChangeSkills = e => {
    this.setState({ [SKILL_PARAM]: e, skillsWasUpdated: true }, this.filterChange);
  };

  onChangeBureau = e => {
    this.setState({ [BUREAU_PARAM]: e.target.value, bureauWasUpdated: true }, this.filterChange);
  };

  onChangeGrade = e => {
    this.setState({ [GRADE_PARAM]: e.target.value, gradeWasUpdated: true }, this.filterChange);
  };

  onChangeText = e => {
    this.setState({ q: e.target.value, qWasUpdated: true }, this.filterChange);
  };

  setupSkills(defaultSkills) {
    const { skillsWasUpdated } = this.state;
    // set skills to correct state
    if (!skillsWasUpdated && defaultSkills) {
      const mappedDefaultSkills = defaultSkills.length ?
        // map the skills as either a string or an object property 'code'
        defaultSkills.slice().map(s => ({ code: s.code || s })) : [];
      this.setState({ [SKILL_PARAM]: mappedDefaultSkills });
    }
  }

  // Setup default values only once so that we can mount the component while waiting
  // for async actions to complete. We'll also save state in redux so that the component can be
  // unmounted and remounted and maintain state. This is useful for responsively rendering this
  // component while maintaining the selected filters. We also have to balance that
  // with loading the user's defaults, but only on the initial page load.
  setupDefaultValues(props) {
    const { gradeWasUpdated, qWasUpdated, bureauWasUpdated } = this.state;
    const { userProfile: { grade, bureau, skills }, defaultFilters } = props;

    // set default values for our filters
    const defaultGrade = defaultFilters[GRADE_PARAM] || grade;
    const defaultBureau = defaultFilters[BUREAU_PARAM] || bureau;
    const defaultQuery = defaultFilters.q;

    // set keyword to correct state
    if (!qWasUpdated && defaultQuery) {
      this.setState({ q: defaultQuery, qWasUpdated: true });
    }

    // set grade to correct state
    if (!gradeWasUpdated && defaultGrade) {
      this.setState({ defaultGrade, gradeWasUpdated: true });
    }

    // set bureau to correct state
    if (!bureauWasUpdated && defaultBureau) {
      this.setState({ defaultBureau, bureauWasUpdated: true });
    }

    this.setupSkills(skills || defaultFilters[SKILL_PARAM]);
  }

  formatQuery() {
    const { q, [SKILL_PARAM]: skillCodes, [BUREAU_PARAM]: bureaus,
      [GRADE_PARAM]: grades, defaultBureau, defaultGrade } = this.state;
    const skills = skillCodes.slice().map(s => s.code);
    // use the defaults if the new value doesn't exist
    const query = {
      q,
      [SKILL_PARAM]: skills,
      [BUREAU_PARAM]: bureaus || defaultBureau,
      [GRADE_PARAM]: grades || defaultGrade,
    };
    return query;
  }

  // return all the filters upon submission
  submitSearch = e => {
    // resolves “Form submission canceled because the form is not connected” warning
    e.preventDefault();
    const query = this.formatQuery();
    this.props.onSubmit(query);
  };

  // return all the filters as an object whenever any change is made
  filterChange = () => {
    const query = this.formatQuery();
    this.props.onFilterChange(query);
  };

  render() {
    const { placeholder, filters, userProfile, filtersIsLoading } = this.props;
    const { q, defaultGrade, defaultBureau, [SKILL_PARAM]: skills } = this.state;

    // format skill codes
    const skillCodes = filters.find(f => f.item && f.item.description === 'skill');
    const skillCodesData = skillCodes ? skillCodes.data : [];

    // format grades
    const grades = filters.find(f => f.item && f.item.description === 'grade');
    let mappedGrades = grades && grades.data ?
      grades.data.slice().map(g => ({ ...g, value: g.code, text: g.code })) : [];
    // sort the grades using custom sorting
    mappedGrades = mappedGrades.sort(sortGrades);

    // format bureaus
    const bureaus = filters.find(f => f.item && f.item.description === 'region');
    const mappedBureaus = bureaus && bureaus.data ?
      bureaus.data.slice().map(g => ({ ...g, value: g.code, text: g.custom_description })) : [];
    // sort the Bureaus by their calculated label
    const sortedBureuas = orderBy(mappedBureaus, ['text']);

    // set the default skills
    const defaultSkills = skills || userProfile.skills || [];
    return (
      <div className="results-search-bar padded-main-content results-multi-search">
        <div className="usa-grid-full results-search-bar-container">
          <form className="usa-grid-full" onSubmit={this.submitSearch} >
            <fieldset className="usa-width-one-whole">
              <div className="usa-grid-full">
                <div className="usa-grid-full">
                  <div className="usa-width-five-twelfths search-results-inputs search-keyword">
                    <legend className="usa-grid-full">Find your next position</legend>
                    <SearchBar
                      id="multi-search-keyword-field"
                      label="Keywords"
                      type="medium"
                      submitText="Search"
                      labelSrOnly
                      noForm
                      noButton
                      placeholder={placeholder}
                      onChangeText={this.onChangeText}
                      defaultValue={q}
                    />
                    <div className="search-sub-text">Example: Abuja, Nigeria, Political Affairs (5505), Russian...</div>
                  </div>
                  <div className="usa-width-one-fourth search-results-inputs search-keyword">
                    <SkillCodeFilter
                      label="Skill"
                      isLoading={filtersIsLoading}
                      filters={skillCodesData}
                      onFilterSelect={this.onChangeSkills}
                      userSkills={defaultSkills}
                    />
                  </div>
                  <div className="usa-width-one-twelfth search-results-inputs search-keyword">
                    <SelectForm
                      id="grade-searchbar-filter"
                      label="Grade"
                      options={mappedGrades}
                      defaultSort={defaultGrade}
                      includeFirstEmptyOption
                      onSelectOption={this.onChangeGrade}
                      emptyOptionText=""
                      className="select-black select-small"
                    />
                  </div>
                  <div className="usa-width-one-sixth search-results-inputs search-keyword">
                    <SelectForm
                      id="bureau-searchbar-filter"
                      label="Bureau"
                      options={sortedBureuas}
                      defaultSort={defaultBureau}
                      includeFirstEmptyOption
                      onSelectOption={this.onChangeBureau}
                      className="select-black select-small"
                    />
                  </div>
                  <div className="usa-width-one-twelfth search-submit-button">
                    <button className="usa-button" type="submit">
                      <FontAwesome name="search" className="label-icon" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

ResultsMultiSearchHeader.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultFilters: PropTypes.shape({
    q: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  filters: FILTER_ITEMS_ARRAY.isRequired,
  filtersIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
  onFilterChange: PropTypes.func,
};

ResultsMultiSearchHeader.defaultProps = {
  filters: [],
  defaultFilters: {},
  filtersIsLoading: false,
  placeholder: 'Enter keywords...',
  userProfile: {},
  onFilterChange: EMPTY_FUNCTION,
};

export default ResultsMultiSearchHeader;
