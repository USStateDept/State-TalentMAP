import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Spinner from 'Components/Spinner';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { panelMeetingsFiltersFetchData } from 'actions/panelMeetings';
import { submitPanelMeeting } from '../../Panel/helpers';
import { userHasPermissions } from '../../../utilities';

const PanelMeetingAdmin = (props) => {
  const { history, panelMeetingsResults, panelMeetingsIsLoading, pmSeqNum } = props;
  const isCreate = !pmSeqNum;

  const dispatch = useDispatch();


  // ============= Retrieve Data =============

  const panelMeetingsResults$ = panelMeetingsResults?.results?.[0] ?? {};
  const { pmt_code, pms_desc_text, panelMeetingDates } = panelMeetingsResults$;

  const prelimCutoff$ = panelMeetingDates?.find(x => x.mdt_code === 'CUT');
  const prelimRunTime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFF');
  const addendumCutoff$ = panelMeetingDates?.find(x => x.mdt_code === 'ADD');
  const addendumRunTime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFFA');

  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  useEffect(() => {
    dispatch(panelMeetingsFiltersFetchData());
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
    setPanelMeetingDate(new Date(panelMeetingDates?.find(x => x.mdt_code === 'MEET').pmd_dttm));
    setPanelMeetingStatus(pms_desc_text);

    setPrelimCutoff(new Date(prelimCutoff$.pmd_dttm));
    setAddendumCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'ADD').pmd_dttm));

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
      dispatch(submitPanelMeeting(panelMeetingsResults$,
        { prelimRuntime: currTimestamp },
      ));
    }
    if (field === 'addendumRuntime') {
      setAddendumRuntime(currTimestamp);
      dispatch(submitPanelMeeting(panelMeetingsResults$,
        { addendumRuntime: currTimestamp },
      ));
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

  const beforePrelimCutoff = (
    prelimCutoff$ ? (new Date(prelimCutoff$.pmd_dttm) - new Date() > 0) : true
  );
  const beforeAddendumCutoff = (
    addendumCutoff$ ? (new Date(addendumCutoff$.pmd_dttm) - new Date() > 0) : true
  );

  // Super Admins can manually edit any field, otherwise, certain fields
  // are restricted by preconditions determined by prior steps

  const disableMeetingType = !isSuperUser &&
    (!beforePrelimCutoff);

  const disableStatus = !isSuperUser &&
    (isCreate || !beforePrelimCutoff);

  const disablePanelMeetingDate = !isSuperUser &&
    (!beforePrelimCutoff);

  const disablePrelimCutoff = !isSuperUser &&
    (!beforePrelimCutoff);

  const disableAddendumCutoff = !isSuperUser &&
    (!beforePrelimCutoff);

  const disablePrelimRunTime = !isSuperUser &&
    (isCreate || !beforePrelimCutoff || prelimRunTime$);

  const disableRunPrelim =
    (isCreate || !beforePrelimCutoff);

  const disableAddendumRunTime = !isSuperUser &&
    (isCreate || !beforeAddendumCutoff || addendumRunTime$);

  const disableRunAddendum =
    (isCreate || !beforeAddendumCutoff);

  const disableClear = !isSuperUser &&
    (!beforeAddendumCutoff);

  const disableSave = !isSuperUser &&
    (!beforeAddendumCutoff);

  return (
    (panelMeetingsIsLoading || panelMeetingsFiltersIsLoading) ?
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
                  disabled={disablePrelimRunTime}
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
                disabled={disableRunPrelim}
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
                  disabled={disableAddendumRunTime}
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
                disabled={disableRunAddendum}
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
          <button onClick={submit} disabled={disableSave}>Save</button>
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
