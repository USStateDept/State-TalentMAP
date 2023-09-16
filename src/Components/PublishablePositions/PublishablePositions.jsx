/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { filter, flatten, get, has, includes, isEmpty, sortBy, uniqBy } from 'lodash';
import {
  publishablePositionsFetchData,
  publishablePositionsEdit,
  savePublishablePositionsSelections,
  publishablePositionsFiltersFetchData,
} from 'actions/publishablePositions';
import { PUBLISHABLE_POSITIONS_PAGE_SIZES, PUBLISHABLE_POSITIONS_SORT } from 'Constants/Sort';
import Alert from 'Components/Alert/Alert';
import Spinner from 'Components/Spinner';
import SelectForm from 'Components/SelectForm';
import ScrollUpButton from 'Components/ScrollUpButton';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { onEditModeSearch, renderSelectionList } from 'utilities';
import api from '../../api';
import PublishablePositionCard from '../PublishablePositionCard/PublishablePositionCard';

/* eslint-disable-next-line no-unused-vars */
const PublishablePositions = ({ viewType }) => {
  const dispatch = useDispatch();

  const dataHasErrored = useSelector(state => state.publishablePositionsHasErrored);
  const dataIsLoading = useSelector(state => state.publishablePositionsIsLoading);
  const data = useSelector(state => state.publishablePositions);
  const userSelections = useSelector(state => state.publishablePositionsSelections);
  const filtersHasErrored = useSelector(state => state.publishablePositionsFiltersHasErrored);
  const filtersIsLoading = useSelector(state => state.publishablePositionsFiltersIsLoading);
  const filters = useSelector(state => state.publishablePositionsFilters);

  /* eslint-disable no-console */



  const [selectedStatuses, setSelectedStatuses] = useState(userSelections?.selectedStatus || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedBidCycles, setSelectedBidCycles] =
    useState(userSelections?.selectedBidCycle || []);
  // const [limit, setLimit] = useState(get(userSelections, 'limit') || PUBLISHABLE_POSITIONS_PAGE_SIZES.defaultSize);
  // const [ordering, setOrdering] = useState(get(userSelections, 'ordering') || PUBLISHABLE_POSITIONS_SORT.defaultSort);

  const [clearFilters, setClearFilters] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);


  const statuses = filters?.statusFilters;
  const bureaus = filters?.bureauFilters;
  const orgs = filters?.orgFilters;
  const grades = filters?.gradeFilters;
  const skills = filters?.skillsFilters;
  const cycles = filters?.cycleFilters;
  const statusOptions = uniqBy(sortBy(statuses, [(f) => f.description]), 'code');
  const bureauAndSkillsOptions = uniqBy(sortBy(bureaus, [(f) => f.description]), 'description');
  const orgOptions = uniqBy(sortBy(orgs, [(f) => f.description]), 'code');
  const gradeOptions = uniqBy(grades, 'code');
  const cycleOptions = uniqBy(sortBy(cycles, [(f) => f.code]), 'code');

  // const pageSizes = PUBLISHABLE_POSITIONS_PAGE_SIZES;
  // const sorts = PUBLISHABLE_POSITIONS_SORT;
  // update:
  const disableSearch = cardsInEditMode.length > 0;
  // update to filters loading once pulled in
  const disableInput = dataIsLoading || disableSearch;

  const getQuery = () => ({
    'statuses': selectedStatuses.map(f => (f?.code)),
    'bureaus': selectedBureaus.map(f => (f?.description)),
    'orgs': selectedOrgs.map(f => (f?.code)),
    'grades': selectedGrades.map(f => (f?.code)),
    'skills': selectedSkills.map(f => (f?.description)),
    'bidCycles': selectedBidCycles.map(f => (f?.code)),
  });

  const getCurrentInputs = () => ({
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  });

  const fetchAndSet = () => {
    const numSelectedFilters = [
      selectedStatuses,
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
      selectedBidCycles,
    ].flat().length;

    setClearFilters(!!numSelectedFilters);

    if (numSelectedFilters > 1) {
      dispatch(publishablePositionsFetchData(getQuery()));
      dispatch(savePublishablePositionsSelections(getCurrentInputs()));
    }
  };

  const pickyProps = {
    numberDisplayed: 1,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 300,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setSelectedBidCycles([]);
    setClearFilters(false);
  };

  const getOverlay = () => {
    return false;
    // noinspection UnreachableCodeJS
    let overlay;
    if (dataIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (dataHasErrored) {
      overlay = <Alert type="error" title="Error displaying Publishable Positions" messages={[{ body: 'Please try again.' }]} />;
    } else if (data.length === 0) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'No positions for filter inputs.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };


  useEffect(() => {
    dispatch(publishablePositionsFiltersFetchData());
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
  }, []);

  useEffect(() => {
    fetchAndSet();
  }, [
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  ]);

  return (
    <div className="position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Publishable Positions" icon="newspaper-o" className="xl-icon" />
        {
          getOverlay() ||
          <div className="results-search-bar pt-20">
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <div className="filterby-clear">
                {
                  clearFilters &&
                  <button
                    className="unstyled-button"
                    onClick={resetFilters}
                    disabled={disableSearch}
                  >
                    <FA name="times" />
                    Clear Filters
                  </button>
                }
              </div>
            </div>
            <div className="usa-width-one-whole position-search--filters--pp results-dropdown">
            <div className="filter-div">
                <div className="label">Publishable Status:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Status(es)"
                  value={selectedStatuses}
                  onChange={setSelectedStatuses}
                  options={statusOptions}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Bid Cycle:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  value={selectedBidCycles}
                  onChange={setSelectedBidCycles}
                  options={cycleOptions}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Bureau:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bureau(s)"
                  value={selectedBureaus}
                  onChange={setSelectedBureaus}
                  options={bureauAndSkillsOptions}
                  valueKey="description"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Organization:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Organization(s)"
                  value={selectedOrgs}
                  onChange={setSelectedOrgs}
                  options={orgOptions}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Skills:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Skill(s)"
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                  options={bureauAndSkillsOptions}
                  valueKey="description"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
              <div className="filter-div">
                <div className="label">Grade:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Grade(s)"
                  value={selectedGrades}
                  onChange={setSelectedGrades}
                  options={gradeOptions}
                  valueKey="code"
                  labelKey="description"
                  disabled={disableInput}
                />
              </div>
            </div>
          </div>
        }
      </div>
        <div className="position-search-controls--results padding-top results-dropdown">
{/*          <SelectForm
            id="position-details-sort-results"
            options={sorts.options}
            label="Sort by:"
            defaultSort={ordering}
            onSelectOption={value => setOrdering(value.target.value)}
            disabled={disableSearch}
          />
          <SelectForm
            id="position-details-num-results"
            options={pageSizes.options}
            label="Results:"
            defaultSort={limit}
            onSelectOption={value => setLimit(value.target.value)}
            disabled={disableSearch}
          />*/}
          <ScrollUpButton />
        </div>
        {
          disableSearch &&
          <Alert
            type="warning"
            title={'Edit Mode (Search Disabled)'}
            messages={[{
              body: 'Discard or save your edits before searching. ' +
                'Filters and Pagination are disabled if any cards are in Edit Mode.',
            },
            ]}
          />
        }
        <div className="usa-width-one-whole position-search--results">
          <div className="usa-grid-full position-list">
{/*          <PublishablePositionCard
            data={dummyPositionDetails}
            cycles={cycles}
            onEditModeSearch={(editMode, id) =>
              onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)}
          />*/}
          </div>
        </div>
    </div>
  );
};

PublishablePositions.propTypes = {
  viewType: PropTypes.string.isRequired,
};

PublishablePositions.defaultProps = {
};

export default PublishablePositions;
