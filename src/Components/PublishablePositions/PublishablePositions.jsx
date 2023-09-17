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
import { renderSelectionList } from 'utilities';
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
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');
  console.log('🐙 current: userSelections:', userSelections);
  console.log('🐙 current: dataHasErrored:', dataHasErrored);
  console.log('🐙🐙🐙🐙🐙🐙🐙🐙🐙🐙');
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
  const [editMode, setEditMode] = useState(false);


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

  const numSelectedFilters = [
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  ].flat().length;
  const fetchAndSet = () => {
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
    let overlay;
    if (dataIsLoading || filtersIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (dataHasErrored || filtersHasErrored) {
      overlay = <Alert type="error" title="Error displaying Publishable Positions" messages={[{ body: 'Please try again.' }]} />;
    } else if (numSelectedFilters < 2) {
      overlay = <Alert type="info" title="Select Filters" messages={[{ body: 'Please select at least 2 filters to search.' }]} />;
    } else if (!data.length) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'No positions for filter inputs.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const submitEdit = (editData) => {
    dispatch(publishablePositionsEdit(getQuery(), editData));
  };

  useEffect(() => {
    /* eslint-disable no-console */
    console.log('🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥️');
    console.log('🐥 current: in initial:');
    console.log('🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥️');

    dispatch(publishablePositionsFiltersFetchData());
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
  }, []);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log('🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥️');
    console.log('🐥 current: in fetchAndSet:');
    console.log('🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥️');
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
        <div className="results-search-bar pt-20">
            <div className="filterby-container">
              <div className="filterby-label">Filter by:</div>
              <div className="filterby-clear">
                {
                  clearFilters &&
                  <button
                    className="unstyled-button"
                    onClick={resetFilters}
                    disabled={editMode}
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
                  disabled={editMode}
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
                  disabled={editMode}
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
                  disabled={editMode}
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
                  disabled={editMode}
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
                  disabled={editMode}
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
                  disabled={editMode}
                />
              </div>
            </div>
          </div>
      </div>
      {
        getOverlay() ||
        <>
          <div className="position-search-controls--results padding-top results-dropdown">
            <ScrollUpButton/>
          </div>
          {
            editMode &&
            <Alert
              type="warning"
              title={'Edit Mode (Search Disabled)'}
              messages={[{
                body: 'Filters are disabled while in Edit Mode. ' +
                  'Discard or save your edits to enable searching. ',
              },
              ]}
            />
          }
          <div className="usa-width-one-whole position-search--results">
            <div className="usa-grid-full position-list">
              {
                data.map(pubPos => (
                  <PublishablePositionCard
                    data={pubPos}
                    onEditModeSearch={editState =>
                      setEditMode(editState)}
                    disableEdit={editMode}
                    onSubmit={editData => submitEdit(editData)}
                  />
                ))
              }
            </div>
          </div>
        </>
      }
    </div>
  );
};

PublishablePositions.propTypes = {
  viewType: PropTypes.string.isRequired,
};

PublishablePositions.defaultProps = {
};

export default PublishablePositions;
