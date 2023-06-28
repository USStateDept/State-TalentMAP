import { useEffect, useRef, useState } from 'react';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import { editProjectedVacancyFetchDataErrored, saveProjectedVacancySelections } from 'actions/projectedVacancy';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { get, has, includes, sortBy, throttle, uniqBy } from 'lodash';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useDataLoader } from 'hooks';
import PropTypes from 'prop-types';
import { bureauPositionsFetchData, saveBureauUserSelections } from 'actions/bureauPositions';
import Picky from 'react-picky';
import { filtersFetchData } from 'actions/filters/filters';
import api from '../../../api';
import ScrollUpButton from '../../ScrollUpButton';
import PositionDetailsCard from '../../EditPositionDetails/PositionDetailsCard/PositionDetailsCard';

const ProjectedVacancySearch = () => {
  const childRef = useRef();
  const dispatch = useDispatch();


  const userSelections = useSelector(state => state.editProjectedVacancy);
  console.log('test', userSelections);
  const dummyPositionDetails = useSelector(state => state.editProjectedVacancy);
  console.log(dummyPositionDetails);
  const [limit, setLimit] = useState(get(userSelections, 'limit') || EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || EDIT_POSITION_DETAILS_SORT.defaultSort);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedBureaus, setSelectedBureaus] = useState(get(userSelections, 'selectedBureaus') || []);
  const [selectedOrgs, setSelectedOrgs] = useState(get(userSelections, 'selectedOrgs') || []);
  const [selectedGrade, setSelectedGrade] = useState(get(userSelections, 'selectedGrade') || []);
  const [selectedSkills, setSelectedSkills] = useState(get(userSelections, 'selectedSkills') || []);
  const [selectedLanguage, setSelectedLanguage] = useState(get(userSelections, 'selectedLanguage') || []);
  const [selectedBidCycle, setSelectedBidCycle] = useState(get(userSelections, 'selectedBidCycle') || []);
  const [selectedLocations, setSelectedLocations] = useState(get(userSelections, 'SelectedLocations') || []);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const locations = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const locationOptions = uniqBy(sortBy(get(locations, 'data'), [(p) => p.city]), 'code');
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const cycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const projectVacancyFiltersIsLoading =
  includes([orgsLoading], true);

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;
  const isLoading = genericFiltersIsLoading || projectVacancyFiltersIsLoading;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    [get(bureaus, 'item.SelectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(locations, 'item.SelectionRef')]: selectedLocations.map(postObject => (get(postObject, 'code'))),
    [get(bureaus, 'item.selectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(orgs, 'item.selectionRef')]: selectedOrgs.map(orgObject => (get(orgObject, 'code'))),
    [get(cycles, 'item.selectionRef')]: selectedBidCycle.map(cycleObject => (get(cycleObject, 'id'))),
    [get(languages, 'item.selectionRef')]: selectedLanguage.map(langObject => (get(langObject, 'code'))),
    [get(grades, 'item.selectionRef')]: selectedGrade.map(gradeObject => (get(gradeObject, 'code'))),
    [get(skills, 'item.selectionRef')]: selectedSkills.map(skillObject => (get(skillObject, 'code'))),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    selectedBureaus,
    selectedOrgs,
    selectedGrade,
    selectedLanguage,
    selectedSkills,
    textSearch,
  });

  useEffect(() => {
    dispatch(editProjectedVacancyFetchDataErrored(getQuery()));
    dispatch(saveProjectedVacancySelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);


  function submitSearch(text) {
    setTextSearch(text);
  }

  const throttledTextInput = () =>
    throttle(q => setTextInput(q), 300, { leading: false, trailing: true });

  const setTextInputThrottled = (q) => {
    throttledTextInput(q);
  };

  function renderSelectionList({ items, selected, ...rest }) {
    let codeOrText = 'code';
    // only Remarks needs to use 'text'
    if (has(items[0], 'text')) {
      codeOrText = 'text';
    }
    // only Item Actions/Statuses need to use 'desc_text'
    if (has(items[0], 'desc_text')) {
      codeOrText = 'desc_text';
    }
    if (has(items[0], 'abbr_desc_text') && items[0].code === 'V') {
      codeOrText = 'abbr_desc_text';
    }
    // only Categories need to use 'mic_desc_text'
    if (has(items[0], 'mic_desc_text')) {
      codeOrText = 'mic_desc_text';
    }
    const getSelected = item => !!selected.find(f => f[codeOrText] === item[codeOrText]);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (has(items[0], 'name')) queryProp = 'name';
    return items.map(item =>
      (<ListItem
        key={item[codeOrText]}
        item={item}
        {...rest}
        queryProp={queryProp}
        getIsSelected={getSelected}
      />),
    );
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const dummyid = get(dummyPositionDetails, 'id', '');

  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="edit-position-details-page">
          <div className="usa-grid-full edit-position-details-upper-section search-bar-container">
            <ProfileSectionTitle title="Projected Vacancy Search" icon="keyboard-o" />
            <PositionManagerSearch
              submitSearch={submitSearch}
              onChange={setTextInputThrottled}
              ref={childRef}
              textSearch={textSearch}
              label="Search for a Position"
              placeHolder="Search using Position Number or Position Title"
            />
            <div className="edit-position-details-filters">
              <div className="filter-div">
                <div className="label">Bureau:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  value={selectedBureaus}
                  options={bureausOptions}
                  onChange={setSelectedBureaus}
                  valueKey="code"
                  labelKey="long_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Organization:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select an Org"
                  value={selectedOrgs}
                  options={organizationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="code"
                  labelKey="name"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Grade:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select a Grade"
                  value={selectedGrade}
                  options={gradesOptions}
                  onChange={setSelectedGrade}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Skills:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Skill(s)"
                  value={selectedSkills}
                  options={skillsOptions}
                  onChange={setSelectedSkills}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Language:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select a Language"
                  value={selectedLanguage}
                  options={languagesOptions}
                  onChange={setSelectedLanguage}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Location:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Location(s)"
                  value={selectedLocations}
                  options={locationOptions}
                  onChange={setSelectedLocations}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Bid Cycle:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select a Bid Cycle"
                  value={selectedBidCycle}
                  options={cycleOptions}
                  onChange={setSelectedBidCycle}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          {
            <div className="edit-position-details-results-controls">
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
              />
              <SelectForm
                className="edit-position-details-results-select"
                id="edit-position-details-num-results"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={value => setLimit(value.target.value)}
              />
              <ScrollUpButton />
            </div>
          }
        </div>
        <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
          <div className="usa-grid-full position-list">
            {/* using this card for now, will need to create a new one for projected vacancies */}
            <PositionDetailsCard
              result={dummyPositionDetails}
              key={dummyid}
            />
          </div>
        </div>
      </>
  );
};


ProjectedVacancySearch.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
};

ProjectedVacancySearch.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
  bureauFilters: state.filters,
  bureauFiltersIsLoading: state.filtersIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: (query, bureauMenu) =>
    dispatch(bureauPositionsFetchData(query, bureauMenu)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  saveSelections: (selections) => dispatch(saveBureauUserSelections(selections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectedVacancySearch);
