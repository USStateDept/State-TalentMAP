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
  const [panelMeetingType, setPanelMeetingType] = useState('interdivisional');
  const [panelMeetingDate, setPanelMeetingDate] = useState(new Date());
  const [prelimCutoff, setPrelimCutoff] = useState('');
  const [addendumCutoff, setAddendumCutoff] = useState('');
  const [virtualMeeting, setVirtualMeeting] = useState(false);
  const [panelSubmitted, setPanelSubmitted] = useState(false);

  const createMeetingResults = useSelector(state => state.createPanelMeetingSuccess);
  const createMeetingLoading = useSelector(state => state.createPanelMeetingIsLoading);
  const createMeetingErrored = useSelector(state => state.createPanelMeetingHasErrored);

  useEffect(() => {
    if (!createMeetingLoading && !createMeetingErrored && panelSubmitted) {
      setPanelSubmitted(false);
      history.push('/profile/ao/panelmeetings');
    }
  }, [createMeetingResults]);

  const submit = () => {
    setPanelSubmitted(true);
    dispatch(createPanelMeeting({
      panelMeetingType,
      panelMeetingDate,
      prelimCutoff,
      addendumCutoff,
      virtualMeeting,
    }));
  };

  const clear = () => {
    setPanelMeetingDate('');
    setPrelimCutoff('');
    setAddendumCutoff('');
    setVirtualMeeting(false);
  };

  const selectPanelMeetingDate = (date) => {
    setPanelMeetingDate(date);
    setPrelimCutoff(subMinutes(date, 2875));
    setAddendumCutoff(subMinutes(date, 1435));
  };

  return (
    <div className="pma-wrapper">
      <div className="pma-row">
        <div className="pma-column">
          Virtual Meeting
        </div>
        <div className="pma-column">
          <div>
            <CheckBox
              value={virtualMeeting}
              className="pma-checkbox"
              onCheckBoxClick={(e) => setVirtualMeeting(e)}
            />
          </div>
        </div>
      </div>
      <div className="pma-row">
        <div className="pma-column">
          Meeting Type
        </div>
        <div className="pma-column">
          <select
            value={panelMeetingType}
            onChange={(e) => setPanelMeetingType(e.target.value)}
          >
            <option value={'interdivisional'}>Interdivisional</option>
            <option value={'midlevel'}>Mid-Level</option>
          </select>
        </div>
      </div>
      <div className="pma-row">
        <div className="pma-column">
          Status
        </div>
        <div className="pma-column">
          <input
            disabled
            type="text"
            value="Initiated"
            className="pma-status-input"
          />
        </div>
      </div>
      <div className="pma-row">
        <div className="pma-column">
          Panel Meeting Date
        </div>
        <div className="pma-column">
          <DatePicker
            selected={panelMeetingDate}
            onChange={selectPanelMeetingDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </div>
        <div className="pma-column">
          <FA name="calendar" />
        </div>
      </div>
      <div className="pma-row">
        <div className="pma-column">
          Official Preliminary Cutoff
        </div>
        <div className="pma-column">
          <DatePicker
            selected={prelimCutoff}
            onChange={(date) => setPrelimCutoff(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </div>
        <div className="pma-column">
          <FA name="calendar" />
        </div>
      </div>
      <div className="pma-row">
        <div className="pma-column">
          Addendum Cutoff
        </div>
        <div className="pma-column">
          <DatePicker
            selected={addendumCutoff}
            onChange={(date) => setAddendumCutoff(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            timeCaption="time"
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </div>
        <div className="pma-column">
          <FA name="calendar" />
        </div>
      </div>

      <div className="pma-buttons">
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
