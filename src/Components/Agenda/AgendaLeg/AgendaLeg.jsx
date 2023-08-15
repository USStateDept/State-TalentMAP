import PropTypes from 'prop-types';
import { AI_VALIDATION, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get, includes } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import Calendar from 'react-calendar';
import { formatDate, formatLang } from 'utilities';
import swal from '@sweetalert/with-react';
import { useEffect } from 'react';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { GSA as LocationsTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import TodModal from './TodModal';
import { formatVice } from '../Constants';

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
    setLegsContainerExpanded,
    updateResearchPaneTab,
    setActiveAIL,
  } = props;

  const isSeparation = leg?.is_separation;
  const defaultSepText = isSeparation ? '-' : false;

  const disabled = isEf;

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

  const getLegActionTypes = () => (
    legActionTypes.filter(lat => lat.is_separation === isSeparation)
  );

  const submitCustomTod = (todArray, customTodMonths) => {
    const todCode = todArray.map((tod, i, arr) => (i + 1 === arr.length ? tod : `${tod}/`)).join('').toString();
    updateLeg(leg?.ail_seq_num, {
      tod: 'X',
      tod_months: customTodMonths,
      tod_long_desc: todCode,
      tod_short_desc: todCode,
      tod_is_dropdown: false,
    });
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

    if (dropdown === 'tod') {
      const getTod = TODs.find(tod => tod.code === value);
      updateLeg(leg?.ail_seq_num, {
        tod: getTod?.code,
        tod_long_desc: getTod?.long_description,
        tod_short_desc: getTod?.short_description,
        tod_months: null, // only custom/other TOD will have months
        // only legacy and custom/other TOD Agenda Item Legs will render as a dropdown
        tod_is_dropdown: true,
      });
      return;
    }

    updateLeg(get(leg, 'ail_seq_num'), { [dropdown]: value });

    if (dropdown === 'ted') {
      swal.close();
    }
  };

  useEffect(() => {
    if (!isEf) {
      updateLeg(get(leg, 'ail_seq_num'),
        { legActionType: get(leg, 'action') || '', travelFunctionCode: get(leg, 'travel') || '' });
    }
  }, []);

  const clearTed = () => {
    updateLeg(leg?.ail_seq_num, { ted: '' });
    swal.close();
  };

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
              onChange={(e) => updateDropdown('ted', e)}
            />
          </div>
          <div className="ted-buttons">
            <button onClick={cancel}>Cancel</button>
            <button onClick={clearTed}>Clear TED</button>
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

  const closeOtherTod = () => {
    updateLeg(leg?.ail_seq_num, {
      tod: null,
      tod_months: null,
      tod_long_desc: null,
      tod_short_desc: null,
      tod_is_dropdown: true,
    });
  };

  const getTodDropdown = () => {
    const defaultText = isEf ? 'None listed' : 'Keep Unselected';
    const getTod = TODs.find(tod => tod.code === leg?.tod);
    if (isEf) {
      return leg.tod_long_desc || defaultText;
    }
    if (isSeparation) {
      return ('-');
    }

    if (!leg.tod_is_dropdown) {
      return (
        <div className="other-tod-wrapper">
          <div className="other-tod">
            { leg.tod_long_desc }
            {<FA name="times" className="other-tod-icon" onClick={closeOtherTod} />}
          </div>
        </div>
      );
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
              TODs.map((tod, i) => {
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

  const onAddLocationClick = () => {
    setActiveAIL(leg?.ail_seq_num);
    setLegsContainerExpanded(false);
    updateResearchPaneTab(LocationsTabID);
  };

  const getCalendar = () => (
    disabled ?
      <>{formatDate(leg?.ted) || DEFAULT_TEXT}</> :
      <div className="error-message-wrapper ail-form-ted">
        <div className="validation-error-message-label validation-error-message">
          {AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.ted?.errorMessage}
        </div>
        <div className={`${AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.ted?.valid ? '' : 'validation-error-border'}`}>
          {formatDate(leg?.ted) || DEFAULT_TEXT}
          <FA name="calendar" onClick={calendarModal} />
        </div>
      </div>
  );

  const getArrows = () => (
    <div className="arrow">
      {
        !isSeparation &&
        <FA name="arrow-down" />
      }
    </div>
  );

  const removeLocation = () => {
    updateLeg(leg?.ail_seq_num, {
      separation_location: null,
    });
  };

  const getLocation = () => {
    const location = leg?.separation_location;
    let displayText;

    if (location) {
      const { city, country } = location;
      displayText = `${city}, ${country}`;
    }

    return (
      <div className="error-message-wrapper ail-form-ted">
        <div className="validation-error-message-label validation-error-message">
          {
            AIvalidation
              ?.legs
              ?.individualLegs?.[leg?.ail_seq_num]?.separation_location?.errorMessage
          }
        </div>
        {
          !isEf ?
            <div className={`${AIvalidation?.legs?.individualLegs?.[leg?.ail_seq_num]?.separation_location?.valid ? '' : 'validation-error-border'}`}>
              {displayText || DEFAULT_TEXT}
              {
                displayText ?
                  <FA name="times" className="" onClick={removeLocation} />
                  :
                  <FA name="globe" onClick={onAddLocationClick} />
              }
            </div>
            :
            displayText || DEFAULT_TEXT
        }
      </div>
    );
  };

  const columnData = [
    {
      title: 'Position Title',
      content: isSeparation ?
        (<div>{defaultSepText}</div>) :
        (<div>{get(leg, 'pos_title') || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Position Number',
      content: (<div>{get(leg, 'pos_num') || defaultSepText || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Org',
      content: isSeparation ?
        getLocation()
        :
        (<div>{leg?.org || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Grade',
      content: (<div>{get(leg, 'grade') || defaultSepText || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Languages',
      content: (<div>{formatLang(get(leg, 'languages') || []) || defaultSepText || DEFAULT_TEXT}</div>),
    },
    {
      title: 'ETA',
      content: (<div>{defaultSepText || formatDate(get(leg, 'eta')) || DEFAULT_TEXT}</div>),
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
      content: (defaultSepText || getTodDropdown()),
    },
    {
      title: 'Action',
      content: (getDropdown(isEf ? 'action' : 'legActionType', getLegActionTypes(), 'abbr_desc_text')),
    },
    {
      title: 'Travel',
      content: (getDropdown(isEf ? 'travel' : 'travelFunctionCode', travelFunctions, 'desc_text')),
    },
    {
      title: 'Vice',
      content: formatVice(leg?.vice),
    },
    {
      title: 'Pay Plan',
      content: (<div>{get(leg, 'pay_plan') || DEFAULT_TEXT}</div>),
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
    tod_other_text: PropTypes.string,
    tod_long_desc: PropTypes.string,
    tod: PropTypes.string,
    tod_is_dropdown: PropTypes.bool,
    vice: PropTypes.shape({}),
    ted: PropTypes.string,
    is_separation: PropTypes.bool,
    separation_location: PropTypes.shape({}),
    org: PropTypes.string,
    pay_plan: PropTypes.string,
  }),
  legNum: PropTypes.number.isRequired,
  TODs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  legActionTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  travelFunctions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClose: PropTypes.func.isRequired,
  updateLeg: PropTypes.func.isRequired,
  setLegsContainerExpanded: PropTypes.func.isRequired,
  updateResearchPaneTab: PropTypes.func.isRequired,
  setActiveAIL: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  rowNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AgendaLeg.defaultProps = {
  AIvalidation: {},
  isEf: false,
  leg: {},
  onClose: EMPTY_FUNCTION,
  updateLeg: EMPTY_FUNCTION,
  onHover: EMPTY_FUNCTION,
  rowNum: null,
};

export default AgendaLeg;
