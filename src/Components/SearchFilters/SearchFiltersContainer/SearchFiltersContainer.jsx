import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, includes, indexOf, remove, sortBy } from 'lodash';
import ToggleButton from 'Components/ToggleButton';
import { FILTER_ITEMS_ARRAY, POST_DETAILS_ARRAY } from 'Constants/PropTypes';
import { COMMON_PROPERTIES, ENDPOINT_PARAMS } from 'Constants/EndpointParams';
import { checkFlag } from '../../../flags';
import MultiSelectFilterContainer from '../MultiSelectFilterContainer/MultiSelectFilterContainer';
import MultiSelectFilter from '../MultiSelectFilter/MultiSelectFilter';
import BooleanFilterContainer from '../BooleanFilterContainer/BooleanFilterContainer';
import SuggestionChoicePost from '../../AutoSuggest/SuggestionChoicePost';
import BureauFilter from '../BureauFilter';
import PostFilter from '../PostFilter';
import SkillFilter from '../SkillFilter';
import LanguageFilter from '../LanguageFilter';
import ProjectedVacancyFilter from '../ProjectedVacancyFilter';
import TandemSelectionFilter from '../TandemSelectionFilter';
import { getPostName, mapDuplicates, propOrDefault, propSort, sortGrades, sortTods } from '../../../utilities';
import { colorBlueChill } from '../../../sass/sass-vars/variables';

const useBidding = () => checkFlag('flags.bidding');
const usePostIndicators = () => checkFlag('flags.indicators');
const useTandem = () => checkFlag('flags.tandem');
const useUS = () => checkFlag('flags.us_codes');

class SearchFiltersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTandem2: false,
    };
  }

  onMissionSuggestionSelected = value => {
    this.props.queryParamToggle(ENDPOINT_PARAMS.mission, value);
  };

  onPostSuggestionSelected = value => {
    this.props.queryParamToggle(ENDPOINT_PARAMS.post, value);
  };

  onBooleanFilterClick(isChecked, code, selectionRef) {
    const object = Object.assign({});
    object[selectionRef] = isChecked ? code : '';
    this.props.queryParamUpdate(object);
  }

  // Some filters aren't compatible with projected vs non-projected,
  // so we reset any of those here.
  onProjectedVacancyFilterClick = value => {
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
        projectedVacancy: value,
        ordering: 'ted',
        cps_codes: null,
        htf_indicator: null,
      };
    }
    this.props.queryParamUpdate(config);
  };

  onTandemSearchClick = value => {
    const { isProjectedVacancy } = this.context;
    let config = {};
    if (!value) {
      config = {
        ...config,
        tandem: null,
      };
    } else {
      config = {
        ...config,
        ordering: isProjectedVacancy ? 'ted' : '-posted_date',
        tandem: 'tandem',
      };
      this.setState({ showTandem2: false }); // reset showTandem2 to false
    }
    this.props.queryParamUpdate(config);
  }

  onTandemSelectionClick = value => {
    if (value !== this.state.showTandem2) {
      this.setState({ showTandem2: value === '2' });
    }
  }

  render() {
    const { isProjectedVacancy, isTandemSearch } = this.context;
    const { fetchPostAutocomplete, postSearchResults, filters } = this.props;
    const { showTandem2 } = this.state;

    const filters$ = filters
      .filter((f) => {
        if (isProjectedVacancy) {
          return get(f, 'item.onlyProjectedVacancy') || !get(f, 'item.onlyAvailablePositions');
        }
        return get(f, 'item.onlyAvailablePositions') || !get(f, 'item.onlyProjectedVacancy');
      });

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
    filters$
      .forEach((searchFilter) => {
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
    const multiSelectFilterNames = ['bidSeason', 'bidCycle', 'skill', 'grade', 'region', 'tod', 'language',
      'postDiff', 'dangerPay', 'postIndicators', 'unaccompaniedStatus', 'handshake', 'hardToFill'];


    const multiSelectFilterNamesTandemCommon = ['post', 'postDiff', 'dangerPay', 'postIndicators', 'unaccompaniedStatus'];
    const multiSelectFilterNamesTandem1 = ['bidSeason', 'bidCycle', 'skill', 'grade', 'region', 'tod', 'language', 'handshake',
      'hardToFill'];
    const multiSelectFilterNamesTandem2 = ['bidSeason-tandem', 'bidCycle-tandem', 'skill-tandem', 'grade-tandem',
      'region-tandem', 'tod-tandem', 'language-tandem', 'handshake-tandem', 'hardToFill-tandem'];

    if (!usePostIndicators()) {
      remove(multiSelectFilterNames, f => f === 'postIndicators');
      remove(multiSelectFilterNamesTandemCommon, f => f === 'postIndicators');
    }

    if (!useUS()) {
      remove(multiSelectFilterNames, f => f === 'unaccompaniedStatus');
      remove(multiSelectFilterNamesTandemCommon, f => f === 'unaccompaniedStatus');
    }

    const blackList = []; // don't create accordions for these

    // START TOGGLE FILTERS
    // Get our boolean filter names.
    // We use the "description" property because these are less likely
    // to change (they're not UI elements).
    const sortedToggleNames = ['projectedVacancy', 'tandem-toggle'];

    // store filters in Map
    const toggleFiltersMap = new Map();
    filters$.forEach((searchFilter) => {
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
    const tandemFilter = sortedToggleNames.length ?
      get(toggleFiltersMap.get('tandem-toggle'), 'data') : null;
    const tandemIsSelected = tandemFilter ? get(tandemFilter.find(f => f.code === 'tandem'), 'isSelected') : false;

    // post should come before TOD
    multiSelectFilterNames.splice(indexOf(multiSelectFilterNames, 'tod'), 0, 'post');
    // END TOGGLE FILTERS

    // create map
    const multiSelectFilterMap = new Map();
    const multiSelectFilterMapTandemCommon = new Map();
    const multiSelectFilterMapTandem1 = new Map();
    const multiSelectFilterMapTandem2 = new Map();

    // pull filters from props and add to Map
    filters$.slice().forEach((f) => {
      [
        [multiSelectFilterNames, multiSelectFilterMap],
        [multiSelectFilterNamesTandemCommon, multiSelectFilterMapTandemCommon],
        [multiSelectFilterNamesTandem1, multiSelectFilterMapTandem1],
        [multiSelectFilterNamesTandem2, multiSelectFilterMapTandem2, '-tandem'],
      ]
        .forEach(arr => {
          const suffix = arr[2] || '';
          if (arr[0].indexOf(get(f, 'item.description')) > -1) {
            // extra handling for skill
            if (get(f, 'item.description') === `skill${suffix}` && get(f, 'data')) {
              get(f, 'data', []).sort(propSort('description'));
            } else if (get(f, 'item.description') === `grade${suffix}` && get(f, 'data')) {
              get(f, 'data', []).sort(sortGrades);
            } else if (get(f, 'item.description') === `language${suffix}` && get(f, 'data')) {
              // Push the "NONE" code choice to the bottom. We're already sorting
              // data, and this is readable, so the next line is eslint-disabled.
              // eslint-disable-next-line
              f.data = sortBy(f.data, item => item.code === COMMON_PROPERTIES.NULL_LANGUAGE ? -1 : 0);
            } else if (get(f, 'item.description') === `tod${suffix}` && f.data) {
              // eslint-disable-next-line no-param-reassign
              f.data = sortTods(get(f, 'data') || []);
            }
            // add to Map
            arr[1].set(get(f, 'item.description'), f);
          }
        });
    });
    // special handling for functional bureau
    const functionalBureaus = filters$.slice().find(f => get(f, 'item.description') === 'functionalRegion');
    const functionalBureausTandem = filters$.slice().find(f => get(f, 'item.description') === 'functionalRegion-tandem');

    // special handling for is_domestic filter
    const domesticFilter = (filters$ || []).find(f => get(f, 'item.description') === 'domestic');
    const overseasFilterData = propOrDefault(domesticFilter, 'data', []).find(d => get(d, 'code') === 'false');
    const domesticFilterData = propOrDefault(domesticFilter, 'data', []).find(d => get(d, 'code') === 'true');
    const overseasIsSelected = propOrDefault(overseasFilterData, 'isSelected', false);
    const domesticIsSelected = propOrDefault(domesticFilterData, 'isSelected', false);

    // commuter posts
    const commuterPosts = (filters$ || []).find(f => get(f, 'item.description') === 'commuterPosts');

    // get skill cones
    const skillCones = (filters$ || []).find(f => get(f, 'item.description') === 'skillCone');

    // get language groups
    const languageGroups = (filters$ || []).find(f => get(f, 'item.description') === 'languageGroup');

    // adding filters based on multiSelectFilterNames
    const sortedFilters = [];
    const sortedFiltersTandemCommon = [];
    const sortedFiltersTandem1 = [];
    const sortedFiltersTandem2 = [];

    [...multiSelectFilterNames, ...multiSelectFilterNamesTandem2].forEach((n) => {
      let item = multiSelectFilterMap.get(n);
      if (multiSelectFilterMapTandem2.get(n)) item = multiSelectFilterMapTandem2.get(n);
      // let some variables that will change based on whether n is a post or mission
      let getSuggestions;
      let suggestions;
      let placeholder;
      let onSuggestionSelected;
      let displayProperty;
      let suggestionTemplate; // AutoSuggest will use default template if this stays undefined
      if (n === 'post') {
        getSuggestions = fetchPostAutocomplete;
        suggestions = mapDuplicates(postSearchResults.map(m => (
          { ...m, location$: `${m.location.country}-${m.location.city}-${m.location.state}` }
        )), 'location$');
        placeholder = 'Start typing a location';
        onSuggestionSelected = this.onPostSuggestionSelected;
        displayProperty = getPostName;
        suggestionTemplate = SuggestionChoicePost; // special template for posts
      }

      const getFilter = (type) => {
        switch (type) {
          case 'region-tandem':
          case 'region':
            return (
              <BureauFilter
                item={item}
                isTandem={type === 'region-tandem'}
                functionalBureaus={type === 'region-tandem' ?
                  functionalBureausTandem : functionalBureaus}
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
                commuterPosts={commuterPosts}
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
                  label: 'Search locations',
                  labelSrOnly: false,
                }}
              />
            );
          case 'skill':
          case 'skill-tandem':
            return (
              <SkillFilter
                item={item}
                queryParamToggle={this.props.queryParamToggle}
                queryParamUpdate={this.props.queryParamUpdate}
                skillCones={skillCones}
              />
            );
          case 'language':
          case 'language-tandem':
            return (
              <LanguageFilter
                item={item}
                isTandem={type === 'language-tandem'}
                queryParamToggle={this.props.queryParamToggle}
                queryParamUpdate={this.props.queryParamUpdate}
                languageGroups={languageGroups}
              />
            );
          case includes(blackList, type) ? type : null:
            return null;
          default: {
            const getQueryProperty = () => {
              if (includes(['post', 'bidCycle', 'bidSeason', 'bidCycle-tandem', 'bidSeason-tandem'], type)) {
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
                  groupAlpha={type === 'skill' || type === 'skill-tandem'}
                />
              </div>
            );
          }
        }
      };
      if (item && !includes(blackList, n)) {
        const isTandem1 = includes(multiSelectFilterNamesTandem1, n);
        const isTandem2 = includes(multiSelectFilterNamesTandem2, n);
        const isTandemCommon$ = includes(multiSelectFilterNamesTandemCommon, n);
        const isPrimary = includes(multiSelectFilterNames, n);
        let accordionClass = isProjectedVacancy ? ' accordion-pv' : 'accordion-ap';
        if (isTandemSearch && !isTandemCommon$) {
          accordionClass = isTandem1 ? ' accordion-tandem-1' : ' accordion-tandem-2';
        }
        const obj = { content: getFilter(n),
          title: get(item, 'item.title'),
          altTitle: get(item, 'item.altTitle'),
          id: `accordion-${get(item, 'item.title', '')}-${isTandem2 ? '-tandem' : ''}`,
          isTandem: get(item, 'item.isTandem'),
          buttonClass: accordionClass,
        };
        if (isTandem1) {
          sortedFiltersTandem1.push(obj);
        }
        if (isTandem2) {
          sortedFiltersTandem2.push(obj);
        }
        if (isTandemCommon$) {
          sortedFiltersTandemCommon.push(obj);
        }
        if (isPrimary) {
          sortedFilters.push(obj);
        }
      }
    });

    const apContainerClass = 'ap-container';
    const commonContainerClass = tandemIsSelected ? 'tandem-common-filters' : '';
    const tandemUserClass = showTandem2 ? 'tandem-2-filters' : 'tandem-1-filters';

    return (
      <div className={apContainerClass}>
        {
          tandemIsSelected &&
          <div className="tandem-filter-header tandem-filter-header--first">Tandem Filters</div>
        }
        {
          projectedVacancyFilter &&
          <div className={commonContainerClass}>
            <ProjectedVacancyFilter
              items={projectedVacancyFilter}
              onChange={this.onProjectedVacancyFilterClick}
            />
          </div>
        }
        {
          <div className={commonContainerClass}>
            <MultiSelectFilterContainer
              multiSelectFilterList={tandemIsSelected ? sortedFiltersTandemCommon : sortedFilters}
              queryParamToggle={this.props.queryParamToggle}
            />
          </div>
        }
        <div>
          {
            tandemIsSelected &&
            <div className="tandem-filter-header">Individual Filters</div>
          }
          {
            tandemIsSelected &&
            <div className={tandemUserClass}>
              <TandemSelectionFilter onChange={this.onTandemSelectionClick} />
            </div>
          }
          {
            tandemIsSelected && !showTandem2 &&
              <MultiSelectFilterContainer
                multiSelectFilterList={sortedFiltersTandem1}
                queryParamToggle={this.props.queryParamToggle}
              />
          }
          {
            tandemIsSelected && showTandem2 &&
              <MultiSelectFilterContainer
                multiSelectFilterList={sortedFiltersTandem2}
                queryParamToggle={this.props.queryParamToggle}
              />
          }
        </div>
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
        <div className="tandem-toggle-button-container">
          {
            useTandem() &&
            <ToggleButton
              labelTextRight="Tandem Search"
              checked={tandemIsSelected}
              onChange={this.onTandemSearchClick}
              onColor={colorBlueChill}
            />
          }
        </div>
      </div>
    );
  }
}

SearchFiltersContainer.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
  isTandemSearch: PropTypes.bool,
};

SearchFiltersContainer.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: POST_DETAILS_ARRAY.isRequired,
};

export default SearchFiltersContainer;
