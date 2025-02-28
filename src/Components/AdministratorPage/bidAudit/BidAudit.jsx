import { useEffect, useState } from 'react';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { Picky } from 'react-picky';
import { useDispatch, useSelector } from 'react-redux';
import { onEditModeSearch, renderSelectionList } from 'utilities';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import { bidAuditFetchData, updateBidCount } from 'actions/bidAudit';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import swal from '@sweetalert/with-react';
import BidAuditCard from './BidAuditCard';
import BidAuditModal from './BidAuditModal';
import ReactModal from '../../ReactModal';


const BidAudit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bidAuditFetchData());
  }, []);

  const bidAuditData = useSelector(state => state.bidAuditFetchData);
  const bidAuditFetchLoading = useSelector(state => state.bidAuditFetchDataLoading);
  const bidAuditFetchError = useSelector(state => state.bidAuditFetchDataErrored);

  const [openModal, setOpenModal] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  const cancelUpdateBidCount = () => swal.close();

  const submitUpdateBidCount = () => {
    dispatch(updateBidCount());
    swal.close();
  };

  const onUpdateCountClick = () => {
    swal({
      title: 'Run Dynamic Audit to Update Bid Counts?',
      button: false,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>Will update the bid counts for all Positions within all Active Cycles,</span>
            <div>that have at least one Bid Audit.</div>
          </div>
          <div className="modal-controls">
            <button onClick={submitUpdateBidCount} type="submit">Yes</button>
            <button className="usa-button-secondary" onClick={cancelUpdateBidCount}>Cancel</button>
          </div>
        </div>
      ),
    });
  };


  // ======================================================================================= Filters
  const [bidAuditData$, setBidAuditData$] = useState(bidAuditData);
  const [clearFilters, setClearFilters] = useState(false);
  const [selectedCycles, setSelectedCycles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDesc, setSelectedDesc] = useState([]);
  const noFiltersSelected = [selectedCycles, selectedStatus, selectedDesc].flat().length === 0;

  const resetFilters = () => {
    setSelectedCycles([]);
    setSelectedStatus([]);
    setSelectedDesc([]);
    setClearFilters(false);
  };

  const auditDataFiltered = () => {
    if (noFiltersSelected) return bidAuditData;
    let audits = bidAuditData;
    if (selectedCycles.length > 0) {
      audits = audits.filter(audit =>
        selectedCycles.some(cycle => cycle.text === audit.cycle_name),
      );
    }
    if (selectedStatus.length > 0) {
      audits = audits.filter(audit =>
        selectedStatus.some(status => status.text === audit.cycle_status),
      );
    }
    if (selectedDesc.length > 0) {
      audits = audits.filter(audit =>
        selectedDesc.some(description => description.text === audit.audit_desc),
      );
    }
    return audits;
  };

  useEffect(() => {
    setBidAuditData$(auditDataFiltered);
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedCycles,
    selectedStatus,
    selectedDesc,
    bidAuditData,
  ]);

  const uniqueCycles = () => {
    const cycles = bidAuditData.map(audit => audit.cycle_name);
    const uniq = [...new Set(cycles)];
    const uniqObj = uniq.map(x => ({ text: x }));
    return uniqObj;
  };
  const uniqueStatuses = () => {
    const statuses = bidAuditData.map(audit => audit.cycle_status);
    const uniq = [...new Set(statuses)];
    const uniqObj = uniq.map(x => ({ text: x }));
    return uniqObj;
  };
  const uniqueDescriptions = () => {
    const descriptions = bidAuditData.map(audit => audit.audit_desc);
    const uniq = [...new Set(descriptions)];
    const uniqObj = uniq.map(x => ({ text: x }));
    return uniqObj;
  };
  // ======================================================================================= Filters


  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  // Overlay for error, info, and loading state
  const noResults = bidAuditData$?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (bidAuditFetchLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (bidAuditFetchError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="position-search bid-audit-page">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Bid Audit" icon="keyboard-o" className="xl-icon" />
        <div className="filterby-container" >
          <div className="filterby-label">Filter by:</div>
          <span className="filterby-clear">
            {clearFilters &&
              <button className="unstyled-button" onClick={resetFilters} disabled={disableSearch}>
                <FA name="times" />
                Clear Filters
              </button>
            }
          </span>
        </div>
        <div className="usa-width-one-whole position-search--filters--cm">
          <div className="filter-div">
            <div className="label">Cycle:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Bid Cycle(s)"
              options={uniqueCycles()}
              valueKey="text"
              labelKey="text"
              onChange={setSelectedCycles}
              value={selectedCycles}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="label">Status:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Status"
              options={uniqueStatuses()}
              valueKey="text"
              labelKey="text"
              onChange={setSelectedStatus}
              value={selectedStatus}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="label">Description:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Status"
              options={uniqueDescriptions()}
              valueKey="text"
              labelKey="text"
              onChange={setSelectedDesc}
              value={selectedDesc}
              disabled={disableSearch}
            />
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
              'Filters are disabled if any cards are in Edit Mode.',
          }]}
        />
      }

      {getOverlay() ||
        <div className="usa-width-one-whole position-search--results">
          <div className="usa-grid-full position-list">
            <span className="ba-flex-end">
              <div className="icon-text-link">
                <Tooltip title="Run Dynamic Audit">
                  <a
                    role="button"
                    tabIndex={0}
                    onClick={onUpdateCountClick}
                  >
                    <FA name="clock-o" />
                    Update Bid Count
                  </a>
                </Tooltip>
              </div>
              <div className="icon-text-link ml-10">
                <a
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenModal(true)}
                >
                  <FA name="plus" />
                  Create New Audit
                </a>
              </div>
            </span>
            {bidAuditData$.map(data => (
              <BidAuditCard
                data={data}
                key={`${data.cycle_id}${data.audit_id}`}
                onEditModeSearch={(editMode, id) =>
                  onEditModeSearch(editMode, id, setCardsInEditMode, cardsInEditMode)
                }
              />
            ))}
          </div>
        </div>
      }
      <ReactModal open={openModal} setOpen={setOpenModal}>
        <BidAuditModal setOpen={setOpenModal} />
      </ReactModal>
    </div>
  );
};


export default BidAudit;
