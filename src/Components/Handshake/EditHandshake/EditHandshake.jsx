import { useState } from 'react';
import { get, isNil } from 'lodash';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { add, differenceInCalendarDays, format, getDate, getHours, getMinutes, getMonth, getYear, isBefore, isFuture, isPast } from 'date-fns-v2';
import { useCloseSwalOnUnmount } from 'utilities';

const EditHandshake = props => {
  const { submitAction, handshake, infoOnly, submitText, bidCycle } = props;
  const { hs_date_expiration, hs_date_offered, hs_status_code } = handshake;
  const currentlyOffered = hs_status_code === 'handshake_offered';

  const calculateExpiration = () => {
    let e = hs_date_expiration;
    // If already revoked, but in create mode, reset the expiration
    if (!infoOnly && (hs_status_code === 'handshake_revoked')) {
      e = false;
    }
    return e ? new Date(e) : add(new Date(), { days: 1 });
  };

  const [expirationDate, setExpirationDate] = useState(calculateExpiration());
  const [expirationTime, setExpirationTime] =
    useState(`${getHours(expirationDate)}:${getMinutes(expirationDate)}`);

  useCloseSwalOnUnmount();

  // Date when bidders are able to begin seeing HS offers
  const revealDate = get(bidCycle, 'handshake_allowed_date');

  const calculateReveal = () => {
    // Case 1:
    // We have a reveal date and its in the future
    //   a) INFO-ONLY => show reveal
    //   b) CREATE-MODE => show reveal
    // Case 2:
    // We have a reveal date and its in the past
    //  a) INFO-ONLY && (offer_dt < reveal_dt) => show reveal_dt
    //  b) INFO-ONLY && (offer_dt > reveal_dt) => show offer_dt
    //  c) CREATE-MODE => show today
    // Case 3:
    // No reveal date
    //   a) INFO-ONLY => show offer_dt
    //   b) create-mode => show today
    if (revealDate && isFuture(new Date(revealDate))) {
      return new Date(revealDate);
    } else if (revealDate && infoOnly) {
      if (isBefore(new Date(hs_date_offered), new Date(revealDate))) {
        return new Date(revealDate);
      }
      return new Date(hs_date_offered);
    } else if (revealDate && !infoOnly) {
      return new Date();
    } else if (infoOnly) {
      return new Date(hs_date_offered);
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

  const readOnly = currentlyOffered || infoOnly;
  const userInputError = isNil(expirationTime) || isPast(validateExpiration());


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
      if (isSameDay(calculateReveal(), date)) {
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
          <label htmlFor="handshakeStartDate" className="input-label">Handshake reveal:</label>
          <div className="date-time-inputs">
            <input
              type="text"
              name="handshakeStartDate"
              value={getDate$(calculateReveal())}
              disabled
            />
            <input
              type="text"
              name="handshakeStartTime"
              value={getTime$(calculateReveal())}
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
            minDate={calculateReveal()}
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
              <button
                onClick={submit}
                type="submit"
                disabled={!currentlyOffered && userInputError}
              >
                {submitText}
              </button>
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
  handshake: PropTypes.shape({
    hs_date_expiration: PropTypes.string,
    hs_date_offered: PropTypes.string,
    hs_status_code: PropTypes.string,
  }),
};

EditHandshake.defaultProps = {
  bidCycle: {},
  submitAction: EMPTY_FUNCTION,
  submitText: 'Submit',
  infoOnly: true,
  handshake: {},
};

export default EditHandshake;
