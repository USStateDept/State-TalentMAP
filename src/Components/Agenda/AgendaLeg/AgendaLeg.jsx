import PropTypes from 'prop-types';
import { AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get, includes } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import Calendar from 'react-calendar';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import { useEffect, useState } from 'react';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import TodModal from './TodModal';

const AgendaLeg = props => {
  const {
    AIvalidation,
    isEf, // check if leg is first leg, or separation
    leg,
    legNum,
    updateLeg,
    onClose,
    TODs,
    legActionTypes,
    travelFunctions,
    onHover,
    rowNum,
    isReadOnly,
  } = props;

  const [tod$, setTod$] = useState(TODs);

  const disabled = isReadOnly || isEf;

  const onHover$ = (row) => {
    // this should check the row number of getArrow()
    // to avoid highlighting the arrow
    if (row !== 8) {
      onHover(row);
    }
  };

  const onClose$ = () => {
    onClose(leg);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const submitCustomTod = (todArray, customTodMonths) => {
    const todCode = todArray.map((tod, i, arr) => (i + 1 === arr.length ? tod : `${tod}/`)).join('').toString();

    const customTodDropDownOption =
    [{
      code: 'X',
      is_active: true,
      months: customTodMonths,
      long_description: todCode,
      short_description: todCode,
    }];

    if (leg?.ail_seq_num) {
      const { ail_seq_num } = leg;
      setTod$([...customTodDropDownOption, ...tod$]);
      updateLeg(ail_seq_num,
        ['tod', 'tourOfDutyOtherText', 'tourOfDutyMonths'],
        ['X', todCode, customTodMonths]);
    }
    swal.close();
  };

  const openTodModal = () => {
    swal({
      title: 'Tour of Duty',
      closeOnEsc: true,
      button: false,
      className: 'swal-aim-custom-tod',
      content: (
        <TodModal
          cancel={cancel}
          submitCustomTod={submitCustomTod}
        />
      ),
    });
  };

  const updateDropdown = (dropdown, value) => {
    if (dropdown === 'tod' && value === 'X') {
      openTodModal();
      return;
    }

    if (dropdown === 'tod' && leg?.ail_seq_num) {
      setTod$(TODs); // if a non custom TOD is selected, blow away custom inputs from dropdown
      const getTod = tod$.find(tod => tod.code === value);
      const { code } = getTod;
      const { ail_seq_num } = leg;
      updateLeg(ail_seq_num,
        ['tourOfDutyOtherText', 'tod', 'tourOfDutyMonths'],
        [null, code, null]);
      return;
    }

    updateLeg(get(leg, 'ail_seq_num'), [dropdown], [value]);

    if (dropdown === 'legEndDate') {
      swal.close();
    }
  };

  useEffect(() => {
    if (!isEf && isReadOnly) {
      updateLeg(get(leg, 'ail_seq_num'),
        ['legActionType', 'travelFunctionCode'],
        [get(leg, 'action') || '', get(leg, 'travel') || '']);
    }
  }, []);

  const calendarModal = () => {
    swal({
      title: 'Tour End Date (TED)',
      closeOnEsc: true,
      button: false,
      className: 'swal-aim-ted-calendar',
      content: (
        <div className="ted-modal-content-container">
          <div className="ted-modal-header">
            {get(leg, 'pos_title') || 'None Listed'} ({get(leg, 'pos_num') || 'None Listed'})
          </div>
          <div className="ted-modal-header">
            Organization: ({get(leg, 'org') || 'None listed'})
          </div>
          <div>
            <Calendar
              className="ted-react-calendar"
              onChange={(e) => updateDropdown('legEndDate', e)}
            />
          </div>
          <div className="ted-button">
            <button onClick={cancel}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  const getDropdown = (key, data, text) => {
    const defaultText = isEf ? 'None listed' : 'Keep Unselected';
    if (isEf) {
      return get(leg, key) || defaultText;
    }
    return (
      <div className="error-message-wrapper">
        <div className="validation-error-message-label validation-error-message">
          {AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.[key]?.errorMessage}
        </div>
        <div>
          <select
            className={`leg-dropdown ${AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.[key]?.valid ? '' : 'validation-error-border'}`}
            value={get(leg, key) || ''}
            onChange={(e) => updateDropdown(key, e.target.value)}
            disabled={disabled}
          >
            <option key={null} value={''}>
              {defaultText}
            </option>
            {
              data.map((a, i) => {
                const keyId = `${a?.code}-${i}`;
                return <option key={keyId} value={get(a, 'text')}>{get(a, text)}</option>;
              })
            }
          </select>
        </div>
      </div>
    );
  };

  const getTodDropdown = () => {
    const defaultText = isEf ? 'None listed' : 'Keep Unselected';
    const getTod = tod$.find(tod => tod.code === leg?.tod);
    if (isEf) {
      return getTod?.long_description || defaultText;
    }

    return (
      <div className="error-message-wrapper">
        <div className="validation-error-message-label validation-error-message">
          {AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.tod?.errorMessage}
        </div>
        <div>
          <select
            className={`leg-dropdown ${AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.tod?.valid ? '' : 'validation-error-border'}`}
            value={getTod?.code || ''}
            onChange={(e) => updateDropdown('tod', e.target.value)}
            disabled={disabled}
          >
            <option key={null} value={''}>
              {defaultText}
            </option>
            {
              tod$.map((tod, i) => {
                const { code, long_description } = tod;
                const todKey = `${code}-${i}`; // custom tods will have the same code as other
                return <option key={todKey} value={code}>{long_description}</option>;
              })
            }
          </select>
        </div>
      </div>
    );
  };

  const formatLang = (langArr = []) => langArr.map(lang => (
    `${lang.code} ${lang.spoken_proficiency}/${lang.reading_proficiency}`
  )).join(', ');

  const getCalendar = () => (
    disabled ?
      <>{formatDate(get(leg, 'legEndDate') || get(leg, 'ted')) || DEFAULT_TEXT}</> :
      <div className="error-message-wrapper">
        <div className="validation-error-message-label validation-error-message">
          {AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.legEndDate?.errorMessage}
        </div>
        <div className={`${AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.legEndDate?.valid ? '' : 'validation-error-border'}`}>
          {formatDate(get(leg, 'legEndDate') || get(leg, 'ted')) || DEFAULT_TEXT}
          <FA name="calendar" onClick={calendarModal} />
        </div>
      </div>
  );

  const getArrows = () => (
    <div className="arrow">
      <FA name="arrow-down" />
    </div>
  );

  const columnData = [
    {
      title: 'Position Title',
      content: (<div>{get(leg, 'pos_title') || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Position Number',
      content: (<div>{get(leg, 'pos_num') || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Org',
      content: (<div>{get(leg, 'org') || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Grade',
      content: (<div>{get(leg, 'grade') || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Languages',
      content: (<div>{formatLang(get(leg, 'languages')) || DEFAULT_TEXT}</div>),
    },
    {
      title: 'ETA',
      content: (<div>{formatDate(get(leg, 'eta')) || DEFAULT_TEXT}</div>),
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
      content: (getTodDropdown()),
    },
    {
      title: 'Action',
      content: (getDropdown(isEf ? 'action' : 'legActionType', legActionTypes, 'abbr_desc_text')),
    },
    {
      title: 'Travel',
      content: (getDropdown(isEf ? 'travel' : 'travelFunctionCode', travelFunctions, 'desc_text')),
    },
  ];

  const dropdowns = ['TOD', 'Action', 'Travel'];

  return (
    <>
      <div className={`grid-col-${legNum} grid-row-1`}>
        {
          !disabled &&
          <InteractiveElement className="remove-leg-button" onClick={() => onClose$(leg)} title="Remove leg">
            <FA name="times" />
          </InteractiveElement>
        }
      </div>
      {
        columnData.map((cData, i) => (
          <InteractiveElement
            className={`grid-col-${legNum} grid-row-${i + 2}${rowNum === (i + 2) ? ' grid-row-hover' : ''}${(includes(dropdowns, cData.title) && isEf) ? ' ef-pos-dropdown' : ''}`}
            onMouseOver={() => onHover$(i + 2)}
            onMouseLeave={() => onHover$('')}
            key={cData.title}
          >
            {cData.content}
          </InteractiveElement>
        ))
      }
    </>
  );
};

AgendaLeg.propTypes = {
  AIvalidation: AI_VALIDATION,
  isEf: PropTypes.bool,
  leg: PropTypes.shape({
    ail_seq_num: PropTypes.number,
    tod: PropTypes.string,
  }),
  legNum: PropTypes.number.isRequired,
  TODs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  legActionTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  travelFunctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClose: PropTypes.func.isRequired,
  updateLeg: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  rowNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isReadOnly: PropTypes.bool,
};

AgendaLeg.defaultProps = {
  AIvalidation: {},
  isEf: false,
  leg: {},
  onClose: EMPTY_FUNCTION,
  updateLeg: EMPTY_FUNCTION,
  onHover: EMPTY_FUNCTION,
  rowNum: null,
  isReadOnly: false,
};

export default AgendaLeg;
