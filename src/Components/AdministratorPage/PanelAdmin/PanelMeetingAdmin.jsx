import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Spinner from 'Components/Spinner';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { panelMeetingsFetchData, panelMeetingsFiltersFetchData } from 'actions/panelMeetings';
import { runPanelMeeting } from 'actions/panelMeetingAdmin';
import { submitPanelMeeting } from '../../Panel/helpers';
import { userHasPermissions } from '../../../utilities';
import { panelMeetingAgendasFetchData } from '../../../actions/panelMeetingAgendas';

const PanelMeetingAdmin = (props) => {
  const { history, panelMeetingsResults, panelMeetingsIsLoading, pmSeqNum } = props;
  const isCreate = !pmSeqNum;

  const dispatch = useDispatch();


  // ============= Retrieve Data =============

  const panelMeetingsResults$ = panelMeetingsResults?.results?.[0] ?? {};
  const { pmt_code, pms_desc_text, panelMeetingDates } = panelMeetingsResults$;

  const panelMeetingDate$ = panelMeetingDates?.find(x => x.mdt_code === 'MEET');
  const prelimCutoff$ = panelMeetingDates?.find(x => x.mdt_code === 'CUT');
  const prelimRunTime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFF');
  const addendumCutoff$ = panelMeetingDates?.find(x => x.mdt_code === 'ADD');
  const addendumRunTime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFFA');

  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  const runPreliminarySuccess = useSelector(state => state.runOfficialPreliminarySuccess);
  const runAddendumSuccess = useSelector(state => state.runOfficialAddendumSuccess);

  const agendas = useSelector(state => state.panelMeetingAgendas);
  const agendasIsLoading = useSelector(state => state.panelMeetingAgendasFetchDataLoading);

  const subsequentPanels = useSelector(state => state.panelMeetings);
  const subsequentPanelsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const subsequentPanel = subsequentPanels[0];

  console.log(subsequentPanel);

  const isLoading =
    panelMeetingsIsLoading ||
    panelMeetingsFiltersIsLoading ||
    agendasIsLoading ||
    subsequentPanelsIsLoading;

  useEffect(() => {
    dispatch(panelMeetingsFiltersFetchData());
    dispatch(panelMeetingAgendasFetchData({}, pmSeqNum));
    // dispatch(panelMeetingsFetchData({
    //   limit: undefined,
    //   page: undefined,
    //   type: pmt_code,
    //   status: undefined,
    //   'panel-date-start': panelMeetingDate$,
    //   'panel-date-end': undefined,
    // }));
  }, []);

  // ============= Input Management =============

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState();
  const [panelMeetingStatus, setPanelMeetingStatus] = useState('Initiated');
  const [prelimCutoff, setPrelimCutoff] = useState();
  const [addendumCutoff, setAddendumCutoff] = useState();
  const [prelimRuntime, setPrelimRuntime] = useState();
  const [addendumRuntime, setAddendumRuntime] = useState();

  const setInitialInputResults = () => {
    setPanelMeetingType(pmt_code);
    setPanelMeetingDate(new Date(panelMeetingDate$.pmd_dttm));
    setPanelMeetingStatus(pms_desc_text);

    setPrelimCutoff(new Date(prelimCutoff$.pmd_dttm));
    setAddendumCutoff(new Date(addendumCutoff$.pmd_dttm));

    if (prelimRunTime$) {
      setPrelimRuntime(new Date(prelimRunTime$.pmd_dttm));
    }
    if (addendumRunTime$) {
      setAddendumRuntime(new Date(addendumRunTime$.pmd_dttm));
    }
  };

  useEffect(() => {
    if (!isCreate && !!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
      setInitialInputResults();
    }
  }, [panelMeetingsResults]);

  const selectPanelMeetingDate = (date) => {
    const prelimCutoffMins = 2875;
    const addendumCutoffMins = 1435;

    setPanelMeetingDate(date);
    setPrelimCutoff(subMinutes(date, prelimCutoffMins));
    setAddendumCutoff(subMinutes(date, addendumCutoffMins));
  };

  const clear = () => {
    if (!isCreate && !!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
      setInitialInputResults();
    } else {
      setPanelMeetingType('interdivisional');
      setPanelMeetingDate('');
      setPrelimCutoff('');
      setAddendumCutoff('');
      setPrelimRuntime('');
      setAddendumRuntime('');
      setPanelMeetingStatus('Initiated');
    }
  };


  // ============= Submission Management =============

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

  useEffect(() => {
    if (!createMeetingLoading && !createMeetingErrored && createMeetingResults.length) {
      history.push('/profile/ao/panelmeetings');
    }
  }, [createMeetingResults]);

  // Submit current timestamp for specified field without saving other pending changes
  const handleRun = (field) => {
    const currTimestamp = new Date();
    if (field === 'prelimRuntime') {
      setPrelimRuntime(currTimestamp);
      dispatch(runPanelMeeting(pmSeqNum, 'preliminary'));
    }
    if (field === 'addendumRuntime') {
      setAddendumRuntime(currTimestamp);
      dispatch(runPanelMeeting(pmSeqNum, 'addendum'));
    }
    if (runPreliminarySuccess || runAddendumSuccess) {
      dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
    }
  };

  const submit = () => {
    dispatch(submitPanelMeeting(panelMeetingsResults$,
      {
        panelMeetingType,
        panelMeetingDate,
        prelimCutoff,
        addendumCutoff,
        prelimRuntime,
        addendumRuntime,
        panelMeetingStatus,
      },
    ));
  };

  // ============= Form Conditions =============

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = !userHasPermissions(['superuser'], userProfile.permission_groups);

  const beforePanelMeetingDate = (
    panelMeetingDate$ ? (new Date(panelMeetingDate$.pmd_dttm) - new Date() > 0) : true
  );
  const beforePrelimCutoff = (
    prelimCutoff$ ? (new Date(prelimCutoff$.pmd_dttm) - new Date() > 0) : true
  );
  const beforeAddendumCutoff = (
    addendumCutoff$ ? (new Date(addendumCutoff$.pmd_dttm) - new Date() > 0) : true
  );

  // Only admins can access editable fields and run buttons
  // Additional business rules must be followed depending on the stage of the panel meeting

  const disableMeetingType = !isSuperUser &&
    (!isCreate && !beforeAddendumCutoff);

  const disableStatus = !isSuperUser &&
    (isCreate || !beforeAddendumCutoff);

  const disablePanelMeetingDate = !isSuperUser &&
    (!isCreate && !beforePanelMeetingDate);

  const disablePrelimCutoff = !isSuperUser &&
    (!isCreate && !beforePrelimCutoff);

  const disableAddendumCutoff = !isSuperUser &&
    (!isCreate && !beforeAddendumCutoff);

  const disableRunPrelim = () => {
    let preconditioned = true;
    agendas.forEach(a => {
      // Approved Agenda Items must be in Off-Panel Meeting Category
      if (a.status_short === 'APR' && a.meeting_category !== 'O') {
        preconditioned = false;
      }
      // Agenda Items must be Approved, Ready, Not Ready, or Deferred
      if (
        a.status_short !== 'APR' &&
        a.status_short !== 'RDY' &&
        a.status_short !== 'NR' &&
        a.status_short !== 'DEF'
      ) {
        preconditioned = false;
      }
    });
    return !isSuperUser &&
      (isCreate || beforePrelimCutoff || !beforePanelMeetingDate || !preconditioned);
  };

  const disableRunAddendum = () => {
    let preconditioned = true;
    agendas.forEach(a => {
      // Agenda Items must not be Disapproved or Not Ready
      if (a.status_short === 'DIS' || a.status_short === 'NR') {
        preconditioned = false;
      }
    });
    return !isSuperUser &&
      (isCreate || beforeAddendumCutoff || !beforePanelMeetingDate || !preconditioned);
  };

  const disableClear = !isSuperUser &&
    (!isCreate && !beforePanelMeetingDate);

  const disableSave = !isSuperUser &&
    (!isCreate && !beforePanelMeetingDate);

  return (
    (isLoading) ?
      <Spinner type="panel-admin-remarks" size="small" /> :
      <div className="admin-panel-meeting">
        <div>
          <div className="admin-panel-grid-row">
            <div className="panel-meeting-field">
              <label htmlFor="meeting-type">Meeting Type</label>
              <select
                disabled={disableMeetingType}
                className="select-dropdown"
                value={panelMeetingType}
                onChange={(e) => setPanelMeetingType(e.target.value)}
              >
                <option value={'interdivisional'}>Interdivisional</option>
                <option value={'midlevel'}>Mid-Level</option>
              </select>
            </div>
            <div className="panel-meeting-field">
              <label htmlFor="status">Status</label>
              <select
                disabled={disableStatus}
                className="select-dropdown"
                value={panelMeetingStatus}
                onChange={(e) => setPanelMeetingStatus(e.target.value)}
              >
                {
                  panelMeetingsFilters?.panelStatuses?.map(a => (
                    <option value={a.text} key={a.text}>{a.text}</option>
                  ))
                }
              </select>
            </div>
            <div className="panel-meeting-field">
              <label htmlFor="panel-meeting-date">Panel Meeting Date</label>
              <div className="date-picker-wrapper larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <DatePicker
                  disabled={disablePanelMeetingDate}
                  selected={panelMeetingDate}
                  onChange={selectPanelMeetingDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  ref={datePickerRef}
                />
              </div>
            </div>
          </div>
          <div className="admin-panel-grid-row">
            <div className="panel-meeting-field">
              <label htmlFor="preliminary-cutoff-date">Official Preliminary Cutoff</label>
              <div className="date-picker-wrapper larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <DatePicker
                  disabled={disablePrelimCutoff}
                  selected={prelimCutoff}
                  onChange={(date) => setPrelimCutoff(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  ref={datePickerRef}
                />
              </div>
            </div>
            <div className="panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Official Addendum Cutoff</label>
              <div className="date-picker-wrapper larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <DatePicker
                  disabled={disableAddendumCutoff}
                  selected={addendumCutoff}
                  onChange={(date) => setAddendumCutoff(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  ref={datePickerRef}
                />
              </div>
            </div>
          </div>
          <div className="admin-panel-grid-row">
            <div className="panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Official Preliminary Run Time</label>
              <div className="date-picker-wrapper larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <DatePicker
                  disabled
                  selected={prelimRuntime}
                  onChange={(date) => setPrelimRuntime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  ref={datePickerRef}
                />
              </div>
              <button
                disabled={disableRunPrelim()}
                className="text-button"
                onClick={() => { handleRun('prelimRuntime'); }}
              >
                Run Official Preliminary
              </button>
            </div>
            <div className="panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Official Addendum Run Time</label>
              <div className="date-picker-wrapper larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
                <DatePicker
                  disabled
                  selected={addendumRuntime}
                  onChange={(date) => setAddendumRuntime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  ref={datePickerRef}
                />
              </div>
              <button
                disabled={disableRunAddendum()}
                className="text-button"
                onClick={() => { handleRun('addendumRuntime'); }}
              >
                Run Official Addendum
              </button>
            </div>
          </div>
        </div>
        <div className="position-form--actions">
          <button onClick={clear} disabled={disableClear}>Clear</button>
          <button onClick={submit} disabled={disableSave}>{isCreate ? 'Create' : 'Save'}</button>
        </div>
      </div>
  );
};

PanelMeetingAdmin.propTypes = {
  history: HISTORY_OBJECT.isRequired,
  pmSeqNum: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  panelMeetingsResults: PropTypes.shape(),
  panelMeetingsIsLoading: PropTypes.bool,
};

PanelMeetingAdmin.defaultProps = {
  match: {},
  pmSeqNum: false,
  panelMeetingsResults: undefined,
  panelMeetingsIsLoading: false,
};

export default withRouter(PanelMeetingAdmin);
