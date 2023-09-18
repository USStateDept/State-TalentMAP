import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { sortBy, uniqBy } from 'lodash';
import {
  publishablePositionsEdit,
  publishablePositionsFetchData,
  publishablePositionsFiltersFetchData,
  savePublishablePositionsSelections,
} from 'actions/publishablePositions';
import Alert from 'Components/Alert/Alert';
import Spinner from 'Components/Spinner';
import ScrollUpButton from 'Components/ScrollUpButton';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { renderSelectionList } from 'utilities';
import PublishablePositionCard from '../PublishablePositionCard/PublishablePositionCard';

// may need to be used for permissioning
// eslint-disable-next-line no-unused-vars
const PublishablePositions = ({ viewType }) => {
  const dispatch = useDispatch();
  const searchPosNumRef = useRef();

  const dataHasErrored = useSelector(state => state.publishablePositionsHasErrored);
  const dataIsLoading = useSelector(state => state.publishablePositionsIsLoading);
  const data = useSelector(state => state.publishablePositions);
  const userSelections = useSelector(state => state.publishablePositionsSelections);
  const filtersHasErrored = useSelector(state => state.publishablePositionsFiltersHasErrored);
  const filtersIsLoading = useSelector(state => state.publishablePositionsFiltersIsLoading);
  const filters = useSelector(state => state.publishablePositionsFilters);

  const [tempsearchPosNum, tempsetSearchPosNum] = useState(userSelections?.searchPosNum || '');
  const [searchPosNum, setSearchPosNum] = useState(userSelections?.searchPosNum || '');
  const [selectedStatuses, setSelectedStatuses] = useState(userSelections?.selectedStatus || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrade || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);

  const [clearFilters, setClearFilters] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const statuses = filters?.statusFilters;
  const bureaus = filters?.bureauFilters;
  const orgs = filters?.orgFilters;
  const grades = filters?.gradeFilters;
  const skills = filters?.skillsFilters;
  const statusOptions = uniqBy(sortBy(statuses, [(f) => f.description]), 'code');
  const bureauOptions = uniqBy(sortBy(bureaus, [(f) => f.description]), 'description');
  const skillOptions = uniqBy(sortBy(skills, [(f) => f.description]), 'code');
  const orgOptions = uniqBy(sortBy(orgs, [(f) => f.description]), 'code');
  const gradeOptions = uniqBy(grades, 'code');

  const getQuery = () => ({
    posNum: searchPosNum,
    statuses: selectedStatuses.map(f => (f?.code)),
    bureaus: selectedBureaus.map(f => (f?.description)),
    orgs: selectedOrgs.map(f => (f?.code)),
    grades: selectedGrades.map(f => (f?.code)),
    skills: selectedSkills.map(f => (f?.code)),
  });

  const getCurrentInputs = () => ({
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
  });

  const numSelectedFilters = [
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
  ].flat().filter(text => text !== '').length;

  const filterSelectionValid = () => {
    // valid if:
    // pos num
    // at least two distinct filters
    if (searchPosNum) {
      return true;
    }
    const fils = [
      searchPosNum,
      selectedStatuses,
      selectedBureaus,
      selectedOrgs,
      selectedGrades,
      selectedSkills,
    ];
    const a = [];
    fils.forEach(f => { if (f.length) { a.push(true); } });
    return a.length > 1;
  };

  const fetchAndSet = () => {
    setClearFilters(!!numSelectedFilters);

    if (filterSelectionValid()) {
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
    setSearchPosNum('');
    tempsetSearchPosNum('');
    searchPosNumRef.current.clearText();
    setSelectedStatuses([]);
    setSelectedBureaus([]);
    setSelectedOrgs([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setClearFilters(false);
  };

  const getOverlay = () => {
    let overlay;
    if (dataIsLoading || filtersIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (dataHasErrored || filtersHasErrored) {
      overlay = <Alert type="error" title="Error displaying Publishable Positions" messages={[{ body: 'Please try again.' }]} />;
    } else if (!filterSelectionValid()) {
      overlay = <Alert type="info" title="Select Filters" messages={[{ body: 'Please select at least 2 distinct filters to search or search by Position Number.' }]} />;
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
    dispatch(publishablePositionsFiltersFetchData());
    dispatch(savePublishablePositionsSelections(getCurrentInputs()));
  }, []);

  useEffect(() => {
    if (tempsearchPosNum !== searchPosNum) {
      setSearchPosNum(tempsearchPosNum);
    } else {
      fetchAndSet();
    }
  }, [
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
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
              <div className="label">Position Number:</div>
              <div className="filter-search-bar">
                <PositionManagerSearch
                  id="emp-id-search"
                  submitSearch={(e) => setSearchPosNum(e)}
                  onChange={tempsetSearchPosNum}
                  ref={searchPosNumRef}
                  textSearch={tempsearchPosNum}
                  placeHolder="Search by Position Number"
                  noButton
                  showIcon={false}
                />
              </div>
            </div>
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
              <div className="label">Bureau:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Bureau(s)"
                value={selectedBureaus}
                onChange={setSelectedBureaus}
                options={bureauOptions}
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
                options={skillOptions}
                valueKey="code"
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
            <ScrollUpButton />
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
