import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { get, includes } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Calendar from 'react-calendar';
import { useDataLoader } from 'hooks';
import Spinner from 'Components/Spinner';
import api from '../../../api';

const AgendaItemLegsForm = props => {
  const {
    legs,
    onClose,
  } = props;

  const calendarID = 'aim-ted-calendar';

  // eslint-disable-next-line no-unused-vars
  const { data: todData, error: todError, loading: TODLoading } = useDataLoader(api().get, '/fsbid/reference/tourofduties/');
  // eslint-disable-next-line no-unused-vars
  const { data: legATData, error: legATError, loading: legATLoading } = useDataLoader(api().get, '/fsbid/agenda/leg_action_types/');
  // eslint-disable-next-line no-unused-vars
  const { data: travelFData, error: travelFError, loading: travelFLoading } = useDataLoader(api().get, '/fsbid/reference/travelfunctions/');

  const TODs = get(todData, 'data') || [];
  const legActionTypes = get(legATData, 'data.results') || [];
  const travelFunctions = get(travelFData, 'data.results') || [];
  const legsLoading = includes([TODLoading, legATLoading, travelFLoading], true);

  const [selectedTOD, setTOD] = useState();
  const [selectedAction, setAction] = useState();
  const [selectedTravel, setTravel] = useState();

  const todMetaData = { dropdown: 'tod', defaultValue: selectedTOD, key: 'code', value: 'code', text: 'short_description' };
  const actionMetadata = { dropdown: 'action', defaultValue: selectedAction, key: 'code', value: 'code', text: 'abbr_desc_text' };
  const travelMetaData = { dropdown: 'travel', defaultValue: selectedTravel, key: 'code', value: 'code', text: 'abbr_desc_text' };

  const legs$ = legs;

  const formatStr = (d) => shortenString(d, 50);

  // TO-DO - better date checking. isDate() with null or bad string not guaranteed to work.
  const formatDate = (d) => d && isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';

  const onClose$ = leg => {
    onClose(leg);
  };

  const onDropdownUpdate = (value, data) => {
    // eslint-disable-next-line default-case
    switch (data) {
      case 'tod':
        setTOD(value);
        break;
      case 'action':
        setAction(value);
        break;
      case 'travel':
        setTravel(value);
        break;
    }
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

  const getData = (key, helperFunc, data, dropdownMeta) => (
    <>
      {
        legs$.map((leg, i) => {
          const showClose = key === 'pos_title' && i > 0;
          const isFirstLeg = i === 0;
          const editDropdown = (!isFirstLeg && (key === 'dropdown'));
          const editCalendar = (!isFirstLeg && (key === 'ted'));
          const helperFuncToggle = !!helperFunc;
          return (<td>
            {/* first leg cannot be removed */}
            {
              showClose &&
                <InteractiveElement className="remove-leg-button" onClick={() => onClose$(leg)} title="Remove leg">
                  <FA name="times" />
                </InteractiveElement>
            }
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
                <div className="ted-calendar-container" id={`${calendarID}-${i}`}>
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
                <select
                  className="leg-dropdown"
                  defaultValue={get(dropdownMeta, 'defaultValue')}
                  onChange={(e) => helperFunc(get(e, 'target.value'), get(dropdownMeta, 'dropdown'))}
                  value={get(dropdownMeta, 'defaultValue')}
                >
                  {
                    data.map(a => (
                      <option key={get(a, get(dropdownMeta, 'key'))} value={get(a, get(dropdownMeta, 'code'))}>{get(a, get(dropdownMeta, 'text'))}</option>
                    ))
                  }
                </select>
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
      content: (getData('dropdown', onDropdownUpdate, TODs, todMetaData)),
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
      content: (getData('dropdown', onDropdownUpdate, legActionTypes, actionMetadata)),
      cardView: false,
    },
    {
      icon: '',
      title: 'Travel',
      content: (getData('dropdown', onDropdownUpdate, travelFunctions, travelMetaData)),
      cardView: false,
    },
  ];

  return (
    <div className="aim-legs">
      {
        legsLoading ?
          <Spinner type="legs" size="small" />
          :
          <table>
            <tbody>
              {
                tableData.map(tr => (
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
      }
      very nice very nice
    </div>
  );
};

AgendaItemLegsForm.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  onClose: PropTypes.func,
};

AgendaItemLegsForm.defaultProps = {
  legs: [],
  onClose: EMPTY_FUNCTION,
};

export default AgendaItemLegsForm;
