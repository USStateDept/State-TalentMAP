import { useState } from 'react';
import { get, isNil } from 'lodash';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { add, differenceInCalendarDays, format, getDate, getHours, getMinutes, getMonth, getYear, isFuture } from 'date-fns-v2';

const EditHandshake = props => {
  const { submitAction, expiration, infoOnly, uneditable, submitText, offer, bidCycle } = props;
  const expirationFormatted = expiration ? new Date(expiration) : add(new Date(), { days: 1 });
  const [expirationDate, setExpirationDate] = useState(expirationFormatted);
  const [expirationTime, setExpirationTime] =
    useState(`${getHours(expirationDate)}:${getMinutes(expirationDate)}`);

  // Date when bidders are able to begin seeing HS offers
  const revealDate = get(bidCycle, 'handshake_allowed_date');

  const offerDate = () => {
    if (revealDate && isFuture(new Date(revealDate))) {
      return new Date(revealDate);
    } else if (offer) {
      return new Date(offer);
    }
    return new Date();
  };

  const validateExpiration = () => {
    const [hour, minute] = expirationTime.split(':');
    const year = getYear(expirationDate);
    const month = getMonth(expirationDate);
    const date = getDate(expirationDate);
    return new Date(year, month, date, hour, minute);
  };

  const readOnly = uneditable || infoOnly;
  const disabledButton = isNil(expirationTime) || !isFuture(validateExpiration());


  const cancel = (e) => {
    e.preventDefault();
    swal.close();
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
  // const fakeBureauTimeline = [new Date(2021, 5, 1), new Date(2021, 6, 29)];

  const getTime$ = (date) => format(date, 'p');
  const getDate$ = (date) => format(date, 'P');

  const isSameDay = (a, b) => differenceInCalendarDays(a, b) === 0;

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isSameDay(expirationDate, date)) {
        return 'react-calendar__tile--endDate';
      }
      if (isSameDay(offerDate(), date)) {
        return 'react-calender__tile--startDate';
      }
      // TO-DO: Add dates from bidCycle object to complete
      // if (fakeBureauTimeline.find(dDate => isSameDay(dDate, date))) {
      //   return 'react-calendar__tile--cycleTimeline';
      // }
    }
    return '';
  };

  return (
    <div className="bureau-hs-form">
      <form>
        <div>
          <label htmlFor="handshakeStartDate" className="input-label">Handshake revealed:</label>
          <div className="date-time-inputs">
            <input
              type="text"
              name="handshakeStartDate"
              value={getDate$(offerDate())}
              disabled
            />
            <input
              type="text"
              name="handshakeStartTime"
              value={getTime$(offerDate())}
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
              disabled={readOnly}
            />
            <TimePicker
              className="hs-modal-time-picker"
              onChange={setExpirationTime}
              value={expirationTime}
              disabled={readOnly}
              required
            />
          </div>
        </div>
        {/* TO-DO: Use this class yet for calendar to disable all interation */}
        <div className={`calendar-wrapper ${readOnly ? 'disabled' : ''}`}>
          <Calendar
            minDate={offerDate()}
            // TO-DO: maxDate={fakeBureauTimeline[1]}
            onChange={readOnly ? () => {} : setExpirationDate}
            value={expirationDate}
            tileClassName={tileClassName}
            tileDisabled={() => readOnly}
          />
        </div>
        <div className="calendar-legend">
          {/*
          TO-DO: Add cycle end/begin key
            <div className="cycle-key">
              <div />
              <div>Cycle Start & End</div>
            </div> */
          }
          <div className="offer-key">
            <div />
            <div>Handshake reveal</div>
          </div>
          <div className="expire-key">
            <div />
            <div>Handshake expiration</div>
          </div>
        </div>
        <div className="hs-button-wrapper" >
          <button onClick={cancel}>{infoOnly ? 'Close' : 'Cancel'}</button>
          {
            !infoOnly &&
            <button onClick={submit} type="submit" disabled={disabledButton}>{submitText}</button>
          }
        </div>
      </form>
    </div>
  );
};

EditHandshake.propTypes = {
  bidCycle: PropTypes.shape({}),
  submitAction: PropTypes.func,
  submitText: PropTypes.string,
  infoOnly: PropTypes.bool,
  expiration: PropTypes.string,
  offer: PropTypes.string,
  uneditable: PropTypes.bool,
};

EditHandshake.defaultProps = {
  bidCycle: {},
  submitAction: EMPTY_FUNCTION,
  submitText: 'Submit',
  infoOnly: true,
  expiration: '',
  uneditable: true,
  offer: '',
};

export default EditHandshake;
