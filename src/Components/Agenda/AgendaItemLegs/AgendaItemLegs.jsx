import PropTypes from 'prop-types';
import { formatLang, shortenString } from 'utilities';
import { filter, take, takeRight } from 'lodash';
import { format, isDate } from 'date-fns-v2';
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
  const formatDate = (d) => {
    if (d) {
      return !isNaN(new Date(d)) && isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : d;
    }
    return '';
  };

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
      title: 'Org',
      content: (getData('org', formatStr)),
      cardView: true,
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
      content: (getData('eta', formatDate)),
      cardView: true,
    },
    {
      title: '',
      content: (getArrows()),
      cardView: true,
    },
    {
      title: 'TED',
      content: (getData('ted', formatDate)),
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
      title: 'PP/Grade',
      content: (getData('combined_pp_grade')),
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
