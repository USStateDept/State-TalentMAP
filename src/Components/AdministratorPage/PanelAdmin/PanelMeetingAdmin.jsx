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
import { submitPanelMeeting } from '../../Panel/helpers';

const PanelMeetingAdmin = (props) => {
  const { history } = props;
  const pmSeqNum = props.match?.params?.pmSeqNum ?? false;
  const isCreate = !pmSeqNum;

  const panelMeetingsResults = useSelector(state => state.panelMeetings);
  const panelMeetingsResults$ = panelMeetingsResults?.results?.[0] ?? {};
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
    dispatch(panelMeetingsFiltersFetchData());
  }, []);

  const { pmt_code, pms_desc_text, panelMeetingDates } = panelMeetingsResults$;

  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState();
  const [panelMeetingStatus, setPanelMeetingStatus] = useState('Initiated');
  const [prelimCutoff, setPrelimCutoff] = useState();
  const [addendumCutoff, setAddendumCutoff] = useState();
  const [prelimRuntime, setPrelimRuntime] = useState();
  const [addendumRuntime, setAddendumRuntime] = useState();
  const [canEditFields, setCanEditFields] = useState(true);

  const setInitialInputResults = () => {
    setPanelMeetingType(pmt_code);
    setPanelMeetingDate(new Date(panelMeetingDates?.find(x => x.mdt_code === 'MEET').pmd_dttm));
    setPanelMeetingStatus(pms_desc_text);

    const prelimCutoff$ = panelMeetingDates?.find(x => x.mdt_code === 'CUT');
    const prelimRuntime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFF');
    const addendumRuntime$ = panelMeetingDates?.find(x => x.mdt_code === 'OFFA');

    setPrelimCutoff(new Date(prelimCutoff$.pmd_dttm));
    setAddendumCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'ADD').pmd_dttm));
    setCanEditFields(prelimCutoff$ ? (new Date(prelimCutoff$.pmd_dttm) - new Date() > 0) : true);

    if (prelimRuntime$) {
      setPrelimRuntime(new Date(prelimRuntime$.pmd_dttm));
    }
    if (addendumRuntime$) {
      setAddendumRuntime(new Date(addendumRuntime$.pmd_dttm));
    }
  };

  useEffect(() => {
    if (!isCreate && !!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
      setInitialInputResults();
    }
  }, [panelMeetingsResults]);

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

  const prelimCutoffMins = 2875;
  const addendumCutoffMins = 1435;

  useEffect(() => {
    if (!createMeetingLoading && !createMeetingErrored && createMeetingResults.length) {
      history.push('/profile/ao/panelmeetings');
    }
  }, [createMeetingResults]);

  // Submit current timestamp for specified field without saving other pending changes
  const handleRun = (field) => {
    dispatch(submitPanelMeeting(panelMeetingsResults$,
      {
        prelimRuntime: field === 'prelimRuntime' ?
          new Date() :
          new Date(panelMeetingDates?.find(x => x.mdt_code === 'OFF').pmd_dttm),
        addendumRuntime: field === 'addendumRuntime' ?
          new Date() :
          new Date(panelMeetingDates?.find(x => x.mdt_code === 'OFFA').pmd_dttm),
      },
    ));
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

  const selectPanelMeetingDate = (date) => {
    setPanelMeetingDate(date);
    setPrelimCutoff(subMinutes(date, prelimCutoffMins));
    setAddendumCutoff(subMinutes(date, addendumCutoffMins));
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  return (
    (panelMeetingsIsLoading || panelMeetingsFiltersIsLoading) ?
      <Spinner type="panel-admin-remarks" size="small" /> :
      <div className="admin-panel-meeting">
        <div>
          <div className="admin-panel-grid-row">
            <div className="panel-meeting-field">
              <label htmlFor="meeting-type">Meeting Type</label>
              <select
                disabled={!canEditFields}
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
                disabled={isCreate || !canEditFields}
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
                  disabled={!canEditFields}
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
                  disabled={!canEditFields}
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
                  disabled={!canEditFields}
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
                  disabled={!canEditFields || panelMeetingDates?.find(x => x.mdt_code === 'OFF')}
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
                disabled={!canEditFields || isCreate}
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
                  disabled={!canEditFields || panelMeetingDates?.find(x => x.mdt_code === 'OFFA')}
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
                disabled={!canEditFields || isCreate}
                className="text-button"
                onClick={() => { handleRun('addendumRuntime'); }}
              >
                Run Official Addendum
              </button>
            </div>
          </div>
        </div>
        <div className="position-form--actions">
          <button onClick={clear} disabled={!canEditFields}>Clear</button>
          <button onClick={submit} disabled={!canEditFields}>Save</button>
        </div>
      </div>
  );
};

PanelMeetingAdmin.propTypes = {
  history: HISTORY_OBJECT.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pmSeqNum: PropTypes.string,
    }),
  }),
};

PanelMeetingAdmin.defaultProps = {
  match: {},
};

export default withRouter(PanelMeetingAdmin);
