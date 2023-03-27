import { useState } from 'react';
import { get, isNil } from 'lodash';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, HANDSHAKE_DETAILS } from 'Constants/PropTypes';
import swal from '@sweetalert/with-react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import { add, differenceInCalendarDays, format, getDate, getHours, getMinutes, getMonth, getYear, isBefore, isFuture, isPast } from 'date-fns-v2';
import { useCloseSwalOnUnmount } from 'utilities';

const EditHandshake = props => {
  const { submitAction, handshake, infoOnly, submitText, bidCycle } = props;
  const { hs_date_expiration, hs_date_offered, hs_status_code } = handshake;
  const currentlyOffered = hs_status_code === 'handshake_offered';

  const officialReveal = get(bidCycle, 'handshake_allowed_date');

  const beforeReveal = (d) => isBefore(new Date(d), new Date(officialReveal));

  const revealDate = (useExistingHS) => {
    // Official Reveal date set
    if (officialReveal) {
      if (useExistingHS) {
        if (beforeReveal(hs_date_offered)) {
          return new Date(officialReveal);
        }
        return new Date(hs_date_offered);
      } // New HS
      if (beforeReveal(new Date())) {
        return new Date(officialReveal);
      }
      return new Date();
    }
    // Official Reveal date not set
    if (useExistingHS) {
      return new Date(hs_date_offered);
    } // New HS
    return new Date();
  };

  const calculateExpiration = () => {
    if (officialReveal && isFuture(new Date(officialReveal))) {
      return add(new Date(officialReveal), { days: 1 });
    }
    return add(new Date(), { days: 1 });
  };

  const modes = {
    readOnly: {
      expiration: new Date(hs_date_expiration),
      reveal: revealDate(true),
    },
    create: {
      expiration: calculateExpiration(),
      reveal: revealDate(false),
    },
  };

  const getMode = () => {
    if (infoOnly) {
      return modes.readOnly;
    } else if ((hs_status_code === 'handshake_revoked') || !hs_status_code) {
      return modes.create;
    }
    return modes.readOnly;
  };

  const [expirationDate, setExpirationDate] = useState(getMode().expiration);
  const [expirationTime, setExpirationTime] =
    useState(`${getHours(expirationDate)}:${getMinutes(expirationDate)}`);

  useCloseSwalOnUnmount();

  const validateExpiration = () => {
    const [hour, minute] = expirationTime.split(':');
    const year = getYear(expirationDate);
    const month = getMonth(expirationDate);
    const date = getDate(expirationDate);
    return new Date(year, month, date, hour, minute);
  };

  const readOnly = currentlyOffered || infoOnly;
  const userInputError = isNil(expirationTime) || isPast(validateExpiration())
    || beforeReveal(validateExpiration());


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
      if (isSameDay(getMode().reveal, date)) {
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
              value={getDate$(getMode().reveal)}
              disabled
            />
            <input
              type="text"
              name="handshakeStartTime"
              value={getTime$(getMode().reveal)}
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
            minDate={getMode().reveal}
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
  handshake: HANDSHAKE_DETAILS,
  submitAction: PropTypes.func,
  submitText: PropTypes.string,
  infoOnly: PropTypes.bool,
};

EditHandshake.defaultProps = {
  bidCycle: {},
  handshake: {},
  submitAction: EMPTY_FUNCTION,
  submitText: 'Submit',
  infoOnly: true,
};

export default EditHandshake;
