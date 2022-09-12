import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import Calendar from 'react-calendar';
import { format, isDate } from 'date-fns-v2';
import swal from '@sweetalert/with-react';

const AgendaLeg = props => {
  const {
    isEf,
    leg,
    legNum,
    updateLeg,
    onClose,
    TODs,
    legActionTypes,
    travelFunctions,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const onClose$ = () => {
    onClose(leg);
  };

  const [calendarHidden, setCalendarHidden] = useState(true);

  const updateDropdown = (dropdown, value) => {
    updateLeg(get(leg, 'ail_seq_num'), dropdown, value);
    if (dropdown === 'ted') {
      setCalendarHidden(true);
      swal.close();
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const calendarModal = () => {
    swal({
      title: 'TED Date Picker',
      closeOnEsc: true,
      button: false,
      content: (
        <div>
          <Calendar
            className="ted-react-calendar"
            onChange={(e) => updateDropdown('ted', e)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={cancel}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  const getDropdown = (key, data, text) => {
    if (isEf) {
      return get(leg, key) || '';
    }
    return (<select
      className="leg-dropdown"
      value={get(leg, key) || ''}
      onChange={(e) => updateDropdown(key, e.target.value)}
    >
      <option selected key={null} value={''}>
      Keep Unselected
      </option>
      {
        data.map(a => (
          <option key={get(a, 'code')} value={get(a, 'code')}>{get(a, text)}</option>
        ))
      }
    </select>);
  };

  const formatDate = (d) => d && isDate(new Date(d)) && !isNaN(d) ? format(new Date(d), 'MM/dd/yy') : d;

  const getCalendar = () => (
    <>
      {formatDate(get(leg, 'ted'))}
      {
        !isEf &&
        <FA name="calendar" style={{ color: `${calendarHidden ? 'black' : 'red'}` }} onClick={calendarModal} />
      }
    </>
  );

  const getArrows = () => (
    <div className="arrow">
      <FA name="arrow-down" />
    </div>
  );

  const columnData = [
    {
      title: 'Position Title',
      content: (<div>{get(leg, 'pos_title')}</div>),
    },
    {
      title: 'Position Number',
      content: (<div>{get(leg, 'pos_num')}</div>),
    },
    {
      title: 'Grade',
      content: (<div>{get(leg, 'grade')}</div>),
    },
    {
      title: 'Language',
      content: (<div>{get(leg, 'language')}</div>),
    },
    {
      title: 'Org',
      content: (<div>{get(leg, 'org')}</div>),
    },
    {
      title: 'ETA',
      content: (<div>{formatDate(get(leg, 'eta'))}</div>),
    },
    {
      title: '',
      content: (getArrows()),
    },
    {
      title: 'TED',
      content: (getCalendar()),
    },
    {
      title: 'TOD',
      content: (getDropdown('tourOfDutyCode', TODs, 'short_description')),
    },
    {
      title: 'Action',
      content: (getDropdown('legActionType', legActionTypes, 'abbr_desc_text')),
    },
    {
      title: 'Travel',
      content: (getDropdown('travelFunctionCode', travelFunctions, 'abbr_desc_text')),
    },
  ];

  return (
    <>
      <div className={`grid-col-${legNum} grid-row-1`}>
        { !isEf &&
          <InteractiveElement className="remove-leg-button" onClick={() => onClose$(leg)} title="Remove leg">
            <FA name="times" />
          </InteractiveElement>
        }
      </div>
      {
        columnData.map((cData, i) => (
          <div className={`grid-col-${legNum} grid-row-${i + 2}`}>
            {cData.content}
          </div>
        ))
      }
    </>
  );
};

AgendaLeg.propTypes = {
  isEf: PropTypes.bool,
  leg: PropTypes.shape({}),
  legNum: PropTypes.number.isRequired,
  TODs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  legActionTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  travelFunctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClose: PropTypes.func.isRequired,
  updateLeg: PropTypes.func.isRequired,
};

AgendaLeg.defaultProps = {
  isEf: false,
  leg: {},
  onClose: EMPTY_FUNCTION,
  updateLeg: EMPTY_FUNCTION,
};

export default AgendaLeg;
