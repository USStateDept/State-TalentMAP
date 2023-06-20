import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import FA from 'react-fontawesome';
import Picky from 'react-picky';
import CheckBox from 'Components/CheckBox';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { createPanelMeeting } from 'actions/panelMeetingAdmin';
import { get } from 'lodash';
import { panelMeetingsFetchData, panelMeetingsFiltersFetchData } from 'actions/panelMeetings';

const PanelMeetingAdmin = (props) => {
  const { history } = props;
  const pmSeqNum = get(props, 'match.params.pmSeqNum', false);
  const isCreate = !pmSeqNum;

  const panelMeetingsResults = useSelector(state => state.panelMeetings);
  const panelMeetingsResults$ = get(panelMeetingsResults, 'results[0]') || {};
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const prelimCutoffMins = 2875;
  const addendumCutoffMins = 1435;

  const panelMeetingsFilters = useSelector(state => state.panelMeetingsFilters);
  const panelMeetingsFiltersIsLoading = useSelector(state =>
    state.panelMeetingsFiltersFetchDataLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
    dispatch(panelMeetingsFiltersFetchData());
  }, []);

  const { pmt_code, pms_desc_text, pm_virtual, panelMeetingDates } = panelMeetingsResults$;

  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState();
  const [panelMeetingStatus, setPanelMeetingStatus] = useState('Initiated');
  const [prelimCutoff, setPrelimCutoff] = useState();
  const [addendumCutoff, setAddendumCutoff] = useState();
  const [virtualMeeting, setVirtualMeeting] = useState(false);

  useEffect(() => {
    if (!isCreate && !!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
      setPanelMeetingType(pmt_code);
      setPanelMeetingDate(new Date(panelMeetingDates?.find(x => x.mdt_code === 'MEET').pmd_dttm));
      setPanelMeetingStatus(pms_desc_text);
      setPrelimCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'CUT').pmd_dttm));
      setAddendumCutoff(new Date(panelMeetingDates?.find(x => x.mdt_code === 'ADD').pmd_dttm));
      setVirtualMeeting(pm_virtual === 'Y');
    }
  }, [panelMeetingsResults]);

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

  const canEditFields = !isCreate ? (prelimCutoff - new Date() > 0) : true;

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
      virtualMeeting,
      panelMeetingStatus,
    }));
  };

  const clear = () => {
    setPanelMeetingType('interdivisional');
    setPanelMeetingDate('');
    setPrelimCutoff('');
    setAddendumCutoff('');
    setVirtualMeeting(false);
  };

  const selectPanelMeetingDate = (date) => {
    setPanelMeetingDate(date);
    setPrelimCutoff(subMinutes(date, prelimCutoffMins));
    setAddendumCutoff(subMinutes(date, addendumCutoffMins));
  };

  return (
    !panelMeetingsIsLoading && !panelMeetingsFiltersIsLoading &&
      <div className="admin-panel-meeting">
        <div className="admin-panel-meeting-row">
          <label htmlFor="virtual-meeting">Virtual Meeting:</label>
          <CheckBox
            disabled={!canEditFields}
            value={virtualMeeting}
            className="admin-panel-meeting-checkbox"
            onCheckBoxClick={(e) => setVirtualMeeting(e)}
          />
        </div>
        <div className="admin-panel-meeting-row">
          <label htmlFor="meeting-type">Meeting Type:</label>
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
        <div className="admin-panel-meeting-row">
          <label htmlFor="status">Status:</label>
          <Picky
            className="select-dropdown"
            value={panelMeetingStatus}
            options={get(panelMeetingsFilters, 'panelStatuses')}
            onChange={setPanelMeetingStatus}
            valueKey="code"
            labelKey="text"
            disabled={isCreate || !canEditFields}
          />
        </div>
        <div className="admin-panel-meeting-row">
          <label htmlFor="panel-meeting-date">Panel Meeting Date:</label>
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
        <div className="admin-panel-meeting-row">
          <label htmlFor="preliminary-cutoff-date">Official Preliminary Cutoff:</label>
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
        <div className="admin-panel-meeting-row">
          <label htmlFor="addendum-cutoff-date">Addendum Cutoff:</label>
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
        <div className="admin-panel-meeting-buttons">
          <button onClick={submit} disabled={!canEditFields}>Save</button>
          <button onClick={clear} disabled={!canEditFields}>Clear</button>
        </div>
      </div>
  );
};

PanelMeetingAdmin.propTypes = {
  history: HISTORY_OBJECT.isRequired,
};

export default withRouter(PanelMeetingAdmin);
