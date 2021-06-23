/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
// import TimePicker from 'react-time-picker/dist/entry.nostyle';

const EditHandshake = props => {
  const { submitAction, expiration, disabled } = props;
  // Offer date is defaulted to `now` until future business rules clarify functionality
  // Expected to be able to dynamically determine if we should offer now or future HS start date
  const [offerDate, setOfferDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());

  useEffect(() => {
    setOfferDate();
    setExpirationDate();
  }, [props]);

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      expiration_date: expirationDate,
    };
    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  // TO-DO: Replace with business rule for enforcing hard-stop to bureau HS offers per cycle
  const fakeBureauTimeline = [new Date(2021, 5, 1), new Date(2021, 6, 29)];

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

  const isSameDay = (a, b) => differenceInCalendarDays(a, b) === 0;

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isSameDay(new Date(), date)) {
        return 'react-calender__tile--startDate';
      }
      if (fakeBureauTimeline.find(dDate => isSameDay(dDate, date))) {
        return 'react-calendar__tile--cycleTimeline';
      }
      if (disabled && (isSameDay(expiration, date))) {
        return 'react-calendar__tile--endDate';
      }
    }
    return '';
  };

  return (
    <div>
      <form className="bureau-hs-form">
        <div>
          <label htmlFor="handshakeStartDate">Handshake offered:</label>
          <input
            type="text"
            name="handshakeStartDate"
            value={offerDate}
          />
          {/* <input
            type="text"
            name="handshakeStartTime"
            defaultValue={value}
            disabled
          /> */}
        </div>
        <div>
          <label htmlFor="handshakeEndDate">Handshake expiration:</label>
          <input
            type="text"
            name="handshakeEndDate"
            value={expirationDate}
          />
          {/* <TimeInput
            id="time-input"
            value={dateTime}
            onChange={() => setDateTime(value)}
          /> */}
        </div>
        <div className="calendar-wrapper">
          <Calendar
            minDate={new Date()}
            maxDate={fakeBureauTimeline[1]}
            onChange={setExpirationDate}
            value={expirationDate}
            tileClassName={tileClassName}
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
