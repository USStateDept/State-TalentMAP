import PropTypes from 'prop-types';
import { formatDate, formatLang, formatMonthYearDate, shortenString } from 'utilities';
import { filter, take, takeRight } from 'lodash';
import FA from 'react-fontawesome';
import { formatVice } from '../Constants';

const AgendaItemLegs = props => {
  const {
    legs,
    isCard,
    isPanelMeetingView,
  } = props;

  let legs$ = legs;
  if (isCard && legs.length > 2) {
    legs$ = [take(legs)[0], takeRight(legs)[0]];
  }
  const strLimit = isCard ? 15 : 50;
  const formatStr = (d) => shortenString(d, strLimit);

  const getData = (key, helperFunc = () => {}) => (
    <>
      {
        legs$.map((leg, index) => {
          const keyId = index;
          return (
            <td key={`${leg.id}-${keyId}`}>
              {
                <dd>{helperFunc(leg[key]) ?? leg[key] ?? 'None listed'}</dd>
              }
            </td>
          );
        })
      }
    </>
  );

  const getArrows = () => (
    <>
      {
        legs$.map((leg, index) => {
          const keyId = index;
          return (
            <td className={`${leg?.is_separation ? 'hide' : ''} arrow`} key={`${keyId}-${leg.id}`}>
              <FA name="arrow-down" />
            </td>);
        })
      }
    </>
  );

  const getTeds = () => (
    <>
      {
        legs$.map((leg, index) => {
          let ted = 'None listed';
          const keyId = index;
          if (leg?.ted) {
            if (leg?.is_separation) {
              ted = formatDate(leg?.ted);
            } else {
              ted = formatMonthYearDate(leg?.ted);
            }
          }
          return (
            <td key={`${leg.id}-${keyId}`}>
              {
                <dd>{ted}</dd>
              }
            </td>
          );
        })
      }
    </>
  );

  const tableData = [
    {
      title: 'Position Title',
      content: (getData('pos_title', formatStr)),
      cardView: false,
    },
    {
      title: 'Position Number',
      content: (getData('pos_num')),
      cardView: false,
    },
    {
      title: 'Location/Org',
      content: (getData('org', formatStr)),
      cardView: true,
    },
    {
      title: 'Grade',
      content: (getData('grade')),
      cardView: false,
    },
    {
      title: 'Lang',
      content: (getData('languages', formatLang)),
      cardView: false,
    },
    {
      title: 'Skills',
      content: (getData('custom_skills_description')),
      cardView: false,
    },
    {
      title: 'ETA',
      content: (getData('eta', formatMonthYearDate)),
      cardView: true,
    },
    {
      title: '',
      content: (getArrows()),
      cardView: true,
    },
    {
      title: 'TED',
      content: (getTeds()),
      cardView: true,
    },
    {
      title: 'TOD',
      content: (getData('tod_short_desc')),
      cardView: false,
    },
    {
      title: 'Action',
      content: (getData('action')),
      cardView: false,
    },
    {
      title: 'Travel',
      content: (getData('travel')),
      cardView: false,
    },
    {
      title: 'Pay Plan',
      content: (getData('pay_plan')),
      cardView: false,
    },
  ];

  if (isPanelMeetingView) { // vice/vacancy info only shows for panel view, and in AIM
    tableData.push(
      {
        title: 'Vice',
        content: (getData('vice', formatVice)),
        cardView: false,
      },
    );
  }

  const tableData$ = isCard ? filter(tableData, 'cardView') : tableData;

  return (
    <div className="ai-legs">
      <table>
        <tbody>
          {
            tableData$.map(tr => (
              <tr key={tr.title}>
                <th>
                  <dt>{tr.title}</dt>
                </th>
                {tr.content}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

AgendaItemLegs.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  isCard: PropTypes.bool,
  isPanelMeetingView: PropTypes.bool,
};

AgendaItemLegs.defaultProps = {
  legs: [],
  isCard: false,
  isPanelMeetingView: false,
};

export default AgendaItemLegs;
