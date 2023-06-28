import { useEffect, useRef, useState } from 'react';
import SelectForm from 'Components/SelectForm';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { EDIT_POSITION_DETAILS_PAGE_SIZES, EDIT_POSITION_DETAILS_SORT } from 'Constants/Sort';
import { editProjectedVacancyFetchDataErrored, saveProjectedVacancySelections } from 'actions/projectedVacancy';
import Spinner from 'Components/Spinner';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { get, sortBy, throttle, uniqBy } from 'lodash';
import { bureauPositionsFetchData, saveBureauUserSelections } from 'actions/bureauPositions';
import Picky from 'react-picky';
import { filtersFetchData } from 'actions/filters/filters';
import ScrollUpButton from '../../ScrollUpButton';
import PositionDetailsCard from '../../EditPositionDetails/PositionDetailsCard/PositionDetailsCard';

const ProjectedVacancySearch = () => {
  const childRef = useRef();
  const dispatch = useDispatch();

  const userSelections = useSelector(state => state.editProjectedVacancySelections);
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

  const [textInput, setTextInput] = useState(get(userSelections, 'textInput') || '');
  const [textSearch, setTextSearch] = useState(get(userSelections, 'textSearch') || '');

  const pageSizes = EDIT_POSITION_DETAILS_PAGE_SIZES;
  const sorts = EDIT_POSITION_DETAILS_SORT;
  const isLoading = genericFiltersIsLoading;

  const getQuery = () => ({
    limit,
    ordering,
    // User Filters
    [get(bureaus, 'item.SelectionRef')]: selectedBureaus.map(bureauObject => (get(bureauObject, 'code'))),
    [get(locations, 'item.SelectionRef')]: selectedLocations.map(postObject => (get(postObject, 'code'))),

    // Free Text
    q: textInput || textSearch,
  });

  const getCurrentInputs = () => ({
    limit,
    ordering,
    selectedBureaus,
    selectedLocations,
    textInput,
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
    const getSelected = item => !!selected.find(f => f.code === item.code);
    let queryProp = 'description';
    if (get(items, '[0].custom_description', false)) queryProp = 'custom_description';
    else if (get(items, '[0].long_description', false)) queryProp = 'long_description';
    return items.map(item =>
      (<ListItem
        key={item.code}
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
                <div className="label">Org:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select an Org"
                  value={selectedOrgs}
                  options={locationOptions}
                  onChange={setSelectedOrgs}
                  valueKey="code"
                  labelKey="custom_description"
                  disabled={isLoading}
                />
              </div>
              <div className="filter-div">
                <div className="label">Grade:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select a Grade"
                  value={selectedGrade}
                  options={locationOptions}
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
                  options={locationOptions}
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
                  options={locationOptions}
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
                  options={locationOptions}
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
