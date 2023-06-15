import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import Alert from '../../Alert';

const AgendaItemLegsFormReadOnly = props => {
  const { legs } = props;

  const showOverlay = !legs.length;
  const [rowHoverNum, setRowHoverNum] = useState();

  const onHover = row => {
    // to avoid highlighting the arrow row
    if (row !== 8) {
      setRowHoverNum(row);
    }
  };

  const formatLang = (langArr = []) => langArr.map(lang => (
    `${lang.code} ${lang.spoken_proficiency}/${lang.reading_proficiency}`
  )).join(', ');

  // eslint-disable-next-line no-unused-vars
  const getArrows = () => (
    <div className="arrow">
      <FA name="arrow-down" />
    </div>
  );

  const columnData = [
    {
      title: 'Position Title',
      content: (a => <div>{a?.pos_title || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Position Number',
      content: (a => <div>{a?.pos_num || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Org',
      content: (a => <div>{a?.org || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Grade',
      content: (a => <div>{a?.grade || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Lang',
      content: (a => <div>{formatLang(a?.languages) || DEFAULT_TEXT}</div>),
    },
    {
      title: 'ETA',
      content: (a => <div>{formatDate(a?.eta) || DEFAULT_TEXT}</div>),
    },
    {
      title: '',
      content: (() => getArrows()),
    },
    {
      title: 'TED',
      content: (a => <div>{formatDate(a?.legEndDate || a?.ted) || DEFAULT_TEXT}</div>),
    },
    {
      title: 'TOD',
      content: (a => <div>{a?.tod_long_desc || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Action',
      content: (a => <div>{a?.action || DEFAULT_TEXT}</div>),
    },
    {
      title: 'Travel',
      content: (a => <div>{a?.travel || DEFAULT_TEXT}</div>),
    },
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
                columnData.map((cData, i) => (
                  <InteractiveElement
                    className={`grid-col-1 grid-row-${i + 2}${rowHoverNum === (i + 2) ? ' grid-row-hover' : ''}`}
                    onMouseOver={() => onHover(i + 2)}
                    onMouseLeave={() => onHover('')}
                    key={cData.title}
                  >
                    {cData.title}
                  </InteractiveElement>
                ))
              }
              {
                legs.map((leg, i) => {
                  // css grid count starts at 1 and we have to offset by 1 for the title column
                  const legNum = i + 2;
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
                            {cData.content(leg)}
                          </InteractiveElement>
                        ))
                      }
                    </>
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
