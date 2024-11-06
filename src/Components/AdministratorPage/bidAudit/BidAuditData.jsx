import { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import BackButton from 'Components/BackButton';
import ReactModal from 'Components/ReactModal';
import InteractiveElement from 'Components/InteractiveElement';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import { bidAuditGetAuditFetchData, bidAuditGetMDSFetchData } from 'actions/bidAudit';
import { cyclePositionFiltersFetchData } from 'actions/cycleManagement';
import { formatDate, renderSelectionList } from 'utilities';
import BidAuditHTFModal from './BidAuditHTFModal';
import { history } from '../../../store';

const BidAuditData = (props) => {
  const dispatch = useDispatch();

  const routeCycleID = props?.match.params.cycleId;
  const routeAuditID = props?.match.params.auditId;

  const cyclePosFilters = useSelector(state => state.cyclePositionsFilters);
  const cyclePosFiltersLoading = useSelector(state => state.cyclePositionFiltersIsLoading);

  const bidAuditData = useSelector(state => state.bidAuditGetAuditFetchDataSuccess);
  const bidAuditDataFetchLoading = useSelector(state => state.bidAuditGetAuditFetchDataLoading);
  const bidAuditDataFetchError = useSelector(state => state.bidAuditGetAuditFetchDataErrored);

  const bidAuditMDSData = useSelector(state => state.bidAuditGetMDSFetchDataSuccess);
  const bidAuditMDSDataFetchLoading = useSelector(state => state.bidAuditGetMDSFetchDataLoading);
  const bidAuditMDSDataFetchError = useSelector(state => state.bidAuditGetMDSFetchDataErrored);

  const [openModal, setOpenModal] = useState(false);
  const [HTFPositionID, setHTFPositionID] = useState(null);
  const [HTFPositionNumber, setHTFPositionNumber] = useState(null);
  const [dataTabActive, setDataTabActive] = useState(true);

  const tableHeaderNames = [
    'Location(Org) / Bidder',
    'Org Code', 'Position',
    'Skill / Title',
    'Grade', 'Language',
    'Incumbent',
    'Handshake (Other)',
    'TED',
    'Bid Count T(G/C)B',
    'HTF',
  ];

  const tableHeaderMDSNames = [
    'Cycle Name',
    'Duty Station',
    'Positions',
    'Quantity HTF',
    'MDS',
  ];

  const onShuffleAudit = (auditNum) => {
    if (auditNum) {
      history.push(`/profile/administrator/bidaudit/data/${routeCycleID}/${auditNum}/`);
    }
  };

  const onClickPositionHTF = (auditCyclePositionId, positionNumber) => {
    setHTFPositionID(auditCyclePositionId);
    setHTFPositionNumber(positionNumber);
    setOpenModal(true);
  };


  // ======================================================================================= Filters;

  const bureauOptions = cyclePosFilters?.bureauFilters || [];
  const orgOptions = cyclePosFilters?.orgFilters || [];
  const skillOptions = cyclePosFilters?.skillsFilters || [];
  const gradeOptions = cyclePosFilters?.gradeFilters || [];

  const [clearFilters, setClearFilters] = useState(false);
  const [selectedPositionBureaus, setSelectedPositionBureaus] = useState([]);
  const [selectedPositionOrgs, setSelectedPositionOrgs] = useState([]);
  const [selectedPositionSkills, setSelectedPositionSkills] = useState([]);
  const [selectedPositionGrades, setSelectedPositionGrades] = useState([]);

  const getQuery = () => ({
    bureaus: selectedPositionBureaus.map(bureau => (bureau?.code)),
    orgs: selectedPositionOrgs.map(org => (org?.code)),
    skills: selectedPositionSkills.map(loc => (loc?.code)),
    grades: selectedPositionGrades.map(role => (role?.code)),
    cycleId: routeCycleID,
    auditId: routeAuditID,
  });

  const filters = [
    selectedPositionGrades,
    selectedPositionSkills,
    selectedPositionOrgs,
    selectedPositionBureaus,
  ];

  // initial render
  useEffect(() => {
    dispatch(cyclePositionFiltersFetchData());
    dispatch(bidAuditGetAuditFetchData(getQuery()));
  }, []);

  const fetchAndSet = () => {
    const filterCount = filters.flat().length;
    setClearFilters(!!filterCount);
    if (filterCount >= 1) {
      dispatch(bidAuditGetAuditFetchData(getQuery()));
      dispatch(bidAuditGetMDSFetchData(getQuery()));
    }
  };

  // Re-Render on Filter Selections
  useEffect(() => {
    fetchAndSet();
  }, [
    selectedPositionGrades,
    selectedPositionSkills,
    selectedPositionOrgs,
    selectedPositionBureaus,
  ]);

  const resetFilters = () => {
    setSelectedPositionGrades([]);
    setSelectedPositionSkills([]);
    setSelectedPositionOrgs([]);
    setSelectedPositionBureaus([]);
    setClearFilters(false);
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };

  // ======================================================================================= Filters


  const noBidDataResults = bidAuditData?.audit_data?.length === 0;
  const noMDSResults = bidAuditMDSData?.mds_audit_data?.length === 0;
  const isLoading = bidAuditDataFetchLoading || bidAuditMDSDataFetchLoading || cyclePosFiltersLoading;

  const getOverlay = () => {
    let overlay;
    if (isLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (bidAuditDataFetchError || bidAuditMDSDataFetchError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (filters.flat().length < 1) {
      overlay = <Alert type="info" title="Select Filters" messages={[{ body: 'Please select at least 1 filter to search.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const bidDataTable = () => {
    if (noBidDataResults) {
      return (
        <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />
      );
    }
    return (
      <div className="bid-data-scroll-container">
        <table className="bid-data-custom-table">
          <thead>
            <tr>
              {
                tableHeaderNames.map((item) => (
                  <th key={item}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {bidAuditData?.audit_data?.map(data => {
              const { position_info: pos, bidders } = data;
              return (
                <Fragment key={pos.position_number}>
                  <tr key={pos.position_number} className="position-row">
                    <td>{pos.org_short_desc}</td>
                    <td>{pos.org_code}</td>
                    <td>{pos.position_number}</td>
                    <td>{`(${pos.position_skill}) ${pos.position_title}`}</td>
                    <td>{pos.position_grade}</td>
                    <td>{pos.position_lang}</td>
                    <td>{pos.position_incumbent_name}</td>
                    <td>--</td>
                    <td>{pos.position_incumbent_ted}</td>
                    <td>{`${pos.count_total_bidders}(${pos.count_at_grade}/${pos.count_in_category})${pos.count_at_grade_in_category}`}</td>
                    <td>
                      <a
                        role="button"
                        tabIndex={0}
                        className="ba-data-htf"
                        onClick={() => onClickPositionHTF(pos.audit_cycle_position_id, pos.position_number)}
                      >
                        {pos.hard_to_fill_ind}
                      </a>
                    </td>
                  </tr>
                  {
                    bidders?.map(bid => (
                      <tr key={bid.bidder_name}>
                        <td>{bid.bidder_name}</td>
                        <td>{bid.bidder_org_desc}</td>
                        <td>{bid.bidder_position_number}</td>
                        <td>{`(${bid.bidder_skill}) ${bid.bidder_position_title}`}</td>
                        <td>{bid.bidder_grade}</td>
                        <td>{bid.bidder_lang}</td>
                        <td>--</td>
                        <td>{bid.bidder_cats || '--'}</td>
                        <td>{bid.bidder_ted}</td>
                        <td>{`(${bid.bidder_is_at_grade}/${bid.bidder_is_in_category})`}</td>
                        <td>--</td>
                      </tr>
                    ))
                  }
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const mdsTable = () => {
    if (noMDSResults) {
      return (
        <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />
      );
    }
    return (
      <div className="bid-data-scroll-container">
        <table className="ba-mds-table">
          <thead>
            <tr>
              {
                tableHeaderMDSNames.map((item) => (
                  <th key={item}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              bidAuditMDSData?.mds_audit_data?.map(data => (
                <Fragment key={data.id}>
                  <tr key={data.cycle_name}>
                    <td>{data.cycle_name}</td>
                    <td>{data.duty_station}</td>
                    <td>{data.positions}</td>
                    <td>{data.quantity_htf}</td>
                    <td>{data.mds_ind}</td>
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="position-search bid-audit-page">
      <div className="usa-grid-full position-search--header">
        <BackButton />
        <ProfileSectionTitle title="Bid Audit - Bid Book" icon="keyboard-o" className="xl-icon" />

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

        <div className="usa-width-one-whole position-search--filters--cm">
          <div className="filter-div">
            <div className="ba-label">Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Grade"
              options={gradeOptions}
              valueKey="code"
              labelKey="description"
              onChange={setSelectedPositionGrades}
              value={selectedPositionGrades}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Skill"
              options={skillOptions.map(x => ({
                code: x.code,
                description: `(${x.code}) ${x.description}`,
              }))}
              valueKey="code"
              labelKey="description"
              onChange={setSelectedPositionSkills}
              value={selectedPositionSkills}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Bureau:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Bureau"
              options={bureauOptions}
              valueKey="code"
              labelKey="description"
              onChange={setSelectedPositionBureaus}
              value={selectedPositionBureaus}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Location(Org):</div>
            <Picky
              {...pickyProps}
              placeholder="Select Location(Org)"
              options={orgOptions}
              valueKey="code"
              labelKey="description"
              onChange={setSelectedPositionOrgs}
              value={selectedPositionOrgs}
            />
          </div>
        </div>
      </div>

      <div className="bid-data-heading">
        <span>
          <a
            role="button"
            tabIndex={0}
            onClick={() => onShuffleAudit(bidAuditData?.ref_data?.prev_audit_number)}
            className={bidAuditData?.ref_data?.prev_audit_number ? 'bid-data-shuffle' : 'bid-data-shuffle-disabled'}
          >
            <FA name="chevron-left" />
            {' Previous Audit'}
          </a>
        </span>
        <span>
          Cycle: {bidAuditData?.ref_data?.cycle_name || '--'}
        </span>
        <span>
          Audit Date: {bidAuditData?.ref_data?.audit_date ? formatDate(bidAuditData?.ref_data?.audit_date) : '--'}
        </span>
        <span>
          Audit Num: {bidAuditData?.ref_data?.audit_number || '--'}
        </span>
        <span>
          Description: {bidAuditData?.ref_data?.audit_desc || '--'}
        </span>
        <span>
          Posted by Date: {bidAuditData?.ref_data?.audit_posted_by_date ? formatDate(bidAuditData?.ref_data?.audit_posted_by_date) : '--'}
        </span>
        <span>
          <a
            role="button"
            tabIndex={0}
            onClick={() => onShuffleAudit(bidAuditData?.ref_data?.next_audit_number)}
            className={bidAuditData?.ref_data?.next_audit_number ? 'bid-data-shuffle' : 'bid-data-shuffle-disabled'}
          >
            {'Next Audit '}
            <FA name="chevron-right" />
          </a>
        </span>
      </div>

      <div className="bid-data--results">
        <div className={'ba-navTabs'}>
          <InteractiveElement
            onClick={() => setDataTabActive(true)}
            className={`ba-table-tab ${dataTabActive ? 'ba-table-tab-active' : ''}`}
          >
            <div className="ba-tab tab-active">
              {'Bid Data'}
            </div>
          </InteractiveElement>

          <InteractiveElement
            onClick={() => setDataTabActive(false)}
            className={`ba-table-tab ${dataTabActive ? '' : 'ba-table-tab-active'}`}
          >
            <div className="tab tab-active">
              {'MDS'}
            </div>
          </InteractiveElement>
        </div>

        {getOverlay() ||
            <>
              { dataTabActive ? bidDataTable() : mdsTable() }
            </>
        }
      </div>

      <ReactModal open={openModal} setOpen={setOpenModal}>
        <BidAuditHTFModal
          id={HTFPositionID}
          setOpen={setOpenModal}
          position={HTFPositionNumber}
          onSuccessFunction={() => dispatch(bidAuditGetAuditFetchData(getQuery()))}
        />
      </ReactModal>
    </div>
  );
};


BidAuditData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cycleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      auditId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

BidAuditData.defaultProps = {
  match: {},
};

export default withRouter(BidAuditData);
