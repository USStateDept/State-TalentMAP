import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { subMinutes } from 'date-fns';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import { HISTORY_OBJECT } from 'Constants/PropTypes';
import { createPanelMeeting } from 'actions/panelMeetingAdmin';
import { saveSelectedEditPanelMeeting } from 'actions/panelMeetingAgendas';
import Alert from 'Components/Alert/Alert';

const PanelMeetingAdmin = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  // const { state: { from } } = useLocation();
  // console.log('from: ', from);
  // const target = targets[from] ?? "/board";

  const currentDate = new Date();
  const prelimCutoffMins = 2875;
  const addendumCutoffMins = 1435;

  const selectedEditPanelMeeting = useSelector(state => state.selectedEditPanelMeeting);
  const selectedEditPanelMeetingError = useSelector(state => state.selectedEditPanelMeetingErrored);
  const selectedEditPanelMeetingIsLoading = useSelector(state => state.selectedEditPanelMeetingIsLoading); // eslint-disable-line

  const [loadedPanelMeeting, setLoadedPanelMeeting] = useState({}); // eslint-disable-line
  const [loadedPanelMeetingErrored, setLoadedPanelMeetingErrored] = useState(false);

  const alertTitle = 'Error Loading Panel Meeting';
  const alertBody = [
    {
      body: 'There was an error while attempting to load this Panel Meeting, please try again',
    },
  ];

  // let isEdit = false;
  // if (Object.keys(loadedPanelMeeting).length > 0) {
  //   isEdit = true;
  // }


  function loadMeetingType() {
    return loadedPanelMeeting.pmt_code === 'ID' ? 'interdivisional' : 'midlevel';
  }

  function loadPanelDate(dateCode) {
    console.log('loadedPanelMeeting: ', loadedPanelMeeting);
    console.log('loadedPanelMeeting.panelMeetingDates: ', loadedPanelMeeting.panelMeetingDates);
    return new Date(
      loadedPanelMeeting?.panelMeetingDates?.find(x => x.mdt_code === dateCode).pmd_dttm);
  }

  const [isEdit, setIsEdit] = useState(false);
  const [hasReadMeeting, setHasReadMeeting] = useState(false);

  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState(currentDate);
  const [panelMeetingStatus, setPanelMeetingStatus] = useState('Initiated');
  const [prelimCutoff, setPrelimCutoff] = useState(subMinutes(currentDate, prelimCutoffMins));
  const [addendumCutoff, setAddendumCutoff] = useState(subMinutes(currentDate, addendumCutoffMins));
  const [virtualMeeting, setVirtualMeeting] = useState(false);

  useEffect(() => {
    console.log('hit useEffect hasReadMeeting: ', hasReadMeeting);
    if (Object.keys(selectedEditPanelMeeting).length) {
      console.log('selectedEditPanelMeeting: ', selectedEditPanelMeeting);
      setLoadedPanelMeeting(selectedEditPanelMeeting);
      setLoadedPanelMeetingErrored(selectedEditPanelMeetingError);
      if (Object.keys(selectedEditPanelMeeting).length) {
        setIsEdit(true);
        // setPanelMeetingType(loadMeetingType());
        // setPanelMeetingDate(loadPanelDate('MEET'));
        // setPanelMeetingStatus(loadedPanelMeeting.pms_desc_text);
        // setPrelimCutoff(loadPanelDate('CUT'));
        // setAddendumCutoff(loadPanelDate('ADD'));
        // setVirtualMeeting(loadedPanelMeeting.pm_virtual === 'Y');
      }
    }
  });

  useEffect(() => {
    console.log('inside second useEffect');
    console.log('second useEffect loadedPanelMeeting: ', loadedPanelMeeting);
    if (!hasReadMeeting && Object.keys(loadedPanelMeeting).length) {
      setPanelMeetingType(loadMeetingType());
      setPanelMeetingDate(loadPanelDate('MEET'));
      setPanelMeetingStatus(loadedPanelMeeting.pms_desc_text);
      setPrelimCutoff(loadPanelDate('CUT'));
      setAddendumCutoff(loadPanelDate('ADD'));
      setVirtualMeeting(loadedPanelMeeting.pm_virtual === 'Y');
      setHasReadMeeting(true);
      dispatch(saveSelectedEditPanelMeeting({}));
    }
  }, [loadedPanelMeeting]);

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
    loadedPanelMeetingErrored ?
      <div className="usa-width-two-thirds">
        <Alert
          title={alertTitle}
          messages={alertBody}
        />
      </div>
      :
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
