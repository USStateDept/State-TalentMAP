import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { createPanelMeeting } from 'actions/panelMeetingAdmin';

const PanelMeetingAdmin = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const currentDate = new Date();
  const prelimCutoffMins = 2875;
  const addendumCutoffMins = 1435;

  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState(currentDate);
  const [prelimCutoff, setPrelimCutoff] = useState(subMinutes(currentDate, prelimCutoffMins));
  const [addendumCutoff, setAddendumCutoff] = useState(subMinutes(currentDate, addendumCutoffMins));
  const [virtualMeeting, setVirtualMeeting] = useState(false);

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

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
    <div className="admin-panel-meeting">
      <div className="admin-panel-meeting-row">
        <label htmlFor="virtual-meeting">Virtual Meeting:</label>
        <CheckBox
          value={virtualMeeting}
          className="admin-panel-meeting-checkbox"
          onCheckBoxClick={(e) => setVirtualMeeting(e)}
        />
      </div>
      <div className="admin-panel-meeting-row">
        <label htmlFor="meeting-type">Meeting Type:</label>
        <select
          className="select-and-input"
          value={panelMeetingType}
          onChange={(e) => setPanelMeetingType(e.target.value)}
        >
          <option value={'interdivisional'}>Interdivisional</option>
          <option value={'midlevel'}>Mid-Level</option>
        </select>
      </div>
      <div className="admin-panel-meeting-row">
        <label htmlFor="status">Status:</label>
        <input
          disabled
          type="text"
          value="Initiated"
          className="select-and-input"
        />
      </div>
      <div className="admin-panel-meeting-row">
        <label htmlFor="panel-meeting-date">Panel Meeting Date:</label>
        <div className="date-wrapper larger-date-picker">
          <DatePicker
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
        <button onClick={submit}>Save</button>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  );
};

PanelMeetingAdmin.propTypes = {
  history: HISTORY_OBJECT.isRequired,
};

export default withRouter(PanelMeetingAdmin);
