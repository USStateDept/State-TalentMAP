import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { filter, take, takeRight } from 'lodash'; // eslint-disable-line
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Calendar from 'react-calendar';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import RemarksPill from '../RemarksPill';

const AgendaItemLegs = props => {
  const {
    legs,
    remarks,
    isCard,
    hideRemarks,
    showCloseButton,
    onClose,
  } = props;

  const calendarID = 'aim-ted-calendar';

  let legs$ = legs;
  if (isCard && legs.length > 2) {
    legs$ = [take(legs)[0], takeRight(legs)[0]];
  }
  const strLimit = isCard ? 15 : 50;
  const formatStr = (d) => shortenString(d, strLimit);

  // TO-DO - better date checking. isDate() with null or bad string not guaranteed to work.
  const formatDate = (d) => d && isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';

  const onClose$ = leg => {
    console.log(leg); // eslint-disable-line
    onClose(leg);
  };

  const [tedCalendar, setTEDCalendar] = useState(new Date());

  const updateTEDCalendar = (date) => {
    setTEDCalendar(date);
  };

  const [calendarHidden, setCalendarHidden] = useState({});
  const calendarHiddenRef = useRef(calendarHidden);

  const setCalendarHiddenRef = data => {
    calendarHiddenRef.current = data;
    setCalendarHidden(data);
  };

  const toggleCalendar = (id, val, shouldReset = true) => {
    if (shouldReset) { setCalendarHiddenRef({}); }
    const calendarHidden$ = { ...calendarHidden };
    calendarHidden$[id] = val;
    setCalendarHiddenRef(calendarHidden$);
  };

  const handleOutsideClick = useCallback((e) => {
    const calendarHidden$ = { ...calendarHiddenRef };
    legs$.forEach((leg, i) => {
      if (e.target.id !== `${calendarID}-${i}` && document.getElementById(`${calendarID}-${i}`) &&
        !document.getElementById(`${calendarID}-${i}`).contains(e.target)) {
        calendarHidden$[i] = false;
      } else {
        calendarHidden$[i] = true;
      }
    });
    setCalendarHiddenRef(calendarHidden$);
  }, []);

  useEffect(() => {
    window.addEventListener('click', e => handleOutsideClick(e));
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const getData = (key, helperFunc) => (
    <>
      {
        legs$.map((leg, i) => {
          const showClose = showCloseButton && key === 'pos_title' && i > 0;
          const isFirstLeg = i === 0;
          const editDropdown = (!isFirstLeg && (key === 'tod' || key === 'action' || key === 'travel'));
          const editCalendar = (!isFirstLeg && (key === 'ted'));
          const helperFuncToggle = !!helperFunc;
          return (<td>
            {/* first leg cannot be removed */}
            {showClose &&
            <InteractiveElement className="remove-leg-button" onClick={() => onClose$(leg)} title="Remove leg">
              <FA name="times" />
            </InteractiveElement>}
            {
              helperFunc && !editDropdown && !editCalendar &&
                <dd className={showClose ? 'dd-close-padding' : ''}>{helperFunc(leg[key])}</dd>
            }
            {
              !helperFuncToggle && !editDropdown &&
              <dd>{leg[key]}</dd>
            }
            {
              editCalendar &&
                <div className="tod-calendar-container" id={`${calendarID}-${i}`}>
                  {helperFunc(leg[key])}
                  <FA name="calendar" onClick={() => toggleCalendar(i, true)} />
                  {calendarHidden[i] &&
                  <div className="fa-calendar-container" id={`${calendarID}-${i}-cal`}>
                    <Calendar
                      className="ted-react-calendar"
                      onChange={updateTEDCalendar}
                      onClickDay={() => toggleCalendar(i, false)}
                      selected={tedCalendar}
                    />
                  </div>
                  }
                </div>
            }
            {
              editDropdown &&
              <Dropdown
                className="account-dropdown"
                removeElement
              >
                <DropdownTrigger href="/#" className="ai-legs-dropdown">
                  {
                    <span className="account-dropdown--name" id="account-username">{leg[key]}
                      <span className="account-dropdown-spacing">__</span>
                    </span>
                  }
                </DropdownTrigger>
                <div>
                  <DropdownContent>
                    <div className="account-dropdown--identity account-dropdown--segment">
                      <div>{leg[key]}</div>
                    </div>
                  </DropdownContent>
                </div>
              </Dropdown>
            }
          </td>);
        })
      }
    </>
  );

  const getArrows = () => (
    <>
      {
        legs$.map(() => (<td className="arrow">
          <dd>
            <FA name="arrow-down" />
          </dd>
        </td>))
      }
    </>
  );

  const tableData = [
    {
      icon: '',
      title: 'Position Title',
      content: (getData('pos_title', formatStr)),
      cardView: false,
    },
    {
      icon: '',
      title: 'Position Number',
      content: (getData('pos_num')),
      cardView: false,
    },
    {
      icon: 'building-o',
      title: 'Org',
      content: (getData('org', formatStr)),
      cardView: true,
    },
    {
      icon: 'paper-plane-o',
      title: 'ETA',
      content: (getData('eta', formatDate)),
      cardView: true,
    },
    {
      icon: '',
      title: '',
      content: (getArrows()),
      cardView: true,
    },
    {
      icon: 'clock-o',
      title: 'TED',
      content: (getData('ted', formatDate)),
      cardView: true,
    },
    {
      icon: '',
      title: 'TOD',
      content: (getData('tod')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Grade',
      content: (getData('grade')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Action',
      content: (getData('action')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Travel',
      content: (getData('travel')),
      cardView: false,
    },
  ];

  const tableData$ = isCard ? filter(tableData, 'cardView') : tableData;

  return (
    <div className="ai-history-card-legs">
      <table>
        <tbody>
          {
            tableData$.map(tr => (
              <tr>
                <td>
                  <FA name={tr.icon} />
                </td>
                <th>
                  <dt>{tr.title}</dt>
                </th>
                {tr.content}
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        !isCard && !hideRemarks &&
        <div className="remarks-container">
          <div className="remarks-text">Remarks:</div>
          {
            remarks.map(remark => (
              <RemarksPill key={remark.title} {...remark} />
            ))
          }
        </div>
      }
    </div>
  );
};

AgendaItemLegs.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  remarks: PropTypes.arrayOf(PropTypes.shape({})),
  isCard: PropTypes.bool,
  hideRemarks: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

AgendaItemLegs.defaultProps = {
  legs: [],
  remarks: [],
  isCard: false,
  hideRemarks: false,
  showCloseButton: false,
  onClose: EMPTY_FUNCTION,
};

export default AgendaItemLegs;
