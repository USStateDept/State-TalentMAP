import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { get, sortBy, uniqBy } from 'lodash';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { isDate, startOfDay } from 'date-fns-v2';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import ListItem from 'Components/BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import PaginationWrapper from 'Components/PaginationWrapper';
import Alert from 'Components/Alert';
import { usePrevious } from 'hooks';
import { filtersFetchData } from 'actions/filters/filters';
import {
  assignmentCycleFetchData,
  postAssignmentCyclesSelections,
  saveAssignmentCycleSelections,
  saveAssignmentCyclesSelections,
} from 'actions/assignmentCycle';
import AssignmentCyclesCard from './AssignmentCyclesCard';
import CheckBox from '../../CheckBox';
import NewAssignmentCycle from './NewAssignmentCycle';

const AssignmentCycles = () => {
  const dispatch = useDispatch();
  const userSelections = useSelector(state => state.assignmentCycleSelections);
  const AssignmentCycleDataLoading = useSelector(state => state.assignmentCycleFetchDataLoading);
  const AssignmentCycleData = useSelector(state => state.assignmentCycle);
  const AssignmentCycleError = useSelector(state => state.assignmentCycleFetchDataErrored);
  const genericFilters = useSelector(state => state.filters);
  const genericFilters$ = get(genericFilters, 'filters') || [];

  // Filters
  const [selectedAssignmentCycles, setSelectedAssignmentCycles] =
    useState(userSelections?.selectedAssignmentCycles || []);
  const [selectedDates, setSelectedDates] = useState(userSelections?.selectedDates || []);
  const [assignmentCycle, setAssignmentCycle] = useState(userSelections?.assignmentCycle || []);
  const [cycleCategory, setCycleCategory] = useState(userSelections?.cycleCategory || []);
  const [cycleStatus, setCycleStatus] = useState(userSelections?.cycleStatus || []);
  const [exclusivePosition, setExclusivePosition] = useState(false);
  const [postView, setPostView] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);
  const [addNewCycles, setAddNewCycles] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);

  // Pagination
  const [page, setPage] = useState(userSelections.page || 1);
  const prevPage = usePrevious(page);

  const statusOptions = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Closed' },
    { id: 3, name: 'Merged' },
    { id: 4, name: 'Proposed' },
  ];

  const cycleCategoryOptions = [
    { id: 0, name: 'O (Other)' },
    { id: 1, name: 'Bid' },
    { id: 2, name: 'Handshake' },
    { id: 3, name: 'Handshake' },
  ];
  const currentInputs = {
    page,
    assignmentCycle,
    cycleCategory,
    cycleStatus,
    exclusivePosition,
    postView,
  };

  const getCurrentInputs = () => ({
    page,
    assignmentCycle,
    cycleCategory,
    cycleStatus,
    exclusivePosition,
    postView,
  });

  const disableInput = addNewCycles || cardsInEditMode.length > 0;
  const getQuery = () => ({
    'assignment-cycles': selectedAssignmentCycles.map(obj => (obj?.id)),
    'assignment-cycles-statuses': cycleStatus.map(obj => (obj?.id)),
    'assignment-cycles-date-start': isDate(selectedDates?.[0]) ? startOfDay(selectedDates?.[0]).toJSON() : '',
    'assignment-cycles-date-end': isDate(selectedDates?.[1]) ? startOfDay(selectedDates?.[1]).toJSON() : '',
    page,
  });

  const assignmentCycles = genericFilters$.find(f => get(f, 'item.description') === 'bidCycle');
  const assignmentCycleOptions = uniqBy(sortBy(get(assignmentCycles, 'data'), [(c) => c.custom_description]), 'custom_description');

  const fetchAndSet = (resetPage = false) => {
    setSelectedAssignmentCycles([]);
    const filters = [
      assignmentCycle,
      cycleCategory,
      cycleStatus,
      exclusivePosition,
      postView,
    ];

    if (filters.flat().length === 0) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    if (resetPage) {
      setPage(1);
    }
    dispatch(saveAssignmentCycleSelections(getCurrentInputs()));
    dispatch(assignmentCycleFetchData(getQuery()));
  };


  // initial render
  useEffect(() => {
    dispatch(filtersFetchData(genericFilters));
    dispatch(saveAssignmentCycleSelections(currentInputs));
  }, []);

  useEffect(() => {
    if (prevPage) {
      fetchAndSet(true);
    }
  }, [
    assignmentCycle,
    cycleCategory,
    cycleStatus,
    exclusivePosition,
    postView,
  ]);

  useEffect(() => {
    fetchAndSet(false);
  }, [
    page,
  ]);

  const resetFilters = () => {
    setSelectedDates(null);
    setAssignmentCycle([]);
    setCycleCategory([]);
    setCycleStatus([]);
    setExclusivePosition(false);
    setPostView(false);
    setClearFilters(false);
    cardsInEditMode([]);
    setAddNewCycles(false);
  };

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
  const noResults = AssignmentCycleData?.results?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (AssignmentCycleDataLoading) {
      overlay = <Spinner type="bid-season-filters" class="homepage-position-results" size="big" />;
    } else if (AssignmentCycleError) {
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

  const addNewCycle = (e) => {
    e.preventDefault();
    setAddNewCycles(ac => !ac);
  };

  const onSave = (isNew, userData) => {
    dispatch(saveAssignmentCyclesSelections(userData));
    setAddNewCycles(false);
    if (!isNew) setCardsInEditMode([]);
  };

  const onPost = (isNew, userData) => {
    dispatch(postAssignmentCyclesSelections(userData));
    setAddNewCycles(false);
    if (!isNew) setCardsInEditMode([]);
  };

  const onClose = (isNew) => {
    setAddNewCycles(false);
    if (!isNew) setCardsInEditMode([]);
  };

  const onCardAdd = (e) => {
    if (cardsInEditMode.includes(e)) {
      setCardsInEditMode(cardsInEditMode.filter(item => item !== e));
    } else {
      setCardsInEditMode([...cardsInEditMode, e]);
    }
  };

  return (
    <div className="assignment-cycle-page position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Assignment Cycles" icon="cogs" className="xl-icon" />
        <div className="filterby-container" >
          <div className="filterby-label">Filter by:</div>
          <span className="filterby-clear">
            {clearFilters &&
              <button className="unstyled-button" onClick={resetFilters}>
                <FA name="times" />
                Clear Filters
              </button>
            }
          </span>
        </div>
        <div className="usa-width-one-whole position-search--filters--ac">
          <div className="filter-div">
            <div className="label">Assignment Cycle:</div>
            <Picky
              {...pickyProps}
              placeholder="Select assignment cycle(s)"
              options={assignmentCycleOptions}
              valueKey="id"
              labelKey="name"
              onChange={setAssignmentCycle}
              value={assignmentCycle}
              disabled={disableInput}
            />
          </div>
          <div className="filter-div">
            <div className="label">Cycle Category:</div>
            <Picky
              {...pickyProps}
              placeholder="Select cycle category(s)"
              options={cycleCategoryOptions}
              valueKey="id"
              labelKey="name"
              onChange={setCycleCategory}
              value={cycleCategory}
              disabled={disableInput}
            />
          </div>
          <div className="filter-div">
            <div className="label">Cycle Status:</div>
            <Picky
              {...pickyProps}
              placeholder="Select cycle status"
              options={statusOptions}
              valueKey="id"
              labelKey="name"
              onChange={setCycleStatus}
              disabled={disableInput}
            />
          </div>
          <div className="filter-div">
            <CheckBox
              id="exclusivePosition"
              name="exclusivePosition"
              label="Exclusive Position"
              value={exclusivePosition}
              checked={exclusivePosition}
              onChange={() => setExclusivePosition((e) => !e)}
              disabled={disableInput}
            />
          </div>
          <div className="filter-div">
            <CheckBox
              id="postView"
              name="postView"
              label="Post Viewable"
              value={postView}
              checked={postView}
              onChange={() => setPostView((e) => !e)}
              disabled={disableInput}
            />
          </div>
        </div>

      </div>

      {
        getOverlay() ||
        <>
          <div className="usa-grid-full results-dropdown controls-container">
            <div className="bs-results">
              <Link
                onClick={addNewCycle}
                to="#"
              >
                {addNewCycles ?
                  <span>
                    <FA className="fa-solid fa-close" />
                    {' Close'}
                  </span> :
                  <span>
                    <FA className="fa-solid fa-plus" />
                    {' Add New Assignment Cycle'}
                  </span>
                }
              </Link>
            </div>
          </div>

          <div className="bs-lower-section">
            {addNewCycles ?
              <NewAssignmentCycle
                onPost={onPost}
                onSave={onSave}
                onClose={onClose}
              /> : null}
            {AssignmentCycleData?.results?.map(data =>
              (
                <AssignmentCyclesCard
                  data={data}
                  onEditModeSearch={onCardAdd}
                />
              ),
            )}
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                pageSize={5}
                onPageChange={p => setPage(p.page)}
                forcePage={page}
                totalResults={AssignmentCycleData.count}
              />
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default withRouter(AssignmentCycles);
