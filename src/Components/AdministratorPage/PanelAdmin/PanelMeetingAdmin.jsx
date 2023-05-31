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

  const selectedEditPanelMeeting = useSelector(state => state.selectedEditPanelMeeting);
  let isEdit = false;
  if (Object.keys(selectedEditPanelMeeting).length > 0) {
    isEdit = true;
  }

  function loadMeetingType() {
    return selectedEditPanelMeeting.pmt_code === 'ID' ? 'interdivisional' : 'midlevel';
  }

  function loadPanelDate(dateCode) {
    return new Date(
      selectedEditPanelMeeting.panelMeetingDates.find(x => x.mdt_code === dateCode).pmd_dttm);
  }

  const [panelMeetingType, setPanelMeetingType] = useState(isEdit ? loadMeetingType() : 'interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState(isEdit ? loadPanelDate('MEET') : currentDate);
  const [panelMeetingStatus, setPanelMeetingStatus] = useState(isEdit ? selectedEditPanelMeeting.pms_desc_text : 'Initiated');
  const [prelimCutoff, setPrelimCutoff] = useState(isEdit ? loadPanelDate('CUT') : subMinutes(currentDate, prelimCutoffMins));
  const [addendumCutoff, setAddendumCutoff] = useState(isEdit ? loadPanelDate('ADD') : subMinutes(currentDate, addendumCutoffMins));
  const [virtualMeeting, setVirtualMeeting] = useState(isEdit ? selectedEditPanelMeeting.pm_virtual === 'Y' : false);

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

  const canEditFields = isEdit ? (prelimCutoff - new Date() > 0) : true;

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
          disabled={!canEditFields}
          type="text"
          value={panelMeetingStatus}
          onChange={(e) => setPanelMeetingStatus(e.target.value)}
          className="select-and-input"
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
