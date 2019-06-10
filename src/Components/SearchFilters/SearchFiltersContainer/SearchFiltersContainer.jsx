import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, includes, indexOf, sortBy } from 'lodash';
import { checkFlag } from '../../../flags';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import SuggestionChoicePost from '../../AutoSuggest/SuggestionChoicePost';
import BureauFilter from '../BureauFilter';
import PostFilter from '../PostFilter';
import SkillFilter from '../SkillFilter';
import ProjectedVacancyFilter from '../ProjectedVacancyFilter';
import { FILTER_ITEMS_ARRAY, POST_DETAILS_ARRAY } from '../../../Constants/PropTypes';
import { propSort, sortGrades, getPostName, propOrDefault } from '../../../utilities';
import { ENDPOINT_PARAMS, COMMON_PROPERTIES } from '../../../Constants/EndpointParams';

const useBidding = () => checkFlag('flags.bidding');
const usePV = () => checkFlag('flags.projected_vacancy');

class SearchFiltersContainer extends Component {

  constructor(props) {
    super(props);
    this.onMissionSuggestionSelected = this.onMissionSuggestionSelected.bind(this);
    this.onPostSuggestionSelected = this.onPostSuggestionSelected.bind(this);
    this.onProjectedVacancyFilterClick = this.onProjectedVacancyFilterClick.bind(this);
  }

  onMissionSuggestionSelected(value) {
    this.props.queryParamToggle(ENDPOINT_PARAMS.mission, value);
  }

  onPostSuggestionSelected(value) {
    this.props.queryParamToggle(ENDPOINT_PARAMS.post, value);
  }

  onBooleanFilterClick(isChecked, code, selectionRef) {
    const object = Object.assign({});
    object[selectionRef] = isChecked ? code : '';
    this.props.queryParamUpdate(object);
  }

  // Some filters aren't compatible with projected vs non-projected,
  // so we reset any of those here.
  onProjectedVacancyFilterClick(value) {
    let config = {};
    if (value === 'open') {
      config = {
        ...config,
        is_available_in_bidseason: null,
        projectedVacancy: null,
      };
    } else {
      config = {
        ...config,
        is_available_in_bidcycle: null,
        is_available_in_current_bidcycle: null,
        is_domestic: null,
        position__post__in: null,
        projectedVacancy: value,
      };
    }
    this.props.queryParamUpdate(config);
  }

