/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Remove after defining sections with real data
import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { differenceInCalendarDays, format, getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns-v2';

const EditHandshake = props => {
  const { submitAction, expiration, disabled, submitText } = props;
  const [expirationDate, setExpirationDate] = useState(new Date());
  // what to use for default expiration?
  const [expirationTime, setExpirationTime] = useState(`${getHours(expirationDate)}:${getMinutes(expirationDate)}`);

  // Offer date is defaulted to `now` until future business rules clarify functionality
  // Expected to be able to dynamically determine if we should offer now or future HS start date
  const offerDate = new Date();


  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const validateExpiration = () => {
    const [hour, minute] = expirationTime.split(':');
    const year = getYear(expirationDate);
    const month = getMonth(expirationDate);
    const date = getDate(expirationDate);
    return new Date(year, month, date, hour, minute);
  };

  const submit = (e) => {
    e.preventDefault();
    const input = validateExpiration();
    const userInputs = {
      expiration_date: input,
    };
    submitAction(userInputs);
  };

  // TO-DO: Replace with business rule for enforcing hard-stop to bureau HS offers per cycle
  const fakeBureauTimeline = [new Date(2021, 5, 1), new Date(2021, 6, 29)];

  const getTime$ = (date) => format(date, 'p');
  const getDate$ = (date) => format(date, 'P');

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
    <div className="bureau-hs-form">
      <form>
        <div>
          <label htmlFor="handshakeStartDate" className="input-label">Handshake offered:</label>
          <div className="date-time-inputs">
            <input
              type="text"
              name="handshakeStartDate"
              value={getDate$(offerDate)}
              disabled
            />
            <input
              type="text"
              name="handshakeStartTime"
              value={getTime$(offerDate)}
              disabled
            />
          </div>
        </div>
        <div>
          <label htmlFor="handshakeEndDate" className="input-label">Handshake expiration:</label>
          <div className="date-time-inputs">
            <input
              type="text"
              name="handshakeEndDate"
              value={getDate$(expirationDate)}
            />
            <TimePicker
              className="hs-modal-time-picker"
              onChange={setExpirationTime}
              value={expirationTime}
              required
            />
          </div>
        </div>
        <div className="calendar-wrapper">
          <Calendar
            minDate={new Date()}
            maxDate={fakeBureauTimeline[1]}
            onChange={disabled ? () => {} : setExpirationDate}
            value={expirationDate}
            tileClassName={tileClassName}
          />
        </div>
        <div className="calendar-legend">
          <div className="cycle-key">
            <div />
            <div>Cycle Start & End</div>
          </div>
          <div className="offer-key">
            <div />
            <div>Handshake offer</div>
          </div>
          <div className="expire-key">
            <div />
            <div>Handshake expiration</div>
          </div>
        </div>
        <div className="hs-button-wrapper" >
          <button onClick={cancel}>Cancel</button>
          <button onClick={submit} type="submit">{submitText}</button>
        </div>
      </form>
    </div>
  );
};

EditHandshake.propTypes = {
};

EditHandshake.defaultProps = {
};

export default EditHandshake;
