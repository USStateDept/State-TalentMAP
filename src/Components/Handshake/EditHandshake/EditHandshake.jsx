/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeInput from 'react-keyboard-time-input';

const EditHandshake = props => {
  const { submitAction, personID, positionID } = props;
  const [value, setValue] = useState(new Date());
  const [dateTime, setDateTime] = useState(new Date());

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      dateTime,
      perdet: personID,
      cp_id: positionID,
    };
    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const getHSStartDate = () => {
    const date = dateTime;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const getHSStartTime = () => {
    const time = dateTime;
    return time.toTimeString();
  };

  const getHSEndDate = () => {
    const date = dateTime;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const getHSEndTime = () => {
    const time = dateTime;
    return time.toTimeString();
  };

  return (
    <div>
      <form className="bureau-hs-form">
        <div>
          <label htmlFor="handshakeStartDate">Handshake offered:</label>
          <input
            type="text"
            name="handshakeStartDate"
            defaultValue={getHSStartDate()}
            disabled
          />
          <input
            type="text"
            name="handshakeStartTime"
            defaultValue={getHSStartTime()}
            disabled
          />
        </div>
        <div>
          <label htmlFor="handshakeEndDate">Handshake expiration:</label>
          <input
            type="text"
            name="handshakeEndDate"
            defaultValue={getHSEndDate()}
            disabled
          />
          <TimeInput
            id="time-input"
            value={dateTime}
            onChange={() => setDateTime(value)}
          />
        </div>
        <Calendar
          onChange={() => {}}
          value={value}
        />
        <button onClick={submit} type="submit">Submit</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditHandshake.propTypes = {
};

EditHandshake.defaultProps = {
};

export default EditHandshake;
