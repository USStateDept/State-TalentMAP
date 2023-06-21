import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InteractiveElement from 'Components/InteractiveElement';
import { gsaLocationsFetchData } from 'actions/gsaLocations';
import { filter, find, get, includes } from 'lodash';
import PropTypes from 'prop-types';
import { useDataLoader, useDidMountEffect } from 'hooks';
import BackButton from 'Components/BackButton';
import FA from 'react-fontawesome';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AGENDA_ITEM, AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { formatDate } from 'utilities';
import { positionsFetchData } from 'actions/positions';
import RemarksPill from '../RemarksPill';
import { dateTernary } from '../Constants';
import api from '../../../api';
import { FP as FrequentPositionsTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import SearchLocationsModal from '../SearchLocationsModal';


const AgendaItemMaintenancePane = (props) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const {
    onAddRemarksClick,
    perdet,
    setParentLoadingState,
    unitedLoading,
    userRemarks,
    updateSelection,
    sendMaintenancePaneInfo,
    legCount,
    saveAI,
    sendAsgSepBid,
    asgSepBidData,
    agendaItem,
    isReadOnly,
    updateResearchPaneTab,
    setLegsContainerExpanded,
    AIvalidation,
    AIvalidationIsLoading,
    AIvalidationHasErrored,
  } = props;

  const defaultText = '';

  const { data: statusData, error: statusError, loading: statusLoading } = useDataLoader(api().get, '/fsbid/agenda/statuses/');
  const { data: panelCatData, error: panelCatError, loading: panelCatLoading } = useDataLoader(api().get, '/fsbid/panel/reference/categories/');
  const { data: panelDatesData, error: panelDatesError, loading: panelDatesLoading } = useDataLoader(api().get, '/fsbid/panel/reference/dates/');
  const { asgSepBidResults$, asgSepBidError, asgSepBidLoading } = asgSepBidData;
  const asgSepBids = asgSepBidResults$ || [];

  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);
  const locations = useSelector(state => state.gsaLocations);
  // local state just used for select animation
  const [validationButton, setValidationButton] = useState({});

  const statuses = get(statusData, 'data.results') || [];
  statuses.sort((a, b) => (a.desc_text > b.desc_text) ? 1 : -1);

  const panelCategories = get(panelCatData, 'data.results') || [];
  const panelDates = get(panelDatesData, 'data.results') || [];

  const panelDatesML = filter(panelDates, (p) => p.pmt_code === 'ML');
  const panelDatesID = filter(panelDates, (p) => p.pmt_code === 'ID');

  const [asgSepBid, setAsgSepBid] = useState(''); // local state just used for select animation
  const [asgSepBidSelectClass, setAsgSepBidSelectClass] = useState('');

  const [selectedStatus, setStatus] = useState(get(agendaItem, 'status_full') || '');

  const [selectedPositionNumber, setPositionNumber] = useState('');
  const [posNumError, setPosNumError] = useState(false);
  const [inputClass, setInputClass] = useState('input-default');

  const [selectedPanelCat, setPanelCat] = useState(get(agendaItem, 'report_category.code') || '');

  const isPanelTypeML = get(agendaItem, 'panel_date_type') === 'ML';
  const isPanelTypeID = get(agendaItem, 'panel_date_type') === 'ID';
  const panelMeetingSeqNum = get(agendaItem, 'panel_meeting_seq_num') || '';
  const agendaItemPanelMLSeqNum = isPanelTypeML ? panelMeetingSeqNum : '';
  const agendaItemPanelIDSeqNum = isPanelTypeID ? panelMeetingSeqNum : '';
  const [selectedPanelMLDate, setPanelMLDate] = useState(agendaItemPanelMLSeqNum);
  const [selectedPanelIDDate, setPanelIDDate] = useState(agendaItemPanelIDSeqNum);

  const createdByFirst = agendaItem?.creators?.first_name || '';
  const createdByLast = agendaItem?.creators?.last_name ? `${agendaItem.creators.last_name},` : '';
  const createDate = dateTernary(agendaItem?.creator_date);
  const modifiedByFirst = agendaItem?.updaters?.first_name || '';
  const modifiedByLast = agendaItem?.updaters?.last_name ? `${agendaItem.updaters.last_name},` : '';
  const modifyDate = dateTernary(agendaItem?.modifier_date);

  const [city, setCity] = useState();
  const [state$, setState$] = useState();
  const [country, setCountry] = useState();
  const [page, setPage] = useState(1);

  const legLimit = legCount >= 10;

  useEffect(() => {
    setParentLoadingState(includes([asgSepBidLoading,
      statusLoading, panelCatLoading, panelDatesLoading], true));
  }, [asgSepBidLoading,
    statusLoading,
    panelCatLoading,
    panelDatesLoading]);

  useDidMountEffect(() => {
    setPositionNumber('');
  }, [pos_results]);

  useDidMountEffect(() => {
    if (pos_results_errored) {
      setPosNumError(true);
    }
  }, [pos_results_errored]);

  useEffect(() => {
    if (legLimit) {
      setInputClass('input-disabled');
    } else if (pos_results_loading) {
      setInputClass('loading-animation');
    } else if (posNumError) {
      setInputClass('input-error');
    } else {
      setInputClass('input-default');
    }
  }, [legCount, pos_results_loading, posNumError]);

  useEffect(() => {
    sendMaintenancePaneInfo({
      personDetailId: perdet,
      panelMeetingId: selectedPanelMLDate.concat(selectedPanelIDDate),
      remarks: userRemarks || [],
      agendaStatusCode: selectedStatus || '',
      panelMeetingCategory: selectedPanelCat || '',
    });
  }, [selectedPanelMLDate,
    selectedPanelIDDate,
    userRemarks,
    selectedStatus,
    selectedPanelCat]);

  useEffect(() => {
    const aiV = AIvalidation?.allValid;
    const buttonMetadata = {
      classNames: 'save-ai-btn',
      clickFunction: saveAI,
      disabled: isReadOnly,
      text: 'Save Agenda Item',
      children: '',
    };

    if (!aiV || AIvalidationHasErrored) {
      buttonMetadata.classNames = 'ai-validation-errored';
      buttonMetadata.clickFunction = () => {};
      buttonMetadata.disabled = true;
      buttonMetadata.text = 'AI Validation Failed';
    }

    if (AIvalidationIsLoading) {
      buttonMetadata.classNames = 'save-ai-btn button-tiny-loading-spinner min-width-155';
      buttonMetadata.clickFunction = () => {};
      buttonMetadata.disabled = true;
      buttonMetadata.text = 'Validating AI';
      buttonMetadata.children = (<span className="tiny-loading-spinner" />);
    }

    setValidationButton(buttonMetadata);
  }, [
    AIvalidation,
    AIvalidationIsLoading,
    AIvalidationHasErrored,
  ]);

  const addAsgSepBid = (k) => {
    setAsgSepBidSelectClass('asg-animation');
    setAsgSepBid(k);
    sendAsgSepBid(find(asgSepBids, { pos_num: k }));
    setTimeout(() => {
      setAsgSepBid('');
      sendAsgSepBid({});
      setAsgSepBidSelectClass('');
    }, 2000);
  };

  const handleSearch = () => {
    const locQuery = {
      city,
      state: state$,
      country,
      page,
      limit: 10,
    };
    dispatch(gsaLocationsFetchData(locQuery));
  };

  useEffect(() => {
    handleSearch();
  }, [city, state$, country, page]);

  const openModal = () => {
    MySwal.fire({
      title: <p>Search Locations</p>,
      width: 800,
      didRender: () => (
        <SearchLocationsModal
          setCity={(e) => setCity(e.target.value)}
          setState$={(e) => setState$(e.target.value)}
          setCountry={(e) => setCountry(e.target.value)}
          setPage={(p) => setPage(p.page)}
          locations={locations}
        />
      ),
    });
  };

  const addPositionNum = () => {
    if (!legLimit) {
      setPosNumError(false);
      if (selectedPositionNumber) {
        dispatch(positionsFetchData(`limit=50&page=1&position_num=${selectedPositionNumber}`));
      }
    }
  };

  const setDate = (seq_num, isML) => {
    if (isML) {
      setPanelIDDate('');
      setPanelMLDate(seq_num);
    } else {
      setPanelMLDate('');
      setPanelIDDate(seq_num);
    }
  };

  const onAddFPClick = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(FrequentPositionsTabID);
  };

  return (
    <div className="ai-maintenance-header">
      { !unitedLoading &&
        <>
          <div className="back-save-btns-container">
            <BackButton />
            <button
              className={validationButton?.classNames}
              onClick={validationButton.clickFunction}
              disabled={validationButton?.disabled}
            >
              {validationButton?.children}
              {validationButton?.text}
            </button>
          </div>
          <div className="aim-timestamp-wrapper">
            <span className="aim-timestamp">
              {`Created: ${createdByLast} ${createdByFirst}`}
              <span className="date">{` ${agendaItem?.creator_date ? '-' : ''} ${createDate}`}</span>
            </span>
            <span className="aim-timestamp">
              {`Modified: ${modifiedByLast} ${modifiedByFirst}`}
              <span className="date">{` ${agendaItem?.modifier_date ? '-' : ''} ${modifyDate}`}</span>
            </span>
          </div>
          <div className="ai-maintenance-header-dd">
            {
              !statusLoading && !statusError &&
                <div>
                  <label className="select-label" htmlFor="ai-maintenance-status">Status:</label>
                  <div className="error-message-wrapper">
                    <div className="validation-error-message-label validation-error-message width-280">
                      {AIvalidation?.status?.errorMessage}
                    </div>
                    <select
                      className={`aim-select ${AIvalidation?.status?.valid ? '' : 'validation-error-border'}`}
                      id="ai-maintenance-status"
                      onChange={(e) => setStatus(get(e, 'target.value'))}
                      value={selectedStatus}
                      disabled={isReadOnly}
                    >
                      <option value={''}>
                        Agenda Item Status
                      </option>
                      {
                        statuses.map(a => (
                          <option key={a.code} value={a.desc_text}>{a.desc_text}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
            }
            {
              !panelCatLoading && !panelCatError &&
                <div>
                  <label className="select-label" htmlFor="ai-maintenance-report-category">Report Category:</label>
                  <div className="error-message-wrapper">
                    <div className="validation-error-message-label validation-error-message width-280">
                      {AIvalidation?.reportCategory?.errorMessage}
                    </div>
                    <select
                      className={`aim-select ${AIvalidation?.reportCategory?.valid ? '' : 'validation-error-border'}`}
                      id="ai-maintenance-category"
                      onChange={(e) => setPanelCat(get(e, 'target.value'))}
                      value={selectedPanelCat}
                      disabled={isReadOnly}
                    >
                      <option value={''}>
                        Meeting Item Category
                      </option>
                      {
                        panelCategories.map(a => (
                          <option key={a.mic_code} value={get(a, 'mic_code')}>{get(a, 'mic_desc_text')}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
            }
            {
              !panelDatesLoading && !panelDatesError &&
                <div>
                  <label className="select-label" htmlFor="ai-maintenance-date">Panel Date:</label>
                  <div className="error-message-wrapper">
                    <div className="validation-error-message-label validation-error-message width-280">
                      {AIvalidation?.panelDate?.errorMessage}
                    </div>
                    <div>
                      <select
                        className={`aim-select-small ${AIvalidation?.panelDate?.valid ? '' : 'validation-error-border'}`}
                        id="ai-maintenance-status"
                        onChange={(e) => setDate(get(e, 'target.value'), true)}
                        value={selectedPanelMLDate}
                        disabled={isReadOnly}
                      >
                        <option value={''}>ML Dates</option>
                        {
                          panelDatesML.map(a => (
                            <option
                              key={get(a, 'pm_seq_num')}
                              value={get(a, 'pm_seq_num')}
                            >
                              {get(a, 'pmt_code')} - {formatDate(get(a, 'pmd_dttm'))}
                            </option>
                          ))
                        }
                      </select>
                      <select
                        className={`aim-select-small ${AIvalidation?.panelDate?.valid ? '' : 'validation-error-border'}`}
                        id="ai-maintenance-status"
                        onChange={(e) => setDate(get(e, 'target.value'), false)}
                        value={selectedPanelIDDate}
                        disabled={isReadOnly}
                      >
                        <option value={''}>ID Dates</option>
                        {
                          panelDatesID.map(a => (
                            <option
                              key={get(a, 'pm_seq_num')}
                              value={get(a, 'pm_seq_num')}
                            >
                              {get(a, 'pmt_code')} - {formatDate(get(a, 'pmd_dttm'))}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
            }
          </div>
          <div className="remarks">
            <label htmlFor="remarks">Remarks:</label>
            <div className="remarks-container">
              <InteractiveElement
                onClick={onAddRemarksClick}
                type="span"
                role="button"
                className="save-ai-btn"
                title="Add remark"
                id="add-remark"
              >
                <FA name="plus" />
              </InteractiveElement>
              {
                userRemarks.map(remark => (
                  <RemarksPill
                    isEditable={!isReadOnly}
                    remark={remark}
                    key={remark.seq_num}
                    updateSelection={updateSelection}
                    fromAIM
                  />
                ))
              }
            </div>
          </div>
          <div className="add-legs-container">
            <div className="add-legs-header">Add Legs
              <div className={`${AIvalidation?.legs?.allLegs?.valid ? 'hidden' : 'validation-error-message'}`}>
                {AIvalidation?.legs?.allLegs?.errorMessage}
              </div>
            </div>
            {
              !asgSepBidLoading && !asgSepBidError &&
                <select
                  className={`${asgSepBidSelectClass}${legLimit ? ' asg-disabled' : ''} asg-dropdown`}
                  onChange={(e) => addAsgSepBid(get(e, 'target.value'))}
                  value={`${legLimit ? 'legLimit' : asgSepBid}`}
                  disabled={legLimit || isReadOnly}
                >
                  <option value={''}>
                    Employee Assignments, Separations, and Bids
                  </option>
                  <option hidden value={'legLimit'}>
                    Leg Limit of 10 Reached
                  </option>
                  {
                    asgSepBids.map((a, i) => {
                      const keyId = i;
                      return (
                        <option key={`${a.pos_title}-${keyId}`} value={a.pos_num}>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                        '{a.status || defaultText}'
                          in {a.org || defaultText} -&nbsp;
                          {a.pos_title || defaultText}({a.pos_num || defaultText})
                        </option>
                      );
                    })
                  }
                </select>
            }
            <div className="position-number-container">
              <input
                name="add"
                className={`add-pos-num-input ${inputClass}`}
                onChange={value => setPositionNumber(value.target.value)}
                onKeyPress={e => (e.key === 'Enter' ? addPositionNum() : null)}
                type="add"
                value={`${legLimit ? 'Leg Limit of 10' : selectedPositionNumber}`}
                disabled={legLimit || isReadOnly}
                placeholder="Add by Position Number"
              />
              <InteractiveElement
                className={`add-pos-num-icon ${(legLimit || isReadOnly) ? 'icon-disabled' : ''}`}
                onClick={addPositionNum}
                role="button"
                title="Add position"
                type="span"
              >
                <FA name="plus" />
              </InteractiveElement>
            </div>
            <a className="add-fp-link" aria-hidden="true" onClick={() => onAddFPClick()}>Open Frequent Positions Tab</a>
          </div>
          <button
            name=""
            onClick={openModal}
          >
            <FA name="plus" /> Add Separation
          </button>
        </>
      }
    </div>
  );
};

AgendaItemMaintenancePane.propTypes = {
  perdet: PropTypes.string.isRequired,
  asgSepBidData: PropTypes.shape({
    asgSepBidResults$: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    asgSepBidError: PropTypes.bool,
    asgSepBidLoading: PropTypes.bool,
  }),
  onAddRemarksClick: PropTypes.func,
  setParentLoadingState: PropTypes.func,
  unitedLoading: PropTypes.bool,
  userRemarks: PropTypes.arrayOf(
    PropTypes.shape({
      seq_num: PropTypes.number,
      rc_code: PropTypes.string,
      order_num: PropTypes.number,
      short_desc_text: PropTypes.string,
      mutually_exclusive_ind: PropTypes.string,
      text: PropTypes.string,
      active_ind: PropTypes.string,
      remark_inserts: PropTypes.arrayOf(
        PropTypes.shape({
          rirmrkseqnum: PropTypes.number,
          riseqnum: PropTypes.number,
          riinsertiontext: PropTypes.string,
        }),
      ),
      ari_insertions: PropTypes.shape({}),
    }),
  ),
  updateSelection: PropTypes.func,
  sendMaintenancePaneInfo: PropTypes.func,
  sendAsgSepBid: PropTypes.func,
  saveAI: PropTypes.func,
  legCount: PropTypes.number,
  agendaItem: AGENDA_ITEM.isRequired,
  isReadOnly: PropTypes.bool,
  updateResearchPaneTab: PropTypes.func,
  setLegsContainerExpanded: PropTypes.func,
  AIvalidation: AI_VALIDATION,
  AIvalidationIsLoading: PropTypes.bool,
  AIvalidationHasErrored: PropTypes.bool,
};

AgendaItemMaintenancePane.defaultProps = {
  asgSepBidData: {},
  onAddRemarksClick: EMPTY_FUNCTION,
  setParentLoadingState: EMPTY_FUNCTION,
  unitedLoading: true,
  userRemarks: [],
  addToSelection: EMPTY_FUNCTION,
  updateSelection: EMPTY_FUNCTION,
  sendMaintenancePaneInfo: EMPTY_FUNCTION,
  sendAsgSepBid: EMPTY_FUNCTION,
  saveAI: EMPTY_FUNCTION,
  legCount: 0,
  isReadOnly: false,
  updateResearchPaneTab: EMPTY_FUNCTION,
  setLegsContainerExpanded: EMPTY_FUNCTION,
  AIvalidation: {
    allValid: false,
  },
  AIvalidationIsLoading: false,
  AIvalidationHasErrored: false,
};

export default AgendaItemMaintenancePane;
