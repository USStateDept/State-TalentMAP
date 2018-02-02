import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FILTER_ITEMS_ARRAY, USER_PROFILE, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import SearchBar from '../SearchBar/SearchBar';
import SkillCodeFilter from '../HomePageFiltersSection/SkillCodeFilter';
import SelectForm from '../SelectForm';

class ResultsMultiSearchHeader extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onChangeBureau = this.onChangeBureau.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.state = {
      q: this.props.defaultFilters.q || '',
      skill__code__in: [],
      bureau__code__in: null,
      grade__code__in: null,
      defaultGrade: null,
      defaultBureau: null,
      defaultQuery: '',
      skillsWasUpdated: false,
      gradeWasUpdated: false,
      qWasUpdated: false,
      bureauWasUpdated: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setupDefaultValues(props);
  }

  onChangeSkills(e) {
    this.setState({ skill__code__in: e, skillsWasUpdated: true }, this.filterChange);
  }

  onChangeBureau(e) {
    this.setState({ bureau__code__in: e.target.value }, this.filterChange);
  }

  onChangeGrade(e) {
    this.setState({ grade__code__in: e.target.value }, this.filterChange);
  }

  onChangeText(e) {
    this.setState({ q: e.target.value, qWasUpdated: true }, this.filterChange);
  }

  // Setup default values only once so that we can mount the component while waiting
  // for async actions to complete. We'll also save state in redux so that the component can be
  // unmounted and remounted and maintain state. This is useful for responsively rendering this
  // component while maintaining the selected filters. We also have to balance that
  // with loading the user's defaults, but only on the initial page load.
  setupDefaultValues(props) {
    const { skillsWasUpdated, gradeWasUpdated, qWasUpdated, bureauWasUpdated } = this.state;
    const { userProfile, defaultFilters } = props;

    // set default values for our filters
    const defaultGrade = defaultFilters.grade__code__in || userProfile.grade;
    const defaultBureau = defaultFilters.bureau__code__in || userProfile.bureau;
    const defaultQuery = defaultFilters.q;
    const defaultSkills = defaultFilters.skill__code__in || userProfile.skills;

    // set keyword to correct state
    if (!qWasUpdated && defaultQuery) {
      this.setState({
        q: defaultQuery, qWasUpdated: true,
      });
    }

    // set grade to correct state
    if (!gradeWasUpdated && userProfile.grade) {
      this.setState({
        defaultGrade, gradeWasUpdated: true,
      });
    }

    // set grade to correct state
    if (!bureauWasUpdated && defaultBureau) {
      this.setState({
        defaultBureau, bureauWasUpdated: true,
      });
    }

    // set skills to correct state
    if (!skillsWasUpdated && (userProfile.skills || defaultFilters.skill__code__in)) {
      const mappedDefaultSkills = defaultSkills.length ?
        // map the skills as either a string or an object property 'code'
        defaultSkills.slice().map(s => ({ code: s.code || s })) : [];
      this.setState({
        skill__code__in: mappedDefaultSkills,
      });
    }
  }

  formatQuery() {
    const { q, skill__code__in, bureau__code__in, grade__code__in } = this.state;
    const skills = skill__code__in.slice().map(s => s.code);
    const query = { q, skill__code__in: skills, bureau__code__in, grade__code__in };
    return query;
  }

  // return all the filters upon submission
  submitSearch(e) {
    // resolves “Form submission canceled because the form is not connected” warning
    e.preventDefault();
    const query = this.formatQuery();
    this.props.onSubmit(query);
  }

  // return all the filters as an object whenever any change is made
  filterChange() {
    const query = this.formatQuery();
    this.props.onFilterChange(query);
  }

  render() {
    const { placeholder, filters, userProfile, filtersIsLoading } = this.props;
    const { q, defaultGrade, defaultBureau, skill__code__in } = this.state;

    // format skill codes
    const skillCodes = (filters || []).find(f => f.item && f.item.description === 'skill');
    const skillCodesData = skillCodes ? skillCodes.data : [];

    // format grades
    const grades = (filters || []).find(f => f.item && f.item.description === 'grade');
    const mappedGrades = grades && grades.data ?
      grades.data.slice().map(g => ({ ...g, value: g.code, text: g.code })) : [];

    // format bureaus
    const bureaus = (filters || []).find(f => f.item && f.item.description === 'region');
    const mappedBureaus = bureaus && bureaus.data ?
      bureaus.data.slice().map(g => ({ ...g, value: g.code, text: g.short_description })) : [];

    // set the default skills
    // eslint-disable-next-line camelcase
    const defaultSkills = skill__code__in || userProfile.skills || [];
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
                      id="search-keyword-field"
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
                    <div className="search-sub-text">Example: Mexico City Mexico, Political Affairs (5505), Russian 3/3...</div>
                  </div>
                  <div className="usa-width-one-fourth search-results-inputs search-keyword">
                    <SkillCodeFilter
                      label="Skill Code"
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
                    />
                  </div>
                  <div className="usa-width-one-sixth search-results-inputs search-keyword">
                    <SelectForm
                      id="bureau-searchbar-filter"
                      label="Bureau"
                      options={mappedBureaus}
                      defaultSort={defaultBureau}
                      includeFirstEmptyOption
                      onSelectOption={this.onChangeBureau}
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
  defaultFilters: {},
  filtersIsLoading: false,
  placeholder: 'Location, Skill Code, Grade, Language, Position Number',
  userProfile: {},
  onFilterChange: EMPTY_FUNCTION,
};

export default ResultsMultiSearchHeader;