  render() {
    const { isProjectedVacancy } = this.context;
    const { fetchPostAutocomplete, postSearchResults } = this.props;

    // Get our boolean filter names.
    // We use the "description" property because these are less likely
    // to change (they're not UI elements).
    const sortedBooleanNames = [];
    // show the 'Available' filter,
    // but only if flags.bidding === true
    if (useBidding() && !isProjectedVacancy) {
      sortedBooleanNames.push('available');
    }

    // store filters in Map
    const booleanFiltersMap = new Map();
    this.props.filters.forEach((searchFilter) => {
      if (searchFilter.item.bool) {
        booleanFiltersMap.set(searchFilter.item.description, searchFilter);
      }
    });

    // sort boolean filters by sortedBooleanNames
    // pull from Map
    const booleanFilters = [];
    sortedBooleanNames.forEach((b) => {
      const filter = booleanFiltersMap.get(b);
      if (filter) {
        booleanFilters.push(filter);
      }
    });

    // get our normal multi-select filters
    const multiSelectFilterNames = ['skill', 'grade', 'region', 'tod', 'language',
      'postDiff', 'dangerPay'];
    const blackList = []; // don't create accordions for these

    // START TOGGLE FILTERS
    // Get our boolean filter names.
    // We use the "description" property because these are less likely
    // to change (they're not UI elements).
    const sortedToggleNames = [];
    // show the 'Available' filter,
    // but only if flags.bidding === true
    if (usePV()) {
      sortedToggleNames.push('projectedVacancy');
    }

    // store filters in Map
    const toggleFiltersMap = new Map();
    this.props.filters.forEach((searchFilter) => {
      if (searchFilter.item.isToggle) {
        toggleFiltersMap.set(searchFilter.item.description, searchFilter);
      }
    });

    // sort boolean filters by sortedBooleanNames
    // pull from Map
    const toggleFilters = [];
    sortedToggleNames.forEach((b) => {
      const filter = toggleFiltersMap.get(b);
      if (filter) {
        toggleFilters.push(filter);
      }
    });

    const projectedVacancyFilter = sortedToggleNames.length ?
      get(toggleFiltersMap.get('projectedVacancy'), 'data') : null;

    if (isProjectedVacancy) {
      multiSelectFilterNames.unshift('bidSeason');
    } else {
      multiSelectFilterNames.unshift('bidCycle');
      // post should come before TOD
      multiSelectFilterNames.splice(indexOf(multiSelectFilterNames, 'tod'), 0, 'post');
    }
    // END TOGGLE FILTERS

    // create map
    const multiSelectFilterMap = new Map();

    // pull filters from props and add to Map
    this.props.filters.slice().forEach((f) => {
      if (multiSelectFilterNames.indexOf(f.item.description) > -1) {
        // extra handling for skill
        if (f.item.description === 'skill' && f.data) {
          f.data.sort(propSort('description'));
        } else if (f.item.description === 'grade' && f.data) {
          f.data.sort(sortGrades);
        } else if (f.item.description === 'language' && f.data) {
          f.data.sort(propSort('custom_description'));
          // Push the "NONE" code choice to the bottom. We're already sorting
          // data, and this is readable, so the next line is eslint-disabled.
          // eslint-disable-next-line
          f.data = sortBy(f.data, item => item.code === COMMON_PROPERTIES.NULL_LANGUAGE ? -1 : 0);
        }
        // add to Map
        multiSelectFilterMap.set(f.item.description, f);
      }
    });

    // special handling for functional bureau
    const functionalBureaus = this.props.filters.slice().find(f => f.item.description === 'functionalRegion');

    // special handling for is_domestic filter
    const domesticFilter = (this.props.filters || []).find(f => f.item.description === 'domestic');
    const overseasFilterData = propOrDefault(domesticFilter, 'data', []).find(d => d.code === 'false');
    const domesticFilterData = propOrDefault(domesticFilter, 'data', []).find(d => d.code === 'true');
    const overseasIsSelected = propOrDefault(overseasFilterData, 'isSelected', false);
    const domesticIsSelected = propOrDefault(domesticFilterData, 'isSelected', false);

    // get skill cones
    const skillCones = (this.props.filters || []).find(f => f.item.description === 'skillCone');

    // adding filters based on multiSelectFilterNames
    const sortedFilters = [];
    multiSelectFilterNames.forEach((n) => {
      const item = multiSelectFilterMap.get(n);
      // let some variables that will change based on whether n is a post or mission
      let getSuggestions;
      let suggestions;
      let placeholder;
      let onSuggestionSelected;
      let displayProperty;
      let suggestionTemplate; // AutoSuggest will use default template if this stays undefined
      if (n === 'post') {
        getSuggestions = fetchPostAutocomplete;
        suggestions = postSearchResults;
        placeholder = 'Start typing a post';
        onSuggestionSelected = this.onPostSuggestionSelected;
        displayProperty = getPostName;
        suggestionTemplate = SuggestionChoicePost; // special template for posts
      }

      const getFilter = (type) => {
        switch (type) {
          case 'region':
            return (
              <BureauFilter
                item={item}
                functionalBureaus={functionalBureaus}
                queryParamToggle={this.props.queryParamToggle}
              />
            );
          case 'post':
            return (
              <PostFilter
                item={item}
                queryParamToggle={this.props.queryParamToggle}
                queryParamUpdate={this.props.queryParamUpdate}
                overseasIsSelected={overseasIsSelected}
                domesticIsSelected={domesticIsSelected}
                autoSuggestProps={{
                  getSuggestions,
                  suggestions,
                  placeholder,
                  onSuggestionSelected,
                  queryProperty: 'id',
                  displayProperty,
                  suggestionTemplate,
                  id: `${type}-autosuggest-container`,
                  inputId: `${type}-autosuggest-input`,
                  label: 'Search posts',
                  labelSrOnly: false,
                }}
              />
            );
          case 'skill':
            return (
              <SkillFilter
                item={item}
                queryParamToggle={this.props.queryParamToggle}
                queryParamUpdate={this.props.queryParamUpdate}
                skillCones={skillCones}
              />
            );
          case 'language':
            return (
              <div className="usa-grid-full">
                <MultiSelectFilter
                  key={item.item.title}
                  item={item}
                  queryParamToggle={this.props.queryParamToggle}
                  queryProperty="code"
                />
              </div>
            );
          case includes(blackList, type) ? type : null:
            return null;
          default: {
            const getQueryProperty = () => {
              if (type === 'post' || type === 'bidCycle' || type === 'bidSeason') {
                return '_id';
              }
              return 'code';
            };
            const queryProperty = getQueryProperty();
            return (
              <div className="usa-grid-full">
                <MultiSelectFilter
                  key={item.item.title}
                  item={item}
                  queryParamToggle={this.props.queryParamToggle}
                  queryProperty={queryProperty}
                  groupAlpha={type === 'skill'}
                />
              </div>
            );
          }
        }
      };

      if (item && !includes(blackList, n)) {
        sortedFilters.push(
          { content: getFilter(n),
            title: item.item.title,
            id: `accordion-${item.item.title}`,
          },
        );
      }
    });

    return (
      <div>
        {
          projectedVacancyFilter &&
          <ProjectedVacancyFilter
            items={projectedVacancyFilter}
            onChange={this.onProjectedVacancyFilterClick}
          />
        }
        <MultiSelectFilterContainer
          multiSelectFilterList={sortedFilters}
          queryParamToggle={this.props.queryParamToggle}
        />
        <div className="boolean-filter-container">
          <BooleanFilterContainer
            legendTitle="Select filters"
            filters={booleanFilters}
            onBooleanFilterClick={(e, code, ref, iterator, value) => {
              get(booleanFilters, `[${iterator}].data[0]`, {}).isSelected = !value;
              this.onBooleanFilterClick(e, code, ref);
            }
            }
          />
        </div>
      </div>
    );
  }
}

SearchFiltersContainer.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
};

SearchFiltersContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: POST_DETAILS_ARRAY.isRequired,
};

export default SearchFiltersContainer;
