import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, find, get, includes } from 'lodash';
import PropTypes from 'prop-types';
import { useDataLoader, useDidMountEffect } from 'hooks';
import BackButton from 'Components/BackButton';
import FA from 'react-fontawesome';
import { AGENDA_ITEM, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { formatDate } from 'utilities';
import { positionsFetchData } from 'actions/positions';
import RemarksPill from '../RemarksPill';
import api from '../../../api';

const AgendaItemMaintenancePane = (props) => {
  const dispatch = useDispatch();

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
    isCreate,
  } = props;

  const defaultText = '';

  const { data: statusData, error: statusError, loading: statusLoading } = useDataLoader(api().get, '/fsbid/agenda/statuses/');
  const { data: panelCatData, error: panelCatError, loading: panelCatLoading } = useDataLoader(api().get, '/panel/categories/');
  const { data: panelDatesData, error: panelDatesError, loading: panelDatesLoading } = useDataLoader(api().get, '/panel/dates/');
  const { asgSepBidResults$, asgSepBidError, asgSepBidLoading } = asgSepBidData;
  const asgSepBids = asgSepBidResults$ || [];

  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const statuses = get(statusData, 'data.results') || [];
  const panelCategories = get(panelCatData, 'data.results') || [];
  const panelDates = get(panelDatesData, 'data.results') || [];

  const panelDatesML = filter(panelDates, (p) => p.pmt_code === 'ML');
  const panelDatesID = filter(panelDates, (p) => p.pmt_code === 'ID');

  const [asgSepBid, setAsgSepBid] = useState(''); // local state just used for select animation
  const [asgSepBidSelectClass, setAsgSepBidSelectClass] = useState('');

  const agendaItemStatus = get(agendaItem, 'status_full') || '';
  const [selectedStatus, setStatus] = useState(isCreate ? get(statuses, '[0].code') || '' : agendaItemStatus);

  const [selectedPositionNumber, setPositionNumber] = useState('');
  const [posNumError, setPosNumError] = useState(false);
  const [inputClass, setInputClass] = useState('input-default');

  const [selectedPanelCat, setPanelCat] = useState(get(panelCategories, '[0].mic_code') || '');
  const [selectedPanelMLDate, setPanelMLDate] = useState('');
  const [selectedPanelIDDate, setPanelIDDate] = useState('');

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

  return (
    <div className="ai-maintenance-header">
      { !unitedLoading &&
        <>
          <div className="back-save-btns-container">
            <BackButton />
            <button className="save-ai-btn" onClick={saveAI}>
              Save Agenda Item
            </button>
          </div>
          <div className="ai-maintenance-header-dd">
            {
              !asgSepBidLoading && !asgSepBidError &&
                <select
                  className={`${asgSepBidSelectClass}${legLimit ? ' asg-disabled' : ''}`}
                  defaultValue={asgSepBids}
                  onChange={(e) => addAsgSepBid(get(e, 'target.value'))}
                  value={`${legLimit ? 'legLimit' : asgSepBid}`}
                  disabled={legLimit}
                >
                  <option selected value={''}>
                    Employee Assignments, Separations, and Bids
                  </option>
                  <option hidden value={'legLimit'}>
                    Leg Limit of 10 Reached
                  </option>
                  {
                    asgSepBids.map(a => (
                      <option key={a.pos_num} value={a.pos_num}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        '{a.status || defaultText}'
                          in {a.org || defaultText} -&nbsp;
                        {a.pos_title || defaultText}({a.pos_num || defaultText})
                      </option>
                    ))
                  }
                </select>
            }
            {
              !statusLoading && !statusError &&
                <div>
                  <label htmlFor="ai-maintenance-status">Status:</label>
                  <select
                    id="ai-maintenance-status"
                    defaultValue={selectedStatus}
                    onChange={(e) => setStatus(get(e, 'target.value'))}
                    value={selectedStatus}
                  >
                    <option selected value={''}>
                      Agenda Item Status
                    </option>
                    {
                      statuses.map(a => (
                        <option key={a.code} value={a.desc_text}>{a.desc_text}</option>
                      ))
                    }
                  </select>
                </div>
            }
            <div>
              <label htmlFor="position number">Add Position Number:</label>
              <input
                name="add"
                className={`add-pos-num-input ${inputClass}`}
                onChange={value => setPositionNumber(value.target.value)}
                onKeyPress={e => (e.key === 'Enter' ? addPositionNum() : null)}
                type="add"
                value={`${legLimit ? 'Leg Limit of 10' : selectedPositionNumber}`}
                disabled={legLimit}
              />
              <InteractiveElement
                className={`add-pos-num-icon ${legLimit ? 'icon-disabled' : ''}`}
                onClick={addPositionNum}
                role="button"
                title="Add position"
                type="span"
              >
                <FA name="plus" />
              </InteractiveElement>
            </div>
            {
              !panelCatLoading && !panelCatError &&
                <div>
                  <label htmlFor="ai-maintenance-status">Report Category:</label>
                  <select
                    id="ai-maintenance-category"
                    defaultValue={selectedPanelCat}
                    onChange={(e) => setPanelCat(get(e, 'target.value'))}
                    value={selectedPanelCat}
                  >
                    <option selected value={''}>
                      Meeting Item Category
                    </option>
                    {
                      panelCategories.map(a => (
                        <option value={get(a, 'mic_code')}>{get(a, 'mic_desc_text')}</option>
                      ))
                    }
                  </select>
                </div>
            }
            {
              !panelDatesLoading && !panelDatesError &&
                <div>
                  <label htmlFor="ai-maintenance-date">Panel Date:</label>
                  <select
                    id="ai-maintenance-status"
                    onChange={(e) => setDate(get(e, 'target.value'), true)}
                    value={selectedPanelMLDate}
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
                    id="ai-maintenance-status"
                    onChange={(e) => setDate(get(e, 'target.value'), false)}
                    value={selectedPanelIDDate}
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
            }
          </div>
          <div className="usa-form remarks">
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
                    isEditable
                    remark={remark}
                    key={remark.seq_num}
                    updateSelection={updateSelection}
                  />
                ))
              }
            </div>
          </div>
          <div className="usa-form corrections">
            <label htmlFor="corrections">Corrections:</label>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ut tincidunt tincidunt imperdiet. Proin nisi diam, tincidunt rhoncus placerat
              et, fringilla non ligula. Suspendisse sed nibh nisl. Cras varius lacinia
            </div>
          </div>
        </>
      }
    </div>
  );
};

AgendaItemMaintenancePane.propTypes = {
  perdet: PropTypes.string.isRequired,
  asgSepBidData: PropTypes.shape({
    asgSepBidResults$: PropTypes.arrayOf({}),
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
  isCreate: PropTypes.bool,
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
  isCreate: true,
};

export default AgendaItemMaintenancePane;
