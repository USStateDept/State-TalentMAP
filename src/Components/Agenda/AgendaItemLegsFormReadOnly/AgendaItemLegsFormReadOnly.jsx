/* eslint-disable max-len */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
// import { formatDate } from 'utilities';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
// import AgendaLeg from '../AgendaLeg';
import Alert from '../../Alert';

const AgendaItemLegsFormReadOnly = props => {
  const {
    efPos,
    legs,
  } = props;

  const hasEf = !isEmpty(efPos);
  const showOverlay = !legs.length && !hasEf;
  const [rowHoverNum, setRowHoverNum] = useState();

  const onHover = row => {
    // this should check the row number of the
    // Arrow Header '' to avoid highlighting the arrow row
    if (row !== 8) {
      setRowHoverNum(row);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getArrows = () => (
    <div className="arrow">
      <FA name="arrow-down" />
    </div>
  );

  const columnData = [
    {
      title: 'Position Title',
      content: (a => <div>{get(a, 'pos_title') || DEFAULT_TEXT}</div>),
    },
    // {
    //   title: 'Position Number',
    //   content: (<div>{get(leg, 'pos_num') || DEFAULT_TEXT}</div>),
    // },
    // {
    //   title: 'Org',
    //   content: (<div>{get(leg, 'org') || DEFAULT_TEXT}</div>),
    // },
    // {
    //   title: 'Grade',
    //   content: (<div>{get(leg, 'grade') || DEFAULT_TEXT}</div>),
    // },
    // {
    //   title: 'Languages',
    //   content: (<div>{formatLang(get(leg, 'languages')) || DEFAULT_TEXT}</div>),
    // },
    // {
    //   title: 'ETA',
    //   content: (<div>{formatDate(get(leg, 'eta')) || DEFAULT_TEXT}</div>),
    // },
    // {
    //   title: '',
    //   content: (getArrows()),
    // },
    // {
    //   title: 'TED',
    //   content: (getCalendar()),
    // },
    // {
    //   title: 'TOD',
    //   content: (getTodDropdown()),
    // },
    // {
    //   title: 'Action',
    //   content: (getDropdown(isEf ? 'action' : 'legActionType', legActionTypes, 'abbr_desc_text')),
    // },
    // {
    //   title: 'Travel',
    //   content: (getDropdown(isEf ? 'travel' : 'travelFunctionCode', travelFunctions, 'desc_text')),
    // },
  ];

  const legHeaderData = [
    'Position Title',
    'Position Number',
    'Org',
    'Grade',
    'Lang',
    'ETA',
    '',
    'TED',
    'TOD',
    'Action',
    'Travel',
  ];


  return (
    <>
      {
        showOverlay &&
        <Alert type="info" title="No Agenda Item Legs" />
      }
      {
        !showOverlay &&
          <div className="legs-form-container">
            <div className="legs-form">
              {
                legHeaderData.map((title, i) => (
                  <InteractiveElement
                    className={`grid-col-1 grid-row-${i + 2}${rowHoverNum === (i + 2) ? ' grid-row-hover' : ''}`}
                    onMouseOver={() => onHover(i + 2)}
                    onMouseLeave={() => onHover('')}
                    key={title}
                  >
                    {title}
                  </InteractiveElement>
                ))
              }
              {/* { */}
              {/*  hasEf && */}
              {/*  <AgendaLeg */}
              {/*    leg={efPos} */}
              {/*    legNum={2} */}
              {/*    isEf */}
              {/*    onHover={onHover} */}
              {/*    rowNum={rowHoverNum} */}
              {/*  /> */}
              {/* } */}
              {
                // grid-col 2 or 3 dependent on hasEf
                legs.map((leg, i) => {
                  // const keyId = i;
                  const legNum = i + (hasEf ? 3 : 2);
                  return (
                    <>
                      <div className={`grid-col-${legNum} grid-row-1`} />
                      {
                        columnData.map((cData, ii) => (
                          <InteractiveElement
                            className={`grid-col-${legNum} grid-row-${ii + 2}${rowHoverNum === (ii + 2) ? ' grid-row-hover' : ''}`}
                            onMouseOver={() => onHover(ii + 2)}
                            onMouseLeave={() => onHover('')}
                            key={cData.title}
                          >
                            <div>{get(leg, 'pos_title') || DEFAULT_TEXT}</div>
                            {cData.content(leg)}
                          </InteractiveElement>
                        ))
                      }
                    </>
                    // <AgendaLeg
                    //   leg={leg}
                    //   key={`${leg.ail_seq_num}-${keyId}`}
                    //   legNum={i + (hasEf ? 3 : 2)}
                    //   onHover={onHover}
                    //   rowNum={rowHoverNum}
                    // />
                  );
                })
              }
            </div>
          </div>
      }
    </>
  );
};

AgendaItemLegsFormReadOnly.propTypes = {
  efPos: PropTypes.shape({}),
  legs: PropTypes.arrayOf(PropTypes.shape({})),
};

AgendaItemLegsFormReadOnly.defaultProps = {
  efPos: {},
  legs: [],
};

export default AgendaItemLegsFormReadOnly;
