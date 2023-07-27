import { withRouter } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import { useDataLoader, usePrevious } from 'hooks';
import { isEmpty } from 'lodash';
import { checkFlag } from 'flags';
import PropTypes from 'prop-types';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import PositionManagerSearch from 'Components/BureauPage/PositionManager/PositionManagerSearch';
import InteractiveElement from 'Components/InteractiveElement';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import Spinner from 'Components/Spinner';
import CyclePositionCard from 'Components/CyclePositionCard';
import Alert from 'Components/Alert';
import PaginationWrapper from 'Components/PaginationWrapper';
import TotalResults from 'Components/TotalResults';
import SelectForm from 'Components/SelectForm';
import { BUREAU_POSITION_SORT, POSITION_MANAGER_PAGE_SIZES } from 'Constants/Sort';
import { formatDate, onEditModeSearch } from 'utilities';
import { filtersFetchData } from 'actions/filters/filters';
import { cycleManagementFetchData, cyclePositionSearchFetchData, saveCyclePositionSearchSelections } from 'actions/cycleManagement';
import api from '../../../api';

const hideBreadcrumbs = checkFlag('flags.breadcrumbs');

const CyclePositionSearch = (props) => {
  const childRef = useRef();
  const dispatch = useDispatch();
  const { isAO } = props;
  const breadcrumbLinkRole = isAO ? 'ao' : 'bureau';

  // We will use this when calling cycleManagementFetchData later
  // eslint-disable-next-line no-unused-vars
  const cycleId = props.match?.params?.id ?? false;

  const cycleManagementResults = useSelector(state => state.cycleManagement);
  const loadedCycle = cycleManagementResults?.results?.[0] ?? {};
  const genericFilters = useSelector(state => state.filters);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const cyclePositionsLoading = useSelector(state => state.cyclePositionSearchFetchDataLoading);
  const cyclePositions = useSelector(state => state.cyclePositionSearch);
  const cyclePositionsError = useSelector(state => state.cyclePositionSearchFetchDataErrored);
  const userSelections = useSelector(state => state.cyclePositionSearchSelections);

  const cycleStatus = loadedCycle?.cycle_status || '';
  const cycleStartDate = formatDate(loadedCycle?.cycle_begin_date, 'M/D/YYYY');
  const cycleEndDate = formatDate(loadedCycle?.cycle_end_date, 'M/D/YYYY');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const organizationOptions = orgs?.data?.sort(o => o.name) ?? [];

  const [showMore, setShowMore] = useState(false);
  const [selectedCurrentBureaus, setSelectedCurrentBureaus] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [clearFilters, setClearFilters] = useState(false);
  const [ordering, setOrdering] =
    useState(userSelections?.ordering || BUREAU_POSITION_SORT.options[0].value);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;
  const disableInput = cyclePositionsLoading || disableSearch;

  const genericFilters$ = genericFilters?.filters || [];
  const bureaus = genericFilters$.find(f => f?.item?.description === 'region');
  const bureauOptions = bureaus?.data?.length ? [...new Set(bureaus.data)].sort(b => b.name) : [];
  const grades = genericFilters$.find(f => f?.item?.description === 'grade');
  const gradeOptions = grades?.data?.length ? [...new Set(grades.data)].sort(b => b.name) : [];
  const skills = genericFilters$.find(f => f?.item?.description === 'skill');
  const skillOptions = skills?.data?.length ? [...new Set(skills.data)].sort(b => b.name) : [];
  const sorts = BUREAU_POSITION_SORT;

  const [page, setPage] = useState(userSelections?.page || 1);
  const [limit, setLimit] = useState(userSelections?.limit || 10);
  const prevPage = usePrevious(page);
  const pageSizes = POSITION_MANAGER_PAGE_SIZES;

  useEffect(() => {
    dispatch(cycleManagementFetchData()); // TODO: cycleId gets sent here when EP is created
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const getQuery = () => ({
    'cps-bureaus': selectedCurrentBureaus.map(bureauObject => (bureauObject?.code)),
    'cps-orgs': selectedOrganizations.map(orgObject => (orgObject?.code)),
    'cps-grades': selectedGrades.map(gradeObject => (gradeObject?.code)),
    'cps-skills': selectedSkills.map(skillObject => (skillObject?.code)),
    q: textInput,
    ordering,
    limit,
    page,
  });

  const resetFilters = () => {
    setSelectedCurrentBureaus([]);
    setSelectedOrganizations([]);
    setSelectedGrades([]);
    setSelectedSkills([]);
    setTextInput('');
    childRef.current.clearText();
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    selectedCurrentBureaus,
    selectedOrganizations,
    selectedGrade: selectedGrades,
    selectedSkills,
    textInput,
    ordering,
    limit,
    page,
  });

  const fetchAndSet = (resetPage = false) => {
    const filters = [
      selectedCurrentBureaus,
      selectedOrganizations,
      selectedGrades,
      selectedSkills,
    ];
    if (filters.flat().length === 0 && isEmpty(textInput)) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveCyclePositionSearchSelections(getCurrentInputs()));
    dispatch(cyclePositionSearchFetchData(getQuery()));
  };

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    selectedCurrentBureaus,
    selectedOrganizations,
    selectedGrades,
    selectedSkills,
    textInput,
    ordering,
    limit,
  ]);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  const renderSelectionList = ({ items, selected, ...rest }) => {
    let queryProp = 'description';
    if (items?.[0]?.custom_description) queryProp = 'custom_description';
    else if (items?.[0]?.long_description) queryProp = 'long_description';
    else if (items?.[0]?.name) queryProp = 'name';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  };

  // Overlay for error, info, and loading state
  const noResults = cyclePositions?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (cyclePositionsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (cyclePositionsError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  return (
    orgsLoading || genericFiltersIsLoading ? <Spinner type="bureau-filters" size="small" /> :
      (
        <div className="cycle-management-page">
          <div className="cm-upper-section">
            <ProfileSectionTitle title="Cycle Position Search" icon="keyboard-o" />
            {showMore &&
              <div className="expanded-content">
                <div className="search-bar-container">
                  <PositionManagerSearch
                    submitSearch={setTextInput}
                    ref={childRef}
                    textSearch={textInput}
                    placeHolder="Search using Position Number or Position Title"
                  />
                </div>
                <div className="filterby-container">
                  <div className="filterby-label">Filter by:</div>
                  <div className="filterby-clear">
                    {clearFilters &&
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
                <div className="cm-filters grid-200">
                  <div className="cm-filter-div">
                    <div className="label">Bureau:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Bureau(s)"
                      value={selectedCurrentBureaus}
                      options={bureauOptions}
                      onChange={setSelectedCurrentBureaus}
                      valueKey="code"
                      labelKey="long_description"
                      disabled={disableSearch}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Organization:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Organization(s)"
                      options={organizationOptions}
                      valueKey="code"
                      labelKey="name"
                      onChange={setSelectedOrganizations}
                      value={selectedOrganizations}
                      disabled={disableSearch}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Grade:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Grade(s)"
                      options={gradeOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      onChange={setSelectedGrades}
                      value={selectedGrades}
                      disabled={disableSearch}
                    />
                  </div>
                  <div className="cm-filter-div">
                    <div className="label">Skills:</div>
                    <Picky
                      {...pickyProps}
                      placeholder="Select Skill(s)"
                      options={skillOptions}
                      valueKey="code"
                      labelKey="custom_description"
                      onChange={setSelectedSkills}
                      value={selectedSkills}
                      disabled={disableSearch}
                    />
                  </div>
                </div>
              </div>
            }
            <div className="toggle-more-container">
              <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
                <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
              </InteractiveElement>
            </div>
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
          <div className="cps-content">
            { !hideBreadcrumbs &&
              <div className="breadcrumb-container">
                <Link to={`/profile/${breadcrumbLinkRole}/cyclemanagement`} className="breadcrumb-active">
                  Cycle Search Results
                </Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <span>{loadedCycle?.cycle_name ?? ''}</span>
              </div>
            }
            <div className="cps-header">
              {loadedCycle?.cycle_name ?? 'Error Loading Cycle'}
            </div>
            <div className="cps-subheader">
              <div className="cycle-dates">{`Cycle Status: ${cycleStatus}`}</div>
              <div className="cycle-dates">{`Cycle Start: ${cycleStartDate}`}</div>
              <div className="cycle-dates">{`Bid Due: ${cycleEndDate}`}</div>
            </div>
            {
              getOverlay() ||
            <>
              <div className="usa-grid-full results-dropdown">
                <div className="cps-results">
                  <TotalResults
                    total={cyclePositions.count}
                    pageNumber={page}
                    pageSize={limit}
                    suffix="Results"
                    isHidden={cyclePositionsLoading}
                  />
                  <div className="cm-results-dropdown cm-results">
                    <SelectForm
                      id="position-manager-num-results"
                      options={sorts.options}
                      label="Sort by:"
                      defaultSort={ordering}
                      onSelectOption={value => setOrdering(value.target.value)}
                      disabled={disableInput}
                    />
                    <SelectForm
                      id="position-manager-num-results"
                      options={pageSizes.options}
                      label="Results:"
                      defaultSort={limit}
                      onSelectOption={value => setLimit(value.target.value)}
                      disabled={disableInput}
                    />
                  </div>
                </div>
              </div>
              <div className="cps-lower-section">
                {cyclePositions?.results?.map(data =>
                  (
                    <CyclePositionCard
                      data={data}
                      onEditModeSearch={(editMode, id) =>
                        onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)}
                      cycle={loadedCycle}
                      isAO
                    />
                  ))}
              </div>
              <div className="usa-grid-full react-paginate bureau-pagination-controls">
                {
                  disableSearch &&
                    <div className="disable-react-paginate-overlay" />
                }
                <PaginationWrapper
                  pageSize={limit}
                  onPageChange={p => setPage(p.page)}
                  forcePage={page}
                  totalResults={cyclePositions.count}
                  className={`${disableSearch ? 'disable-react-paginate' : ''}`}
                />
              </div>
            </>
            }
          </div>
        </div>
      )
  );
};

CyclePositionSearch.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  isAO: PropTypes.bool,
};

CyclePositionSearch.defaultProps = {
  match: {},
  isAO: false,
};

export default withRouter(CyclePositionSearch);
