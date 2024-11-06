import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import { sortBy, uniqBy } from 'lodash';
import { toastError, toastSuccess } from 'actions/toast';
import { usePrevious } from 'hooks';
import {
  publishablePositionsEdit,
  publishablePositionsExport,
  publishablePositionsFetchData,
  publishablePositionsFiltersFetchData,
  savePublishablePositionsSelections,
} from 'actions/publishablePositions';
import Alert from 'Components/Alert/Alert';
import ExportButton from 'Components/ExportButton';
import Spinner from 'Components/Spinner';
import { PANEL_MEETINGS_PAGE_SIZES } from 'Constants/Sort';
import ScrollUpButton from 'Components/ScrollUpButton';
import PaginationWrapper from 'Components/PaginationWrapper';
import SelectForm from 'Components/SelectForm';
import TotalResults from 'Components/TotalResults';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import { renderSelectionList } from 'utilities';
import PublishablePositionCard from '../PublishablePositionCard/PublishablePositionCard';
import { checkFlag } from '../../flags';

const PP_FLAG = () => checkFlag('flags.publishable_positions_additional');

// may need to be used for permissioning
// eslint-disable-next-line no-unused-vars
const PublishablePositions = ({ viewType }) => {
  const dispatch = useDispatch();
  const searchPosNumRef = useRef();

  const dataHasErrored = useSelector(state => state.publishablePositionsHasErrored);
  const dataIsLoading = useSelector(state => state.publishablePositionsIsLoading);
  const additionalDataIsLoading = false;
  // const additionalDataIsLoading = useSelector(state => state.publishablePositionsIsLoading);
  const data = useSelector(state => state.publishablePositions);
  const data$ = data?.results;

  const userSelections = useSelector(state => state.publishablePositionsSelections);
  const filtersHasErrored = useSelector(state => state.publishablePositionsFiltersHasErrored);
  const filtersIsLoading = useSelector(state => state.publishablePositionsFiltersIsLoading);
  const filters = useSelector(state => state.publishablePositionsFilters);

  const isBureauView = viewType === 'bureau';
  const isPostView = viewType === 'post';
  const bureauPermissions = useSelector(state => state.userProfile?.bureau_permissions);

  const [tempsearchPosNum, tempsetSearchPosNum] = useState(userSelections?.searchPosNum || '');
  const [searchPosNum, setSearchPosNum] = useState(userSelections?.searchPosNum || '');
  const [selectedStatuses, setSelectedStatuses] = useState(userSelections?.selectedStatuses || []);
  const [selectedBureaus, setSelectedBureaus] = useState(userSelections?.selectedBureaus || []);
  const [selectedOrgs, setSelectedOrgs] = useState(userSelections?.selectedOrgs || []);
  const [selectedGrades, setSelectedGrades] = useState(userSelections?.selectedGrades || []);
  const [selectedSkills, setSelectedSkills] = useState(userSelections?.selectedSkills || []);
  const [selectedBidCycles, setSelectedBidCycles] =
    useState(userSelections?.selectedBidCycles || []);

  const [clearFilters, setClearFilters] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [exportIsLoading, setExportIsLoading] = useState(false);

  const [page, setPage] = useState(userSelections?.page || 1);
  const [limit, setLimit] = useState(userSelections?.limit || 5);

  const prevPage = usePrevious(page);

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;

  const statuses = filters?.statusFilters;
  const orgs = filters?.orgFilters;
  const grades = filters?.gradeFilters;
  const skills = filters?.skillsFilters;
  const cycles = filters?.cycleFilters;
  const bureauOptions = sortBy(bureauPermissions, [(b) => b.long_description]);
  const statusOptions = uniqBy(sortBy(statuses, [(f) => f.description]), 'code');
  const skillOptions = uniqBy(sortBy(skills, [(f) => f.description]), 'code');
  const orgOptions = uniqBy(sortBy(orgs, [(f) => f.description]), 'code');
  const cycleOptions = uniqBy(sortBy(cycles, [(f) => f.code]), 'code');
  const gradeOptions = uniqBy(grades, 'code');

  const getQuery = () => ({
    limit,
    page,
    posNum: searchPosNum,
    statuses: selectedStatuses.map(f => (f?.code)),
    bureaus: selectedBureaus.map(f => (f?.short_description)),
    orgs: selectedOrgs.map(f => (f?.code)),
    grades: selectedGrades.map(f => (f?.code)),
    skills: selectedSkills.map(f => (f?.code)),
    cycles: selectedBidCycles.map(f => (f?.code)),
  });

  const getCurrentInputs = () => ({
    limit,
    page,
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  });

  const numSelectedFilters = [
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  ].flat().filter(text => text !== '').length;

  const filterSelectionValid = () => {
    // valid if:
    // not Bureau user
    // a Bureau filter selected
    if (isBureauView) {
      return selectedBureaus.length > 0;
    }
    if (isPostView) {
      return selectedOrgs.length > 0;
    }
    return true;
  };

  const fetchAndSet = (resetPage = false) => {
    setClearFilters(!!numSelectedFilters);
    if (filterSelectionValid()) {
      if (resetPage) {
        setPage(1);
      }
      dispatch(publishablePositionsFetchData(getQuery()));
      dispatch(savePublishablePositionsSelections(getCurrentInputs()));
    }
  };

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

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
    setSelectedBidCycles([]);
    setClearFilters(false);
    dispatch(savePublishablePositionsSelections({}));
  };

  // eslint-disable-next-line no-unused-vars
  const callAdditionalData = (e) => {
    // if e is true, check for cached ref data,
    // and make additional data calls
  };

  const getOverlay = () => {
    let overlay;
    if (dataIsLoading || filtersIsLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (dataHasErrored || filtersHasErrored) {
      overlay = <Alert type="error" title="Error displaying Publishable Positions" messages={[{ body: 'Please try again.' }]} />;
    } else if (!filterSelectionValid()) {
      if (isBureauView) {
        overlay = <Alert type="info" title="Select Bureau Filter" messages={[{ body: 'Please select a Bureau Filter.' }]} />;
      } else {
        overlay = <Alert type="info" title="Select Org Filter" messages={[{ body: 'Please select a Org Filter.' }]} />;
      }
    } else if (!data$?.length) {
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
    if (prevPage) {
      fetchAndSet(true);
    }
    if (tempsearchPosNum !== searchPosNum) {
      setSearchPosNum(tempsearchPosNum);
    } else {
      fetchAndSet(false);
    }
  }, [
    limit,
    searchPosNum,
    selectedStatuses,
    selectedBureaus,
    selectedOrgs,
    selectedGrades,
    selectedSkills,
    selectedBidCycles,
  ]);

  const exportPublishablePositions = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      publishablePositionsExport(getQuery())
        .then(() => {
          setExportIsLoading(false);
          dispatch(toastSuccess('Publishable Positions export successfully downloaded.', 'Success'));
        })
        .catch(() => {
          setExportIsLoading(false);
          dispatch(toastError('We were unable to process your Publishable Positions export. Please try again.', 'An error has occurred'));
        });
    }
  };

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
              <div className="filter-search-bar fsb-220">
                <PositionManagerSearch
                  id="emp-id-search"
                  submitSearch={(e) => setSearchPosNum(e)}
                  onChange={tempsetSearchPosNum}
                  ref={searchPosNumRef}
                  textSearch={tempsearchPosNum}
                  placeHolder="Search by Position Number"
                  noButton
                  showIcon={false}
                  disableSearch={editMode}
                />
              </div>
            </div>

            <div className="filter-div">
              <div className="label">Publishable Status:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Status(es)"
                value={selectedStatuses}
                options={statusOptions}
                onChange={setSelectedStatuses}
                valueKey="code"
                labelKey="description"
                disabled={editMode}
              />
            </div>
            {PP_FLAG() ?
              <div className="filter-div">
                <div className="label">Bid Cycle:</div>
                <Picky
                  {...pickyProps}
                  placeholder="Select Bid Cycle(s)"
                  value={selectedBidCycles}
                  options={cycleOptions}
                  onChange={setSelectedBidCycles}
                  valueKey="code"
                  labelKey="description"
                  disabled={editMode}
                />
              </div>
              : null
            }
            <div className="filter-div">
              <div className="label">Bureau:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Bureau(s)"
                value={selectedBureaus}
                options={bureauOptions}
                onChange={setSelectedBureaus}
                valueKey="code"
                labelKey="short_description"
                disabled={editMode}
              />
            </div>
            <div className="filter-div">
              <div className="label">Organization:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Organization(s)"
                value={selectedOrgs}
                options={orgOptions}
                onChange={setSelectedOrgs}
                valueKey="code"
                labelKey="description"
                disabled={editMode}
              />
            </div>
            <div className="filter-div">
              <div className="label">Skill:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Skill(s)"
                value={selectedSkills}
                options={skillOptions}
                onChange={setSelectedSkills}
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
                options={gradeOptions}
                onChange={setSelectedGrades}
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
          <div className="export-button-container mr-30 justify-flex-end">
            <ExportButton
              onClick={exportPublishablePositions}
              isLoading={exportIsLoading}
            />
          </div>
          <div className="viewing-results-and-dropdown--fullscreen padding-top results-dropdown">
            <TotalResults
              total={data?.count}
              pageNumber={page}
              pageSize={limit}
              suffix="Results"
              isHidden={false}
            />
            <ScrollUpButton />
            <SelectForm
              className="panel-select"
              options={pageSizes.options}
              label="Results:"
              defaultSort={limit}
              onSelectOption={e => setLimit(e.target.value)}
            />
          </div>
          {
            editMode &&
            <Alert
              type="warning"
              title={'Edit Mode (Search Disabled)'}
              messages={[{
                body: 'Filters are disabled while in Edit Mode. ' +
                  'Discard or save your edits to enable searching. ' +
                  'Position Details are only editable for Publishable status.',
              },
              ]}
            />
          }
          <div className="usa-width-one-whole position-search--results">
            <div className="usa-grid-full position-list">
              {
                data$.map(pubPos => (
                  <PublishablePositionCard
                    key={pubPos?.positionNumber}
                    data={pubPos}
                    additionalCallsLoading={additionalDataIsLoading}
                    onEditModeSearch={editState =>
                      setEditMode(editState)}
                    disableEdit={editMode}
                    disableEditDetails={(viewType === 'bureau') || (viewType === 'post')}
                    onSubmit={editData => submitEdit(editData)}
                    filters={filters}
                    onShowMorePP={callAdditionalData}
                    hideClassifications={isPostView}
                  />
                ))
              }
            </div>
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                pageSize={limit}
                onPageChange={p => setPage(p.page)}
                forcePage={page}
                totalResults={data?.count}
              />
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
