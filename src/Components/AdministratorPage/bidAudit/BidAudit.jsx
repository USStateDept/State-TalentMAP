import { useEffect, useRef, useState } from 'react';
import Picky from 'react-picky';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { get, includes, sortBy } from 'lodash';
import PropTypes from 'prop-types';
import { useDataLoader } from 'hooks';
import { getGenericFilterOptions, onEditModeSearch, renderSelectionList } from 'utilities';
import { filtersFetchData } from 'actions/filters/filters';
import { bidAuditFetchData, saveBidAuditSelections } from 'actions/bidAudit';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import api from '../../../api';
import BidAuditCard from './BidAuditCard';

const BidAudit = () => {
  const dispatch = useDispatch();

  const bidAuditCycles = useSelector(state => state.bidAuditSelections);
  const dummyPositionDetails = useSelector(state => state.bidAudit);
  const atGrades = dummyPositionDetails[0]?.atGrades || [];
  const inCategories = dummyPositionDetails[1]?.inCategories || [];
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const genericFiltersIsLoading = useSelector(state => state.filtersIsLoading);
  const genericFilters = useSelector(state => state.filters);

  const [assignmentCycles, setAssignmentCycles] = useState(bidAuditCycles?.assignmentCycles || []);
  const [auditNumber, setAuditNumber] = useState(bidAuditCycles?.auditNumber || []);
  const [auditDescription, setAuditDescription] = useState(bidAuditCycles?.auditDescription || []);
  const [postByDate, setPostByDate] = useState();
  const [clearFilters, setClearFilters] = useState(false);

  const genericFilters$ = get(genericFilters, 'filters') || [];
  const assignmentCycleOptions = getGenericFilterOptions(genericFilters$, 'bidCycle', 'name');

  const { data: orgs, loading: orgsLoading } = useDataLoader(api().get, '/fsbid/agenda_employees/reference/current-organizations/');
  const auditDescriptionOptions = sortBy(get(orgs, 'data'), [(o) => o.name]);

  const bidAuditFiltersIsLoading = includes([orgsLoading], true);

  const isLoading = genericFiltersIsLoading || bidAuditFiltersIsLoading;
  const disableSearch = cardsInEditMode.length > 0;
  const disableInput = isLoading || disableSearch;
  const getQuery = () => ({
    'assignment-cycles': assignmentCycles?.map(ba => (ba?.code)),
    'audit-number': auditNumber?.map(ba => (ba?.code)),
    'audit-description': auditDescription?.map(ba => (ba?.code)),
  });

  const resetFilters = () => {
    setAssignmentCycles([]);
    setAuditNumber([]);
    setAuditDescription([]);
    setPostByDate(null);
    setClearFilters(false);
  };

  const getCurrentInputs = () => ({
    assignmentCycles,
    auditNumber,
    auditDescription,
    postByDate,
  });

  useEffect(() => {
    dispatch(saveBidAuditSelections(getCurrentInputs()));
    dispatch(filtersFetchData(genericFilters));
  }, []);

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const fetchAndSet = () => {
    const filters = [
      assignmentCycles,
      auditNumber,
      auditDescription,
    ];
    if (filters.flat().length === 0 && !postByDate) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
    dispatch(bidAuditFetchData(getQuery()));
    dispatch(saveBidAuditSelections(getCurrentInputs()));
  };

  useEffect(() => {
    fetchAndSet();
  }, [
    assignmentCycles,
    auditNumber,
    auditDescription,
    postByDate,
  ]);

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  const onAddClick = (e) => {
    e.preventDefault();
  };

  return (isLoading ?
    <Spinner type="bureau-filters" size="small" /> :
    <div className="position-search bid-audit-page">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Bid Audit" icon="keyboard-o" className="xl-icon" />
        <div className="results-search-bar pt-20">
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
          <div className="usa-width-one-whole position-search--filters--ba results-dropdown">
            <div className="filter-div">
              <div className="label">Assignment Cycle:</div>
              <Picky
                {...pickyProps}
                placeholder="Select Assignment Cycle(s)"
                value={assignmentCycles}
                options={assignmentCycleOptions}
                onChange={setAssignmentCycles}
                valueKey="id"
                labelKey="name"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Audit Number:</div>
              <Picky
                {...pickyProps}
                placeholder="Enter Audit Number"
                value={auditNumber}
                options={auditDescriptionOptions}
                onChange={setAuditNumber}
                valueKey="code"
                labelKey="name"
                disabled={disableInput}
              />
            </div>
            <div className="filter-div">
              <div className="label">Audit Description:</div>
              <Picky
                {...pickyProps}
                placeholder="Enter Audit Description"
                value={auditDescription}
                options={auditDescriptionOptions}
                onChange={setAuditDescription}
                valueKey="code"
                labelKey="name"
                disabled={disableInput}
              />
            </div>
            <div className="date-wrapper-react larger-date-picker filter-div">
              <div className="label">Posted By Date:</div>
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${postByDate ? '' : 'hide'} close`} onClick={() => setPostByDate(null)} />
              <DatePicker
                selected={postByDate}
                onChange={setPostByDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                ref={datePickerRef}
              />
            </div>
          </div>
        </div>
      </div>
      {disableSearch &&
        <Alert
          type="warning"
          title={'Edit Mode (Search Disabled)'}
          customClassName="mb-10"
          messages={[{
            body: 'Discard or save your edits before searching. ' +
              'Filters and Pagination are disabled if any cards are in Edit Mode.',
          }]}
        />
      }
      <div className="usa-width-one-whole position-search--results">
        <div className="usa-grid-full position-list">
          <p className="add-at">
            <FA name="plus" />
            <Link
              to="#"
              onClick={onAddClick}
            >
              Create New Audit Cycle
            </Link>
          </p>
          {dummyPositionDetails[2]?.bidAudit.map(k => (
            <BidAuditCard
              atGrades={atGrades}
              inCategories={inCategories}
              id={k.id}
              key={k.id}
              result={k}
              onEditModeSearch={(editMode, id) =>
                onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)
              }
            />
          ))}
        </div>
      </div>
      {disableSearch &&
        <div className="disable-react-paginate-overlay" />
      }
    </div>
  );
};


BidAudit.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
};

BidAudit.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

export default BidAudit;
