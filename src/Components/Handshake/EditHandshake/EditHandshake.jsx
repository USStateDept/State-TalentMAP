/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
// import TimeInput from 'react-keyboard-time-input';

const EditHandshake = props => {
  const { submitAction, personID, positionID } = props;
  const [value, setValue] = useState(new Date());

  // useEffect(() => {
  //   setValue(new Date());
  //   setDateTime(new Date());
  // }, [props]);

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      perdet: personID,
      cp_id: positionID,
    };
    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    setValue(Date.now());
    swal.close();
  };

  // const getHSStartDate = () => {
  //   const date = dateTime;
  //   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  // };

  // const getHSStartTime = () => {
  //   const time = dateTime;
  //   return time.toTimeString();
  // };

  // const getHSEndDate = () => {
  //   const date = dateTime;
  //   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  // };

  // const getHSEndTime = () => {
  //   const time = dateTime;
  //   return time.toTimeString();
  // };

  return (
    <div>
      <form className="bureau-hs-form">
        <div>
          <label htmlFor="handshakeStartDate">Handshake offered:</label>
          <input
            type="text"
            name="handshakeStartDate"
            defaultValue={value}
            disabled
          />
          <input
            type="text"
            name="handshakeStartTime"
            defaultValue={value}
            disabled
          />
        </div>
        <div>
          <label htmlFor="handshakeEndDate">Handshake expiration:</label>
          <input
            type="text"
            name="handshakeEndDate"
            defaultValue={value}
            disabled
          />
          {/* <TimeInput
            id="time-input"
            value={dateTime}
            onChange={() => setDateTime(value)}
          /> */}
        </div>
        <div className="calendar-wrapper">
          <Calendar
            onChange={() => {}}
            value={value}
          />
        </div>

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
