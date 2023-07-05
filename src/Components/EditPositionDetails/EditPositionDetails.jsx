import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filter, flatten, get, has, includes, isEmpty, sortBy, throttle, uniqBy } from 'lodash';

import { useDataLoader } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import { editPositionDetailsFetchData, saveEditPositionDetailsSelections } from 'actions/editPositionDetails';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import Spinner from 'Components/Spinner';
import SelectForm from 'Components/SelectForm';
import ScrollUpButton from 'Components/ScrollUpButton';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import api from '../../api';
import PositionDetailsCard from '../EditPositionDetails/PositionDetailsCard/PositionDetailsCard';

const EditPositionDetails = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.editPositionDetailsSelections);
  const dummyPositionDetails = useSelector(state => state.editPositionDetails);

  const [limit, setLimit] = useState(get(userSelections, 'limit') || EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || EDIT_POSITION_DETAILS_SORT.defaultSort);

  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [selectedStatus, setSelectedStatus] = useState(userSelections?.selectedStatus || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrade, setSelectedGrade] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedLanguage, setSelectedLanguage] = useState(userSelections?.selectedLanguage || []);
  const [selectedPost, setSelectedPost] = useState(userSelections?.selectedPost || []);
  const [selectedBidCycle, setSelectedBidCycle] = useState(userSelections?.selectedBidCycle || []);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const statuses = genericFilters$.find(f => get(f, 'item.description') === 'publishable_status');
  const statusOptions = uniqBy(sortBy(get(statuses, 'data'), [(b) => b.status]));
  const bureaus = genericFilters$.find(f => get(f, 'item.description') === 'region');
  const bureausOptions = uniqBy(sortBy(get(bureaus, 'data'), [(b) => b.short_description]));
  const grades = genericFilters$.find(f => get(f, 'item.description') === 'grade');
  const gradesOptions = uniqBy(get(grades, 'data'), 'code');
  const skills = genericFilters$.find(f => get(f, 'item.description') === 'skill');
  const skillsOptions = uniqBy(sortBy(get(skills, 'data'), [(s) => s.description]), 'code');
  const languages = genericFilters$.find(f => get(f, 'item.description') === 'language');
  const languagesOptions = uniqBy(sortBy(get(languages, 'data'), [(c) => c.custom_description]), 'custom_description');
  const post = genericFilters$.find(f => get(f, 'item.description') === 'post');
  const locationOptions = uniqBy(sortBy(get(post, 'data'), [(p) => p.city]), 'code');
  const cycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const cycleOptions = uniqBy(sortBy(get(cycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const additionalFiltersIsLoading = includes([orgsLoading], true);

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const [clearFilters, setClearFilters] = useState(false);

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;
  const isLoading = genericFiltersIsLoading || additionalFiltersIsLoading;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    'position-details-status': selectedStatus.map(bureauObject => (bureauObject?.code)),
    'position-details-bureaus': selectedBureaus.map(bureauObject => (bureauObject?.code)),
    'position-details-orgs': selectedOrgs.map(orgObject => (orgObject?.code)),
    'position-details-grades': selectedGrade.map(gradeObject => (gradeObject?.code)),
    'position-details-skills': selectedSkills.map(skillObject => (skillObject?.code)),
    'position-details-language': selectedLanguage.map(langObject => (langObject?.code)),
    'position-details-post': selectedPost.map(postObject => (postObject?.code)),
    'position-details-cycles': selectedBidCycle.map(cycleObject => (cycleObject?.id)),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    selectedStatus,
    selectedBureaus,
    selectedOrgs,
    selectedGrade,
    selectedSkills,
    selectedLanguage,
    selectedPost,
    selectedBidCycle,
    textSearch,
  });

  useEffect(() => {
    dispatch(saveEditPositionDetailsSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const fetchAndSet = () => {
    const filters = [
      selectedStatus,
      selectedBureaus,
      selectedOrgs,
      selectedGrade,
      selectedSkills,
      selectedLanguage,
      selectedPost,
      selectedBidCycle,
      textSearch,
    ];
    if (isEmpty(filter(flatten(filters))) && isEmpty(textSearch)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(editPositionDetailsFetchData(getQuery()));
    dispatch(saveEditPositionDetailsSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    limit,
    ordering,
    selectedStatus,
    selectedBureaus,
    selectedOrgs,
    selectedGrade,
    selectedSkills,
    selectedLanguage,
    selectedPost,
    selectedBidCycle,
    textSearch,
  ]);

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
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    else if (codeOrText === 'text') queryProp = 'text';
    else if (codeOrText === 'desc_text') queryProp = 'desc_text';
    else if (codeOrText === 'abbr_desc_text') queryProp = 'abbr_desc_text';
    else if (codeOrText === 'mic_desc_text') queryProp = 'mic_desc_text';
    else if (has(items[0], 'name')) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  }

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const resetFilters = () => {
    setSelectedStatus([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrade([]);
    setSelectedSkills([]);
    setSelectedLanguage([]);
    setSelectedPost([]);
    setSelectedBidCycle([]);
    setTextSearch('');
    setTextInput('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const dummyid = get(dummyPositionDetails, 'id', '');
  return (
    isLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <div className="bureau-page edit-position-details-page">
          <div className="usa-grid-full position-manager-upper-section">
            <div className="results-search-bar">
              <div className="usa-grid-full search-bar-container">
                <ProfileSectionTitle title="Position Details" icon="keyboard-o" />
                <PositionManagerSearch
                  submitSearch={submitSearch}
                  onChange={setTextInputThrottled}
                  ref={childRef}
                  textSearch={textSearch}
                  label="Search for a Position"
                  placeHolder="Search using Position Number or Position Title"
                />
                <div className="filterby-container">
                  <div className="filterby-label">Filter by:</div>
                  <div className="filterby-clear">
                    {clearFilters &&
                      <button className="unstyled-button" onClick={resetFilters}>
                        <FA name="times" />
                        Clear Filters
                      </button>
                    }
                  </div>
                </div>
                <div className="usa-width-one-whole position-manager-filters results-dropdown">
                  <div className="filter-div">
                    <div className="label">Publishable Status:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Status(es)"
                      value={selectedStatus}
                      options={statusOptions}
                      onChange={setSelectedStatus}
                      valueKey="code"
                      labelKey="publishable_status"
                      disabled={isLoading}
                    />
                  </div>
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
                      value={selectedPost}
                      options={locationOptions}
                      onChange={setSelectedPost}
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
                      valueKey="id"
                      labelKey="name"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            <div className="bureau-results-controls results-dropdown">
              <SelectForm
                className="results-select"
                id="edit-position-details-results-sort"
                options={sorts.options}
                label="Sort by:"
                defaultSort={ordering}
                onSelectOption={value => setOrdering(value.target.value)}
              />
              <SelectForm
                className="results-select"
                id="edit-position-details-num-results"
                options={pageSizes.options}
                label="Results:"
                defaultSort={limit}
                onSelectOption={value => setLimit(value.target.value)}
              />
              <ScrollUpButton />
            </div>
          }
          <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
            <div className="usa-grid-full position-list">
              <PositionDetailsCard
                result={dummyPositionDetails}
                key={dummyid}
              />
            </div>
          </div>
        </div>
      </>
  );
};

EditPositionDetails.propTypes = {
};

EditPositionDetails.defaultProps = {
};

export default EditPositionDetails;
