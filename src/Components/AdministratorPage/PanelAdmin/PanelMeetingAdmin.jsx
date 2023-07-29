import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Spinner from 'Components/Spinner';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { createPanelMeeting } from 'actions/panelMeetingAdmin';
import { panelMeetingsFetchData, panelMeetingsFiltersFetchData } from 'actions/panelMeetings';

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
  const [postPanelStarted, setPostPanelStarted] = useState();
  const [postPanelRunTime, setPostPanelRunTime] = useState();
  const [agendaCompletedTime, setAgendaCompletedTime] = useState();
  const [canEditFields, setCanEditFields] = useState(true);

  useEffect(() => {
    if (!isCreate && !!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
      setPanelMeetingType(pmt_code);
      setPanelMeetingDate(new Date(panelMeetingDates?.find(x => x.mdt_code === 'MEET').pmd_dttm));
      setPanelMeetingStatus(pms_desc_text);
      setPrelimCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'CUT').pmd_dttm));
      setAddendumCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'ADD').pmd_dttm));
      const prelimCutoff$ = new Date(panelMeetingDates?.find(x => x.mdt_code === 'CUT').pmd_dttm);
      setCanEditFields(prelimCutoff$ ? (prelimCutoff$ - new Date() > 0) : true);
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

  const submit = () => {
    dispatch(createPanelMeeting({
      panelMeetingType,
      panelMeetingDate,
      prelimCutoff,
      addendumCutoff,
      panelMeetingStatus,
    }));
  };

  const clear = () => {
    setPanelMeetingType('interdivisional');
    setPanelMeetingDate('');
    setPrelimCutoff('');
    setAddendumCutoff('');
    setPrelimRuntime('');
    setAddendumRuntime('');
    setPrelimRuntime('');
    setPostPanelStarted('');
    setPostPanelStarted('');
    setAgendaCompletedTime('');
    setPanelMeetingStatus('Initiated');
  };

  const selectPanelMeetingDate = (date) => {
    setPanelMeetingDate(date);
    setPrelimCutoff(subMinutes(date, prelimCutoffMins));
    setAddendumCutoff(subMinutes(date, addendumCutoffMins));
  };

  const loadingSpinner = (<Spinner type="panel-admin-remarks" size="small" />);

  return (
    !panelMeetingsIsLoading && !panelMeetingsFiltersIsLoading ?
      <div>
        <div className="admin-panel-meeting">
          <div className="admin-panel-grid-row">
            <div className="admin-panel-meeting-field">
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
            <div className="admin-panel-meeting-field">
              <label htmlFor="status">Status</label>
              <select
                disabled={isCreate || !canEditFields}
                className="select-dropdown"
                value={panelMeetingStatus}
                onChange={(e) => setPanelMeetingStatus(e.target.value)}
              >
                {
                  panelMeetingsFilters?.panelStatuses?.map(a => (
                    <option value={a.text}>{a.text}</option>
                  ))
                }
              </select>
            </div>
            <div className="admin-panel-meeting-field">
              <label htmlFor="panel-meeting-date">Panel Meeting Date</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={panelMeetingDate}
                  onChange={selectPanelMeetingDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
          </div>
          <div className="admin-panel-grid-row">
            <div className="admin-panel-meeting-field">
              <label htmlFor="preliminary-cutoff-date">Official Preliminary Cutoff</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={prelimCutoff}
                  onChange={(date) => setPrelimCutoff(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Addendum Cutoff</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={addendumCutoff}
                  onChange={(date) => setAddendumCutoff(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
          </div>
          <div className="admin-panel-grid-row">
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Official Preliminary Run Time</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={prelimRuntime}
                  onChange={(date) => setPrelimRuntime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
              <div className={`text-button ${!canEditFields ? 'disabled' : ''}`}>
                Run Official Preliminary
              </div>
            </div>
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Official Addendum Run Time</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={addendumRuntime}
                  onChange={(date) => setAddendumRuntime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
              <div className={`text-button ${!canEditFields ? 'disabled' : ''}`}>
                Run Official Addendum
              </div>
            </div>
          </div>
          <div className="admin-panel-grid-row">
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Post Panel Started</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={postPanelStarted}
                  onChange={(date) => setPostPanelStarted(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Post Panel Run Time</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={postPanelRunTime}
                  onChange={(date) => setPostPanelRunTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
            <div className="admin-panel-meeting-field">
              <label htmlFor="addendum-cutoff-date">Agenda Completed Time</label>
              <div className="date-wrapper larger-date-picker">
                <DatePicker
                  disabled={!canEditFields}
                  selected={agendaCompletedTime}
                  onChange={(date) => setAgendaCompletedTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
                <FA name="calendar" />
              </div>
            </div>
          </div>
        </div>
        <div className="position-form--actions">
          <button onClick={clear} disabled={!canEditFields}>Clear</button>
          <button onClick={submit} disabled={!canEditFields}>Save</button>
        </div>
      </div>
      :
      <div>
        {loadingSpinner}
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
